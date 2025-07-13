const { writeFile } = require("fs");

console.log("start");

writeFile("./temporary/fileB.txt", "This is line 1\n", (err, result) => {
  console.log("writing line 1");
  if (err) {
    console.log("This error happened on line 1: ", err);
    console.log("End of line 1");
  
} else {
    console.log("I wrote line 1");
    writeFile("./temporary/fileB.txt", "This is line 2\n", { flag: 'a' }, (err) => {
      if (err) {
        console.log("This error happened on line 2: ", err);
      } else {
        console.log("I wrote line 2");
        writeFile("./temporary/fileB.txt", "This is line 3\n", { flag: 'a' }, (err) => {
          if (err) {
            console.log("This error happened on line 3: ", err);
          } else {
            console.log("I wrote line 3");
            console.log("Done with all lines");
          }
        });
      }
    });
  }
});

console.log("at end");