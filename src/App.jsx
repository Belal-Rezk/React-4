import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [dice , setDice] = useState(allNewDice())
  const [tenzies , setTenzies] = useState(false)

  useEffect(()=>{
    const isHeld = dice.every(die=>die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die=> die.value === firstValue)
    if (isHeld && allSameValue) {
      setTenzies(true)
    }
  },[dice])

  function generateNewDie () {
    return {
      value :Math.ceil(Math.random() * 6) , 
      isHeld: false , 
      id: nanoid()
    }
  }

  function allNewDice () {
    const NewDice = []
    for (let i = 0 ; i < 10 ; i++) {
      NewDice.push(generateNewDie())
    }
    return NewDice
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
}
  function holdDice (id) {
    setDice(prev => 
      prev.map(die=>{
          return  die.id === id ?{...die , isHeld: !die.isHeld} : die
        
      })
      )
  }
  const Dice = dice.map(die => 
  <Die value={die.value} key={die.id} isHeld={die.isHeld} id={die.id} holdDice={()=>holdDice(die.id)}
  />)
  const text = tenzies ? "New Game" : "Roll"
  return (
    <div className="App">
        <main>
          {tenzies && <Confetti />}
        <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <article>
              {Dice}
            </article>
            <button onClick={rollDice}> {text} </button>
        </main>

    </div>
  )
}

export default App
