const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("hello", (name) => {
  console.log(`hi, ${name}, welcome to my project `);
});

emitter.on("item", (name, price) => {
  console.log(`item added: ${name}, Price: $${price}`);
});

emitter.on("start", () => {
  console.log("Process has begun...");
  emitter.emit("hello", "Dayana");
});

emitter.emit("start");
emitter.emit("item", "CTD Mug", 10);
