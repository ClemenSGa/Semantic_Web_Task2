import readline from 'readline'

export default function startUserInput(matrix) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter query, empty to quit:  ', (answer) => {
    if(answer === '') {
       rl.close()
       console.log(`Thank you, Good Bye!`)
     }
     else {
       startSearch(matrix, answer.toLowerCase())
       rl.close()
       startUserInput(matrix)
     }

  });
}

function startSearch(matrix, answer) {
  const result = matrix.get(answer)
  if(result === undefined) {
    console.log('not found')
  }
  else {
    console.log(`found ${answer} in: ${result}`)
  }
}
