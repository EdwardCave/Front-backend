
## 第一步安装
npm i bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer stripe nodemon validator

## 第二步安装

npm i nodemon --save-dev

在package.json中会出现 
"devDependencies": {
    "nodemon": "^3.1.9"
  }

## 第三步
在package.json中添加内容
“type”:"module“
"scripts": {
   
    "server": "nodemon server.js" //只添加这一个
  },
## 启动服务
bun run dev/npm run dev


## 新建一个.js文件
touch app.js