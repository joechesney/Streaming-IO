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
// const languages_cap = fs.createWriteStream('languages_cap.json');
const toCaps = Transform();
const languages_cap = Writable();

toCaps._transform = (buffer, _, cb) =>{
  // let capString = buffer.toString().toUpperCase();
  cb(null, buffer.toString().toUpperCase());
}
let newString = "Words";
newString.toUpperCase();

languages_cap._write = (buffer, _, next) =>{
  writeFile("languages_Cap.json", buffer, (error) =>{
    if(error){
      throw error;
    }
    console.log('data written to file!');
  })
  next();
}

languages
.pipe(toCaps)
.pipe(languages_cap);

