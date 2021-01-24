import { useState } from 'react'
import './App.css'
// import axios from 'axios'
import getAllWords from './utils'
import { orderBy } from 'lodash'

function App() {
  const [search, setSearch] = useState('')
  const [words, setWords] = useState([])
  const [letterHistory, setLetterHistory] = useState([])
  const [selected, setSelected] = useState('')

  const Dropdown = ({ options, onSelect }) => {
    return (
      <select
        value={selected}
        onChange={(e) => {
          console.log(e)
          onSelect(e)
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    )
  }

  // const getWords = (str) => {
  //   axios.get(`/api/ag/${str}`).then((res) => {
  //     setWords(res.data)
  //   })
  // }

  const getWordsLocally = (str) => {
    let newWords = getAllWords(str, 3)
    newWords = orderBy(newWords, (word) => word.length, 'desc')
    setWords(newWords)
  }

  const handleSelect = (e) => {
    setSelected(e.target.value)
    getWordsLocally(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLetterHistory([...letterHistory, search])
    getWordsLocally(search)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input className="letter-input" value={search} autoFocus onChange={(e) => setSearch(e.target.value)} />
          <input type="submit" hidden />
        </form>
        <p>History:</p>
        <Dropdown className="history-dropdown" options={letterHistory} onSelect={handleSelect} />
        <div className="main">
          {/* <div>
            <p>History:</p>
            <ul>
              {letterHistory.map((word) => {
                return (
                  <li
                    key={`history-${word}`}
                    onClick={() => {
                      getWords(word)
                    }}
                    className="history-item"
                  >
                    {word}
                  </li>
                )
              })}
            </ul>
          </div> */}
          <div>
            {words.length === 0 && <p>No possible words!</p>}
            <ul className="wordlist">
              {words.map((word) => {
                return <li className="wordlist-item" key={`word-${word}`}>{word}</li>
              })}
            </ul>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
