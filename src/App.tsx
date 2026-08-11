import './App.css'
import {useState} from 'react'

const App = () => {
  
  const [taskTopic,setTaskTopic] = useState('')
  const [taskText,setTaskText] = useState('')

  const [topicPlaceholder, setTopicPlaceholder] = useState('Write task topic')
  const [textPlaceholder, setTextPlaceholder] = useState('      Write new task')

  type validTask = {
    topic: string
    text: string
  }

  const task : validTask = {
    topic : taskTopic
    text : taskText
  }

  return(
    <>
    <div id="appBody">

       <input id="newTaskTopic"
              value={taskTopic}
              onChange={event => setTaskTopic(event.target.value)}
              placeholder={topicPlaceholder} />

       <input id="newTaskText"
              value={taskText}
              onChange={event => setTaskText(event.target.value)}
              placeholder={textPlaceholder}/>

       <div id="taskArea"></div>
    </div>
    </>
  )
}

export default App
