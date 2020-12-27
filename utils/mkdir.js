
const fs = require('fs');
const path = require("path")
/**
 * 检查路径是否存在 如果不存在则创建路径
 * @param {string} folderpath 文件路径
 */
exports.mkdir = function (folderpath) {
    try {
        const pathArr = folderpath.split('/');
        console.log("用户文件地址：" + folderpath);
        let _path = process.platform === "win32" ? "" : path.join("/")
        for (let i = 0; i < pathArr.length; i++) {
            if (pathArr[i]) {
                _path = path.join(_path, `${pathArr[i]}/`)
                if (!fs.existsSync(_path)) {
                    fs.mkdirSync(_path);
                }
            }
        }
        return (true)
    } catch (e) {
        console.log(e)
        return false
    }
}