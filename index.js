import fs from 'q-io/fs'
import fsReaddir from 'fs-readdir-promise'
import promisify from 'util'
import startUserInput from './search.js'


const directoryPath = './txt_src'
const table = new Map()
let file_count = 0

console.log('reading files.....please wait')
readFiles()

function readFiles() {
  const promises = []
    fsReaddir(directoryPath)
    .then(files => {
      files.forEach((file) => {
        promises.push(
          fs.read(directoryPath + '/' + file, 'b')
          .then(content => {
          file_count++
          processFile(String(content), file)
        })
        .catch(err => {
          console.log(err)
        })
      )})
      Promise.all(promises).then(() => {
          computeIDF()
        })
        .then(() => {
          startUserInput(table)
        })
      })
  .catch(err => {
    console.log(err)
    })
  }

function processFile(content, i){
  const words = content.toLowerCase().replace(/[\.\,]/g,'').split(' ')
  words.forEach ((element) => {
    if (!table.has(element)) {
      const wrap = []
      const arr = [i, 1, 0]
      wrap.push(arr)
      table.set(element, wrap)
    }
    else {
      const storedvalue = table.get(element)
      if(i === storedvalue[storedvalue.length - 1][0]) storedvalue[storedvalue.length - 1][1] += 1
      else {
        const arr = [i, 1]
        storedvalue.push(arr)
      }
      table.set(element, storedvalue)
    }
  })
}

function computeIDF() {
  for (let [key, value] of table) {
    let temp = 0
    for(let i = 0; i < value.length; i++){
      temp++
    }
    const idf = file_count / temp
    value[0][2] = idf
    table.set(key, value)
  }
  console.log('done')
}
