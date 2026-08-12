import './App.css'
import {useState} from 'react'

const App = () => {

  const [newTaskTopic,setNewTaskTopic] = useState('')
  const [newTaskText,setNewTaskText] = useState('')

  const [topicError, setTopicError] = useState(false)
  const [textError, setTextError] = useState(false)

  type ValidTask = {
    topic : string
    text: string
  }

  const task = {
     topic : newTaskTopic,
     text : newTaskText
  } 
  const [topicPlaceholder, setTopicPlaceholder] = useState('Write task topic')
  const [textPlaceholder, setTextPlaceholder] = useState('Write new task')

  const [tasks, setTasks] = useState<ValidTask[]>([])

  const addNewTask = (task : ValidTask) => {

    if (task.topic.trim() === '') {
      setTopicPlaceholder("This row can't be empty")
      setTopicError(true)
    } else {
      setTopicPlaceholder("Write task topic")
      setTopicError(false)
    }

    if (task.text.trim() === '') {
      setTextPlaceholder("This row can't be empty")
      setTextError(true)
    } else {
      setTextPlaceholder("Write new task")
      setTextError(false)
    }

    if(topicError === true || textError === true){
      return 0;
    }

    setTasks(prevTasks => [...prevTasks, task])

  }

  return(
    <>
    <div id="appBody">

      <div id="inputs">
             <input id="newTaskTopic"
                    className={topicError ? 'inputError' : ''}
                    value={newTaskTopic}
                    onChange={event => setNewTaskTopic(event.target.value)}
                    placeholder={topicPlaceholder} />

             <br id="spaceBetweenInputs"/>

             <input id="newTaskText"
                    className={textError ? 'inputError' : ''}
                    value={newTaskText}
                    onChange={event => setNewTaskText(event.target.value)}
                    placeholder={textPlaceholder}/>
      </div>

      <div id="buttons">
          <button id="addTask" onClick={() => addNewTask(task)} >+</button>
       </div>

       <div id="tasks">
             {tasks.map((task, index) => (
              <div className="task" key={index}>
                 <h1 className="taskTopic">{task.topic}</h1>
                 <p className="taskText">{task.text}</p>
             </div>
            ))}
      </div>

    </div>

    </>
  )
}

export default App
