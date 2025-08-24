// const chalk = require('chalk');

// console.log(chalk);

// function sum(a , b){
//     return a + b;
// }
// const s = sum(2 , 4);
// console.log(s);

// const path = require("path");
// console.log(__dirname);
// console.log(__dirname + "../../index.js" + "/projects" + "/index.js");
// console.log(path.join("/users/remonsaha/Remon-class-node", "../../index.js" + "/projects" + "/index.js")) ;

// const fs = require('fs');
// function main(filename) {
//     console.log(process.argv);
//     fs.readFile(filename, 'utf8', (err, data) => {
//         let total =0;
//          for(let i =0 ; i< data.length ; i++){
//             if(data[i] === " "){
//                 total++;
//             }
//          }
//          console.log(total + 1);
//     });
// }
// // main("a.txt");
// main(process.argv[2]);


const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let words = 0;
        for(let i =0 ; i < data.length; i++) {
            if(data[i] === "\n"){
                words++;
            }
        }
        console.log(`There are ${words +1} lines in ${file}`);
      }
    });
  });

program.parse(); 