const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to the home page!');
  } else if (req.url === '/about') {
    res.end('This is the about page.');
  } else {
    res.end(`
    <h1>uh-oh!!</h1>
    <p>Page you are looking for not found</p>
    <a href="/">back home</a><br>
    <a href="/about">about me</a>
    `);
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});