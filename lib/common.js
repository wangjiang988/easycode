/**
 * 一些全局方法
 */
const fs = require('fs')
const path = require('path')
const yamlUtil = require('./util/yamlUtil')
const StringUtils = require('./util/stringUtils')
const FileUtil = require('./util/fileUtil')
const { Template } = require('./parser/templateParser')
const nodeYaml = require('node-yaml')
const logger = require('./logger')
const download = require("download-git-repo")
const ora = require('ora');

function readDir(filePath) {
    if (!FileUtil.checkFileOrPathExist(filePath)) return []
    return new Promise((res, rej) => {
        fs.readdir(filePath, (err, files) => {
            if (err) {
                rej(err)
            } else {
                res(files)
            }
        })
    })
}

function readStat(filedir) {
    return new Promise((res, rej) => {
        fs.stat(filedir, function (eror, stats) {
            if (eror) {
                console.warn('获取文件stats失败');
                rej(eror)
            } else {
                let stat = 'nobody'
                const isFile = stats.isFile();//是文件  
                const isDir = stats.isDirectory();//是文件夹  
                if (isFile) {
                    // specs.push(filedir)
                    stat = 'file'
                    // logger.log(filedir)
                }
                if (isDir) {
                    stat = 'dir'
                    // fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                }
                res(stat)
            }
        })
    })
}

/** 
 * 根据模板路径，扫描该路径下的所有文件
 * 文件遍历方法,并获取所有的模板信息
 * @param templateRootPath 需要遍历的文件路径 
 * 返回的文件路径需要是相对于模板路径的地址
 * templateInfos.singles
 * templateInfos.groups
 */
async function templateInfo(templateRootPath, templatePath, templateInfos, easycode) {
    const files = await readDir(templatePath)
    let isGroup = false
    let groupInfo = {
        children: [],
        rootPath: ''
    }
    let groupIndex = -1
    if (files.length > 0) {
        if (array_contain(files, 'group.yaml')) {
            // 模板组
            // 获取模板组信息
            const groupUri = getPathUri(templateRootPath, templatePath)
            groupInfo.rootPath = groupUri
            const groupYamlFilePath = path.join(templatePath, 'group.yaml')
            const info = yamlUtil.readYamlFileAndReturnJson(groupYamlFilePath)
            isGroup = true
            groupIndex = object_array_contain_key(templateInfos.groups, 'name', info.name)
            if (groupIndex > -1) {
                groupInfo = templateInfos.groups[groupIndex]
            }
            Object.assign(groupInfo, info)
        }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filedir = path.join(templatePath, file)
            const dirStat = await readStat(filedir)
            if (dirStat == 'file') {
                // 模板组
                if (!StringUtils.endsWith(file, '.tpl')) continue
                // 其他为模板文件， 开始解析
                // 这里的文件路径带了
                const template = new Template(filedir, easycode)
                await template.AsyncParse()
                const templateInfo = {
                    name: template.name,
                    description: template.description,
                    filePath: filedir.replace(templateRootPath + '/', '')
                }
                if (isGroup) {
                    // 组 
                    groupInfo.children.push(templateInfo)
                    // 单个文件模板也使用
                    templateInfos.singles.push({
                        name: template.name,
                        description: template.description,
                        filePath: filedir.replace(templateRootPath + '/', '')
                    })
                } else {
                    templateInfos.singles.push(templateInfo)
                }
            } else if (dirStat == 'dir') {
                // console.log(filedir)
                await templateInfo(templateRootPath, filedir, templateInfos, easycode)
            } else {
                console.log('未知类型数据')
            }
        }

        if (isGroup) {
            if (groupIndex > 0) {
                templateInfos.groups[groupIndex] = groupInfo
            } else {
                templateInfos.groups.push({
                    name: groupInfo.name,
                    rootPath: groupInfo.rootPath,
                    description: groupInfo.description,
                    children: groupInfo.children
                })
            }
        }
    }
}


function array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }
    return false;
}


