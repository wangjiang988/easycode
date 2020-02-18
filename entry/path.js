const { getFilePath } = require('../lib/common')
const path = require('path')
const log = require('../lib/logger')

module.exports = (action, filename) => {
    if(action == 'get')
        getPositivePath(filename)
}

/**
 * 获取文件名的相对路径
 * @param {h} filename 
 */
async function getPositivePath (filename) {
    const rootPath = path.resolve(process.cwd())
    const filepath = await getFilePath(filename, rootPath)
    log.success("路径为:", filepath)
    return filepath
}

