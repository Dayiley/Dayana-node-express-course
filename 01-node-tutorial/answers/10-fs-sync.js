const { readFileSync, writeFileSync } = require('fs');

console.log('start')
const filePath = './temporary/fileA.txt';

writeFileSync(filePath, 'Line one\n');
writeFileSync(filePath, 'React\n', { flag: 'a' });
writeFileSync(filePath, 'Node\n', { flag: 'a' });

const content = readFileSync(filePath, 'utf8');
console.log(content);