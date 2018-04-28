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
       answer = answer.split(' ')
       startSearch(matrix, answer)

        rl.close()
        startUserInput(matrix)
       }
     }
  )
}
function startSearch(matrix, answer) {
  const found = new Array()
  let check_bool = false

  for(let i = 0; i < answer.length; i++) {
    const result = matrix.get(answer[i].toLowerCase())
    if(result === undefined) {
      i = answer.length
      break
    }
    else {
    found.push(result)
    check_bool = true
  }
  }
  if(!check_bool) {
    console.log('not found')
  }
  else {
    let final
    if(found[0].constructor !== Array) {
      final = new Array()
      final.push(found[0])
    }
  else { final = found[0]}
    for(let i  = 1; i < found.length; i++) {
      final = final.diff(found[i])
    }
    console.log(`found ${answer} in: ${final}`)
  }
}
//quelle: https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
Array.prototype.diff = function(arr2) {
  if(arr2.constructor !== Array) {
    const arr = arr2
    arr2 = new Array()
    arr2.push(arr)
  }
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};
