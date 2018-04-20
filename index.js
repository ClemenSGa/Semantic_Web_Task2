import FS from 'q-io/fs'
import startUserInput from './userinput.js'

const table = new Map()

readFile(1)
readFile(2)
readFile(3)
startUserInput(table)

function readFile(i) {
  return FS.read('./txt_src/' + i + '.txt', 'b')
  .then(content => {
    processFile(String(content), i)
  })
  .catch(err => {
    console.log(err)
  })
}

function processFile(content, i){
  const words = content.toLowerCase().replace(/[\.\,]/g,'').split(' ')
  words.forEach ((element) => {
    if (!table.has(element)) {
      table.set(element, i)
    }
    else{
      const storedvalue = table.get(element)
      if (storedvalue.constructor === Array) {
        storedvalue.push(i)
        table.set(element, storedvalue)
      }
      else {
         const ii = [storedvalue, i]
         table.set(element, ii)
       }
    }
  })

}
