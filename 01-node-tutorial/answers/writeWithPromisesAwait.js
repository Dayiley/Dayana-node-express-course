const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("temp.txt", "Line 1\n");

    await writeFile("temp.txt", "Line 2\n", { flag: "a" });

    await writeFile("temp.txt", "Line 3\n", { flag: "a" });

    console.log("done writing 3 lines");
  } catch (error) {
    console.error("error ocurred writing file", error);
  }
};

const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log("temp file content:\n", data);
  } catch (error) {
    console.log("error reading file:", error);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
