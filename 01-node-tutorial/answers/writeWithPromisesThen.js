const { writeFile, readFile } = require("fs").promises;

writeFile("temp.text", "first line\n")
  .then(() => {
    console.log("line 1 done");
    return writeFile("temp.txt", "second line\n", { flag: "a" });
  })
  .then(() => {
    console.log("line 2 done");
    return writeFile("temp.txt", "third line\n", { flag: "a" });
  })
  .then(() => {
    console.log("line 3 done");
    return readFile("temp.txt", "utf8");
  })
  .then((data) => {
    console.log("file content:\n", data);
  })
  .catch((error) => {
    console.error("An error ocurred:", error);
  });
