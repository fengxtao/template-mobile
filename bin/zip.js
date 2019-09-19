const fs = require("fs-extra")
const path = require('path')
const archiver = require('archiver')
//const chalk   = require('chalk')

const outDir = path.resolve(process.cwd(), 'dist');
const zipDir = process.cwd() + '/zip';
const zipKey = new Date().getTime();

var zipProcess = 0;

/**
 * 移动文件
 * @param files 文件路径集合
 * @param directory 要移入的目录
 */
function move(files, directory) {
    files.forEach(function (file) {
        var fileName = file.split('/').pop();
        fs.copySync(file, path.join(directory, fileName));
        fs.removeSync(file);
    })
}

function zipFinish() {
    if(zipProcess==2){
        // move(
        //     [
        //         '_tmp/index.html',
        //         '_tmp/mobile.html'
        //     ],
        //     outDir
        // );
        fs.removeSync('_tmp');
        //console.log(chalk.green('  Zip successfully！ See ' + zipDir +'. \n'))
    }
}
console.log("删除已存在的临时目录和zip包");
//删除已存在的临时目录和zip包
fs.removeSync('_tmp');
fs.removeSync(zipDir);
fs.mkdirsSync(zipDir);


// 将html从dist中移出
// move(
//     [
//         path.join(outDir,'index.html'),
//         path.join(outDir,'mobile.html')
//     ],
//     '_tmp'
// );

// copy dist到临时目录
console.log("copy dist到临时目录 :" + outDir );
fs.copySync(outDir,'_tmp/ios');
fs.copySync(outDir,'_tmp/android');

// zip ios包
const archive = archiver('zip');
archive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
archive.pipe(fs.createWriteStream(path.join(zipDir,zipKey + '_ios.zip')));
archive.bulk([
    { expand: true, cwd:'_tmp/ios/',src: ['**']}
]);
archive.finalize();

// zip android包
const androidArchive = archiver('zip');
androidArchive.on('finish',function () {
    zipProcess++;
    zipFinish();
})
androidArchive.pipe(fs.createWriteStream(path.join(zipDir,zipKey + '_android.zip')));
androidArchive.bulk([
    { expand: true, cwd:'_tmp/android/',src: ['**']}
]);
androidArchive.finalize();