// in win10
const fs = require('fs'),
    getPX = require("get-pixels"),
    child_process = require('child_process'),
    sourceDir = `C:/Users/37445/AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets`
    destDir = `C:/Users/37445/Desktop/wallPapers`; // 执行本程序时 wallPapers 不能存在

// 遍历目标目录中的文件，改名
function renameDestFiles() {
    return new Promise((resolve, reject) => {
        let count = 0, fileNames = fs.readdirSync(destDir);
        const sum = fileNames.length;

        for (let i = 0; i < sum; i++) {
            let oldName = `${destDir}/${fileNames[i]}`,
                newName = `${destDir}/${fileNames[i]}.jpg`;

            try {
                fs.rename(`${oldName}`, `${newName}`, err => {
                    if (err) {
                        throw err;
                    } else {
                        count++;
                        // console.log(`Success: ${i}: ${oldName} ==> ${newName}`);
                        if (count === sum) {
                            // console.log(`源文件个数: ${sum}, 已成功复制的文件个数: ${count}`);
                            resolve();
                        }
                    };
                });
            } catch (error) {
                console.error(`Error: ${i}: ${oldName}`, error);
            }

        }
    });
}

function diffPX() {
    const allFiles = fs.readdirSync(destDir);

    fs.mkdirSync(`${destDir}/1080_1920`);
    fs.mkdirSync(`${destDir}/1920_1080`);

    for (let i = 0, len = allFiles.length; i < len; i++) {

        try {
            getPX(`${destDir}/${allFiles[i]}`, (err, pixels) => {
                if (err) {
                    throw err;
                } else {
                    const shape = pixels.shape[0];
                    switch (shape) {
                        case 1080:
                            console.log(`mv 1080 * 1920 ==> ${destDir}/1080_1920/`);
                            child_process.spawnSync('mv', ['-i', `${destDir}/${allFiles[i]}`, `${destDir}/1080_1920/${allFiles[i]}`]);
                            break;
                        case 1920:
                            console.log(`mv 1920 * 1080 ==> ${destDir}/1920_1080/`);
                            child_process.spawnSync('mv', ['-i', `${destDir}/${allFiles[i]}`, `${destDir}/1920_1080/${allFiles[i]}`]);
                            break;
                        default:
                            break;
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }

    }
}

// 入口
function main() {
    // 将源目录拷贝到目标目录
    child_process.spawnSync('cp', ['-r', sourceDir, destDir]);
    // 遍历目标目录中的文件, 改名;
    renameDestFiles().then(() => {
        // 遍历目标目录中的文件，根据像素分类
        diffPX();
    });
}

main();
