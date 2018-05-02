import readline from 'readline'
import _ from 'underscore'

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

  for(let i = 0; i < answer.length; i++) {
    const result = matrix.get(answer[i].toLowerCase())
    if(result !== undefined) found.push(result)
}
  if(found.length > 0) {
    const ranked = new Array()
    for(let j = 0; j < found.length; j++) {
      for(let i = 0; i < found[j].length; i++){
        const idf = found[j][0][2]
        const frequency = found[j][i][1]
        let singleword_document_ranking = frequency * idf
        if(_.findWhere(ranked, {name: found[j][i][0]}) === undefined) {
          ranked.push({name: found[j][i][0], word: answer[j], ranking: singleword_document_ranking, ranking_array: [singleword_document_ranking]})
        }
        else {
          const element = _.findWhere(ranked, {name: found[j][i][0]})
          const index = ranked.indexOf(element)
          element.word = checkArray(element.word, answer[j])
          element.ranking_array = checkArray(element.ranking_array, singleword_document_ranking)
          ranked[index] = {name: found[j][i][0], word: element.word, ranking: element.ranking + singleword_document_ranking, ranking_array: element.ranking_array}
        }
      }
  }
    const count_found = found[0].length
    console.log(`Found ${count_found} results, showing top 5\n`)
    const sortedranked = _.sortBy(ranked, 'ranking').reverse()
    for(let i = 0; i < 5 && i < sortedranked.length; i++) {
      const element = sortedranked[i]
      const words = element.word
      const rankings = element.ranking_array

      console.log(`${element.name}: ranking ${element.ranking}`)

      if (words.constructor !== Array) {
        console.log(`${element.word}: ${element.ranking}\n`)
      }
      else  {
        for(let i = 0; i < words.length; i++) {
          const answer = words[i]
          const rank = rankings[i]
          console.log(`${answer}: ${rank}`)
        }
        console.log()
      }
    }

}
  else console.log('not found')
}

function checkArray(tocheck, value) {
  if(tocheck.constructor !== Array) {
    tocheck = [tocheck, value]
  }
  else {
    tocheck.push(value)
  }
  return tocheck
}
