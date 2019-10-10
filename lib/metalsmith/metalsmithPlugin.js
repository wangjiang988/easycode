const async = require('async')
const render = require('consolidate').handlebars.render
const logger = require('../logger')
const path = require('path')
const StringUtil = require('../util/stringUtils')
const moment = require('moment')

// 全局替换模板对象
const global = {
    now_date: moment().format('YYYY-MM-DD'),
    now_datetime: moment().format('YYYY-MM-DD HH:mm:ss')
}

exports.renderTemplateFiles = (metadata) => {
    return (files, metalsmith, done) => {
        const keys = Object.keys(files)
        const metalsmithMetadata = metalsmith.metadata()

        if (metadata) {
            Object.assign(metalsmithMetadata.root, global)
        }
        // console.log(metalsmithMetadata)
        // 添加全局替换规则
        renderMetaData(metalsmithMetadata)

        // console.log(metalsmithMetadata)

        async.each(keys, (file, next) => {
            // ignore git
            if (file.startsWith('.git')) return next()
            if (file.startsWith('.idea')) return next()
            if (file.startsWith('target')) return next()
            if (file.endsWith('.iml')) return next()
            if (file.endsWith('spec.yml')) {
                return next()
            }

            let str = files[file].contents.toString()
            // 这里将模板的定义注释去掉
            // 这里只能删除第一个行注释，所以要求模板注释必须写在最上面
            // 会删除注释和注释后面的一行
            str = str.replace(/\/\*{1,2}[\s\S]*?\*\/\n\n/, '')

            // do not attempt to render files that do not have mustaches
            if (!/<{([^{}]+)}>/g.test(str)) {
                return next()
            }

            render(str, metalsmithMetadata, (err, res) => {
                if (err) {
                    // console.log(str)
                    err.message = `[${file}] ${err.message}`
                    return next(err);
                }
                files[file].contents = new Buffer.from(res)
                next()
            })
        }, done)
    }
}

/**
 * 添加全局的一些默认替换规则，
 * 1. xx_lower 全部小写
 * 2. xx_upper 全部大写
 */
function renderMetaData(metadata) {
    Object.keys(metadata).forEach(function (index) {
        if (typeof metadata[index] == 'string') {
            // console.log('index: ', index)
            // if(index.endsWith('_lower'))
                metadata[index+'_lower'] = StringUtil.toLowerCase(metadata[index])
            // if(index.endsWith('_upper')) 
                metadata[index+'_upper'] = StringUtil.toUpperCase(metadata[index])
            // if(index.endsWith('_first_lower'))
                metadata[index+'_first_lower'] = StringUtil.firstLowerCase(metadata[index])
            // if(index.endsWith('_first_upper')) 
                metadata[index+'_first_upper'] = StringUtil.firstUpperCase(metadata[index])
                
            if (index == 'targetFileName') {
                metadata.root['filename_withno_ext'] = StringUtil.removeExt(metadata[index])
            }
        }
        if (typeof metadata[index] == 'string' && index.endsWith('_lower') ) {
            metadata[index] = StringUtil.toLowerCase(metadata[index])
        }
    })
    if(metadata.root) renderMetaData(metadata.root)
}
