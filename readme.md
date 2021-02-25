# Extract and classify the focus Wallpaper of win10 using node.js

> 本程序适用于很多批量修改文件名的情况，只需修改 sourceDir 和 destDir 的值，然后自定义 oldName 和 newName 即可。(代码可能有不足之处，因只处理简单问题，故仅供参考)

## 效果

[![yjqUFe.png](https://s3.ax1x.com/2021/02/25/yjqUFe.png)](https://imgtu.com/i/yjqUFe)

## 环境

- win10

- node.js

```wsl
    npm init -y
    npm install get-pixels --save
```

## 自定义程序变量

$sourceDir, $destDir, $oldName, $newName

## 终端执行命令即可运行

> Tips: 要确保自定义的 $destDir 目录不存在。 

```wsl
    node index.js
```
