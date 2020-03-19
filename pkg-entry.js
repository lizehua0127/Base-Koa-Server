

// 将运行文件所在目录设置为工作目录
const execPath = process.execPath
if (execPath.endsWith('.exe')) {
  process.chdir(process.execPath.substring(0, process.execPath.lastIndexOf('\\') + 1))
} else {
  process.chdir(process.execPath.substring(0, process.execPath.lastIndexOf('/') + 1))
}

console.log('process.argv ', process.argv)
console.log('process.cwd ', process.cwd())
console.log('process.execPath ', process.execPath)

// 设置端口号
const portIndex = process.argv.indexOf('-p')
if (portIndex > 0) {
  process.env.PD_NODE_PORT = process.argv[portIndex + 1]
}
require('./index')