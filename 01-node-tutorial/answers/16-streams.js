const { createReadStream } = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../content/big.txt");

const stream = createReadStream("./content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(` Chunk #${chunkCount}:`, chunk);
});

stream.on("end", () => {
  console.log(` Read over. total chunks: ${chunkCount}`);
});

stream.on("error", (error) => {
  console.error(" Error ocurred:", error);
});
