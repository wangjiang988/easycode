const path = require('path')
const fs = require('fs')
const shell = require("shelljs");
const readline = require('readline');
const StringUtils = require('./stringUtils')


module.exports = {

    /**
     * 
     * @param {} filePath 
     */
    readFile(path) {
        return fs.readFileSync(path, 'utf8')
    },
    /*
        * 按行读取文件内容
        * 返回：字符串数组
        * 参数：fReadName:文件名路径
        *      callback:回调函数
        * */
    readFileToArr(fReadName,callback){
        var fRead = fs.createReadStream(fReadName);
        var objReadline = readline.createInterface({
            input:fRead
        });
        var arr = new Array();
        objReadline.on('line',function (line) {
            arr.push(StringUtils.trim(line));
            //console.log('line:'+ line);
        });
        objReadline.on('close',function () {
           // console.log(arr);
            callback(arr);
        });
    },
    readFileToArrPromise(fReadName) {
        return new Promise(function(resolve, reject){
            var fRead = fs.createReadStream(fReadName);
            var objReadline = readline.createInterface({
                input:fRead
            });
            var arr = new Array();
            objReadline.on('line',function (line) {
                arr.push(StringUtils.trim(line));
                //console.log('line:'+ line);
            });
            objReadline.on('close',function () {
                // console.log(arr);
                resolve(arr);
            });
        })
            
    },
    /**
     *  检查路径是否存在，不存在就创建一下
     * @param {*} filePath 
     */
    pathCheckAndMkdir(filePath) {
        if (!fs.existsSync(filePath)) {
            console.log("开始生成目录结构:", filePath)
            mkdirsSync(filePath)
        }
    },
    /**
     * 生成文件
     * @param {} filePath 
     */
    touchFile(filePath) {
        if(!fs.existsSync(filePath)) {
            shell.exec("touch "+ filePath)
        }
    },

    checkFileOrPathExist(filePath){
        if (!fs.existsSync(filePath)) {
            return false
        } else {
            return true
        }
    },
    /**
     * 移动文件
     * @param { 文件 } fileName
     * @param { 文件当前路径} fromPath 
     * @param { 移动到路径} toPath 
     */
    move(fileName, fromPath , toPath) {
        if (!fs.existsSync(fromPath + '/' + fileName )) {
            console.error('需要移动的文件不存在')
            return false
        } 

        shell.exec('mv ' + fromPath + '/' + fileName + ' ' + toPath)
        return true
    },

    /**
     * 获取该库根路径
     */
    getToolBasePath(){
        return  path.resolve(__dirname, '..')
    },

    /**
     * 获取当前脚本路径
     * @param {*} str 
     */
    getCurrentPath() {
        return path.resolve(process.cwd());
    },

    /**
     * 首字母大写
     * @param {*} str 
     */
    firstUpperCase(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    },

    /**
     * 读取json配置文件
     */
    readJsonFromJsonFile(jsonFile) {
        return JSON.parse(JSON.stringify(require(jsonFile)))
    }

    

}

/** 
 * Created by RockeyCai on 16/2/22. 
 * 创建文件夹帮助类 
 */  


//递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            //console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }  
    });  
}  

//递归创建目录 同步方法  
function mkdirsSync(dirname) {  
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  