// 返回是第几个数据
function object_array_contain_key(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value)//如果要求数据类型也一致，这里可使用恒等号===
            return i + 1;
    }
    return -1;
}

function getPathUri(basePath, path) {
    return path.replace(basePath, "").substring(1)
}

/**
 * 使用对象生成yaml文件
 */
const generateYamlFile = (pathtofile, data) => {
    nodeYaml.write(pathtofile, data, 'utf8', (err) => {
        if (err)
            logger.fatal(err)
        else {
            logger.success('yaml文件生成成功')
        }
    })
}


function deleteFolder(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


/**
 * 数组转对象
 * [ { name: 'Name1', value: 'V1' },
 * { name: 'Name2', value: 'V2' } ]
 * to 
 * {Name1: V1, Name2: V2}
 */
const arryObject_to_object = (arr, key, value) => {
    let newObject = {}
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i]
            let newObj = {}
            newObj[obj[key]] = obj[value]
            Object.assign(newObject, newObj)
        }
    }

    return newObject
}

/**
 * 获取相对于当前项目路径的相对路径
 * @param {*} targetpath 绝对路径
 */
const getProjectPositivePath = (targetpath) => {
    const projecRootPath = path.resolve(process.cwd())
    return targetpath.replace(projecRootPath, '.')
}

/**
 * 获取相对于当前项目路径的绝对路径
 * @param {*} targetpath 
 */
const getProjectAbosutePath = (targetpath) => {
    const projecRootPath = path.resolve(process.cwd())
    return path.resolve(projecRootPath, targetpath)
}

/**
 * 
 * @param {文件名} filename 
 * @param {查找路径} rootPath 
 * @return 返回相对 rootPath的相对路径
 */
const getFilePath = async (filename, currentRootPath, rootPath) => {
    if (!rootPath) rootPath = currentRootPath
    const files = await readDir(currentRootPath)
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filedir = path.join(currentRootPath, file)
            const dirStat = await readStat(filedir)
            if (dirStat == 'file') {
                const currentFileName = StringUtils.getFileName(filedir)
                if (currentFileName == filename) {
                    return filedir.replace(rootPath + '/', '')
                }
            } else if (dirStat == 'dir') {
                let filepath = await getFilePath(filename, filedir, rootPath)
                if (filepath !== '') {
                    return filepath
                }

            }
        }
    }
    return ''
}

/**
 * 
 * @param {*} gitpath Git地址 带.git
 * @param {*} branch 分支 可不填
 * @param {*} dest 目标地址
 */
const cloneGit = (gitpath, branch, dest) => {

    const spinner = ora('开始下载')
    spinner.start()

    // 简单使用
    // 码云好像下载不了
    download(`direct:${gitpath}#${branch}`,
        dest,
        {clone:true},
        function(e) {
            if(e) {
                spinner.stop("下载失败")
            } else {
                spinner.succeed("下载完成")
            }
        })
}

/**
 * 
 * @param {*} gitpath Git地址 带.git
 * @param {*} branch 分支 可不填
 * @param {*} dest 目标地址
 */
function cloneGitPromise(gitpath, branch, dest) {
	return new Promise((resolve, reject) => {
		const spinner = ora('开始下载')
		spinner.start()
		// 简单使用
		// 码云好像下载不了
		download(`direct:${gitpath}#${branch}`,
        dest,
        {clone:true},
        function(e) {
            if(e) {
                spinner.stop("下载失败")
                reject(e)
            } else {
                spinner.succeed("下载完成")
                resolve('下载完成')
            }
        })
	})
}

const getGitName = (gitpath) => {
    const tplPath = gitpath.split("/")
    const realPath = tplPath[tplPath.length -1].split('.')
    const pathName = realPath[0]
    
    return pathName ? pathName : 'no-name-git'
}

module.exports = {
    templateInfo,
    generateYamlFile,
    arryObject_to_object,
    getProjectPositivePath,
    getProjectAbosutePath,
    getFilePath,
    cloneGit,
    cloneGitPromise,
    getGitName,
    deleteFolder
}