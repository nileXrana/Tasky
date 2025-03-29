import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let ak = localStorage.getItem("todos")
    console.log(ak)
    if(ak){
      let t = JSON.parse(ak)
      setTodos(t)
      console.log(t)
    }
  },[])  
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Save todos whenever it changes

  const handleAdd = () => {
    // setTodos([...todos, { id:uuidv4(), todo, isCompleted: false }])
    setTodos(prevTodos => [...prevTodos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("")
  }

  const handleEdit = (e,id) => {
    let t = todos.find(item => item.id === id);
    setTodo(t.todo) 
    // delete it :
    let index = todos.findIndex(ele=>{
      return ele.id == id
    })
    let newTodos = [...todos] // new array :
    newTodos.splice(index,1)
    setTodos(newTodos)
  }
  
  const handleDelete = (e,id) => {
    let index = todos.findIndex(ele=>{
      return ele.id == id
    })
    let newTodos = [...todos] // new array :
    newTodos.splice(index,1)
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(ele=>{
      return ele.id == id
    })
    let newTodos = [...todos] // new array :
    newTodos[index].isCompleted = !newTodos[index].isCompleted // toggle kar do :
    setTodos(newTodos)
  }

  const toggleFinished = (e)=>{ // toggle :
    setshowFinished(!showFinished)
  }
  
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-3 rounded-xl p-5 bg-violet-100 min-h-[90vh] md:w-[50%] relative">
        <h1 className='font-bold text-center text-3xl'>Tasky - Manage your Tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold text-center'>Add a Task</h2>
          <div className="flex">
            <input type="text" value={todo} onChange={handleChange} className='w-full rounded-full px-5 py-1 bg-white' />
            <button onClick={handleAdd} disabled={todo.length==0} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save </button>
          </div>
        </div >
        <input className='my-4' onChange={toggleFinished} checked={showFinished} id='show' type="checkbox" />
        <label className='mx-2' htmlFor="show">Show Finished Tasks</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Tasks</h2>
        <div className='todos'>
          {todos.length==0 && <div className='m-5'>No Todos to display</div>}

          {todos.map(ele => {
            return (showFinished || ele.isCompleted===false) && <div key={ele.id} className="todo flex justify-between p-2 mb-2 rounded-2xl items-center">
              <div className="first flex gap-5">
              <input onChange={handleCheckbox} name={ele.id} type="checkbox" checked={ele.isCompleted} />
              <div className={ele.isCompleted?"line-through":""}>{ele.todo}</div>
              </div>
              <div className="buttons flex">
                <button onClick={(e)=>{handleEdit(e,ele.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg font-bold text-white rounded-md mx-1 h-9'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,ele.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg font-bold text-white rounded-md mx-1 h-9'><MdDelete /></button>
              </div>
            </div>
          })}
          <div className='text-center absolute bottom-2 left-[40%]'>
            <b>@NileshRana</b>
          </div>
        </div>




      </div>
    </>
  )
}

export default App
