const names = require('./04-names.js');
const sayHi = require('./05-utils.js');
const flavor = require('./06-alternative-flavors.js');
require('./07-mind-grenade.js');


console.log(names);

sayHi(names.john);
sayHi(names.dayana);

console.log(flavor.item1, flavor.item2)
