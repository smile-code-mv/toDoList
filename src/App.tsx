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

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const [selected, setSelected] = useState(false)

  const saveSelected = (taskIndex : number) => {
    setSelectedTasks(prevTasks => [...prevTasks,taskIndex])
  }
  const removeSelected = (taskIndex : number) => {
    setSelectedTasks(prevTasks => prevTasks.filter((_, i) => i !== taskIndex)
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

             <br />
             <br />

             <input id="newTaskText"
                    className={textError ? 'inputError' : ''}
                    value={newTaskText}
                    onChange={event => setNewTaskText(event.target.value)}
                    placeholder={textPlaceholder}/>
      </div>

      <br />

      <div id="buttons">
          <button id="addTask" onClick={() => addNewTask(task)} >+</button>
       </div>
        
       <hr />

       <div id="tasks">
             {tasks.map((task, index) => (
              <div className="task" key={index}>
                 <button className="setting">⚙</button>
                 <div className="taskBody">
                    <h3 className="taskTopic">{task.topic}</h3>
                    <hr />
                    <p className="taskText">{task.text}</p>
                  </div>
             </div>
            ))}
      </div>

    </div>

    </>
  )
}

export default App
