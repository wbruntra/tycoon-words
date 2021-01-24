const assert = require('assert')

const eqSet = (as, bs) => {
  if (as.size !== bs.size) return false
  for (var a of as) if (!bs.has(a)) return false
  return true
}

const test = () => {
  let stubs = getStubs('BE', 'LLT')
  let validStubs = new Set(['BEL', 'BELL', 'BELT', 'BELTL', 'BET'])
  assert(eqSet(stubs, validStubs))

  const unused = getUnused('BCE', 'ABCDE')
  assert(unused == 'AD')

  assert(isStub('WASSA'))
  assert(isWord('HELLO'))

  stubs = getStubs('', 'HELLO')

  const butAnagrams = ['UT', 'BUT', 'TUB']

  const allWords = getAllWords('TUBA', 3)
  console.log(allWords)
  console.log('tests pass!')
}

test()