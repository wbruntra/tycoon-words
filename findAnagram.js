const fs = require('fs')
const _ = require('lodash')

const words = require('./words.json')
let masterStubs = require('./stubs.json')
masterStubs = new Set(masterStubs)

const mergeSets = (setA, setB) => {
  return new Set([...setA, ...setB])
}

const wordsSet = new Set(words)

const createStubs = (words) => {
  let wordList
  if (fs.existsSync('./stubs.json')) {
    console.log('using saved stubs')
    wordList = require('./stubs.json')
    return new Set(wordList)
  }
  let results = new Set()
  words.forEach((word) => {
    for (let i = 1; i < word.length; i++) {
      results.add(word.slice(0, i))
    }
  })
  fs.writeFileSync('./stubs.json', JSON.stringify([...results], null, 2))
  return results
}

const isWord = (str) => {
  return wordsSet.has(str)
}

const isStub = (str) => {
  const result = masterStubs.has(str)
  return result
}

const getUnused = (str, initialLetters) => {
  let result = initialLetters
  ;[...str].forEach((l) => {
    result = result.replace(l, '')
  })
  return result
}

const getStubs = (base, rest) => {
  let results = new Set()
  ;[...rest].forEach((ltr) => {
    if (isStub(base + ltr)) {
      let removed = rest.replace(ltr, '')
      results.add(base + ltr)
      const moreStubs = getStubs(base + ltr, removed)
      results = mergeSets(results, moreStubs)
    }
  })
  return results
}

const getAllWords = (letters, minLength = 1) => {
  const capLetters = letters.toUpperCase()
  const results = new Set()
  const stubs = getStubs('', capLetters)
  ;[...stubs].forEach((stub) => {
    const rest = getUnused(stub, capLetters)
    ;[...rest].forEach((ltr) => {
      if (isWord(stub + ltr)) {
        results.add(stub + ltr)
      }
    })
  })
  return [...results].filter((w) => w.length >= minLength)
}

module.exports = getAllWords
