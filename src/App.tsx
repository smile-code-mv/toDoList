import './App.css'
import {useState} from 'react'

const App = () => {

  const [newTaskTopic,setNewTaskTopic] = useState('')
  const [newTaskText,setNewTaskText] = useState('')

  const [topicError, setTopicError] = useState(false)
  const [textError, setTextError] = useState(false)

  type ValidTask = {
    id: string
    topic : string
    text: string
  }

  const task = {
     id: crypto.randomUUID(),
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

  const [taskDataArray, editTaskDataArray] = useState([]);

  const [selected, setSelected] = useState({
    status : false,
    quantity : 0,
  })

  const saveSelected = (taskId : string) => {
    editTaskDataArray(prevTasks => [...prevTasks,{ id: taskId, click : 0}])
    if (selected.status === false){
      setSelected({
        status : true,
        quantity : 1,
      })
    } else setSelected(prev => ({
      ...prev,
      quantity: prev.quantity += 1
    }))
  }
  const removeSelected = (taskId : string) => {
    editTaskDataArray(prevData => prevData.filter(item => item.id !== taskId))
    if (selected.quantity === 0){
      setSelected(prev => ({
        ...prev,
        status: false,
      }))
    }else setSelected(prev => ({
      ...prev,
      quantity : prev.quantity -= 1,
    }))
  }
  const editClick = (taskId: string) => {
    editTaskDataArray(prevArray => prevArray.map(data => data.id === taskId
        ? { ...data, click: data.click === 0 ? 1 : 0 }
        : data
    )
  )
  }
  const removeTasks = () => {
    setTasks(prevTasks => prevTasks.filter(data => !taskDataArray.some(item => item.id === data.id)));
  editTaskDataArray([])
  setSelected({
    status : false,
    quantity : 0,
  })
  }

  const settingBtn = id => {
    if (selected.quantity === 0) saveSelected(id) 

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
          {selected.status &&
            <>
            <button id="delete" onClick={() => removeTasks()}></button>
            <button id="complite"></button>
            </>
          }
       </div>
        
       <hr />

       <div id="tasks">
             {tasks.map(task => (
              <div className="task" key={task.id}>
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
