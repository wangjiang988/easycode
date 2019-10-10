'use strict';
var path = require('path');

module.exports = plugin;

/**
 * 只生成当前指定文件
 * @param {} fileName 生成文件名
 */
function plugin(fileName) {
    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (file) {
            // 获取文件名
            const fileSplitList = file.split('/')
            const currentfilename = fileSplitList[fileSplitList.length-1] 
            if(currentfilename != fileName)
                delete files[file];
            else { // 如果找到文件名 ， 则去掉文件名中的相对路径
                files[currentfilename] = files[file]
                delete files[file];
            }
        });
        done();
    };
}
