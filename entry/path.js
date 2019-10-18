const { getFilePath } = require('../lib/common')
const path = require('path')

module.exports = (action, filename) => {
    getPositivePath(filename)
}

/**
 * 获取文件名的相对路径
 * @param {h} filename 
 */
async function getPositivePath (filename) {
    const rootPath = path.resolve(process.cwd())
    const filepath = await getFilePath(filename, rootPath)
    return filepath
}

