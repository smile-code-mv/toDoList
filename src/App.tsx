import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const App = () => {
  const age = parseInt(prompt("Write your age"))
  const name = prompt("Write your name")
  return(
    <>
    <h1>Hello</h1>
    <p>Your name is {name}</p>
    <p>You have {age} years</p>
    </>
  )
}

export default App
