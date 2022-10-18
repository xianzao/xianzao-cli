<br />
<h1 align="center">xianzao-cli</h1>
<p align="center">
<a href="https://github.com/xianzao/xianzao-cli/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/xianzao/xianzao-cli"></a>
<a href="https://github.com/xianzao/xianzao-cli/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/xianzao/xianzao-cli"></a>
</p>

## 目标

实现一个项目初始化 CLI，为后续项目提供统一初始化脚手架

## 实现功能

- 保存代码自动格式化
- 提交前 commit 校验
- eslint + prettier 校验
- husky 自动装载

## 使用方式

局部安装

```BASH
# 1. 项目中执行
npm i xianzao-cli -D

# 2. 在package.json中添加script
"scripts": {
  "xianzao-cli": "xianzao-cli",
},

# 3. 执行npm run xianzao-cli, 即会自动添加依赖
```

## NPM

项目已自动更新至 NPM，请移步至[xianzao-cli](https://www.npmjs.com/package/xianzao-cli)
