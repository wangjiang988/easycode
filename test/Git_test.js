const download = require("download-git-repo")
const ora = require('ora');

const spinner = ora('开始下载')
spinner.start()

// const p = 'https://github.com/wangjiang988/iview-admin-template.git'
// const tplPath = p.split("/")
// const realPath = tplPath[tplPath.length -1].split('.')
// const pathName = realPath[0]
// console.log(pathName)



// 简单使用
// 码云下载不了
download('direct:https://github.com/wangjiang988/iview-admin-template.git#master',
	'tmp',
	{clone:true},
	function(e) {
		if(e) {
			spinner.stop()
		} else {
			spinner.succeed()
		}
	})