#!/usr/bin/env node

const { createReadStream, readFile, createWriteStream, writeFile, appendFile} = require('fs');
const { Readable, Transform, Writable } = require('stream');
// This was some practice:
// const bears = fs.createReadStream('bears.txt');
// for(let i = 1; i <1000; i++){

// }
// // bears.on("data",(data)=>{
// //   console.log('bear: ',data.toString());
// // })
// bears.pipe(process.stdout);

// const actualBears = fs.createWriteStream('actualBears.txt');
// bears.pipe(actualBears);

const languages = createReadStream('languages.json');
const toCaps = Transform();
const languages_cap = Writable();
const [,,fileArg] = process.argv;

toCaps._transform = (buffer, _, cb) =>{
  cb(null, buffer.toString().toUpperCase());
}
let newString = "Words";
newString.toUpperCase();
if(fileArg){
  languages_cap._write = (buffer, _, next) =>{
    writeFile(`${fileArg}`, buffer, (error) =>{
      if(error){
        throw error;
      }
      console.log('data written to file!');
    })
    next();
  }

}

languages
.pipe(toCaps)
.pipe(languages_cap);

