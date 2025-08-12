const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

let selectedColor = "white";

//code
const form = () => {
  return `
  <html>
    <head>
      <style>
        body {
          background-color: ${selectedColor};
          font-family: sans-serif;
          padding: 20px;
        }
      </style>
    </head>
    <body>
    <div style="margin: auto; text-align: center;">
      <h1 style="color:darkgray">Choose a background color</h1>
      <form method="POST">
        <select name="color">
          <option value="white">White</option>
          <option value="darkred">Red</option>
          <option value="darkblue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
          <option value="teal">Teal</option>
          <option value="lavender">Lavender</option>
          <option value="black">Black</option>
          <option value="orange">Orange</option>
        </select>
        <button type="submit">Apply</button>
      </form>
      </div>
    </body>
  </html>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is", req.method);
  console.log("req.url is", req.url);

  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is", body);

      if (body["color"]) {
        selectedColor = body["color"];
      }

      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
