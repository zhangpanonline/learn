const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 读取 HTTPS 证书和私钥
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem')),
};

// 创建 HTTPS 服务器
const server = https.createServer(options, (req, res) => {
  // 解析请求路径（防止路径遍历攻击）
  const parsedUrl = url.parse(req.url);
  const sanitizedPath = path
    .normalize(parsedUrl.pathname)
    .replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, sanitizedPath);

  // 设置 CORS 响应头
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名（生产环境应替换为具体域名）
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 读取文件并返回
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {// 根据文件扩展名设置 Content-Type
      const extname = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
     '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      };
      const contentType = mimeTypes[extname] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);}
  });
});

// 启动服务器
const PORT = 443;
server.listen(PORT, () => {
  console.log(`https://[2409:8a70:3a79:a9c1:4805:e2a5:95:3]/logo.jpg`);
  console.log(`https://mp.zhangpan.online/logo.jpg`);
});