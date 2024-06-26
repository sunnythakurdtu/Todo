import { useState,useEffect } from 'react'
import Navbar from './assets/component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [count, setCount] = useState(0)
 const [todo, settodo] = useState("")
 const [todos, settodos] = useState([]);
 const [showfinished, setshowfinished] = useState(true)
 useEffect(() => {
   let todostring=localStorage.getItem("todos");
   if(todostring){
    let t=JSON.parse(localStorage.getItem("todos"));
    settodos(t);
   }
   const savetoLs=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }
   
 }, [])
 const togglefinished=()=>{
  setshowfinished(!showfinished);
 }
 const handleEdit=(e,id)=>{
  let t=todos.filter(i=>i.id===id
  )
  settodo(t[0].todo)
  let newtodos=todos.filter(item=>{
    return item.id!==id;
  })
  settodos(newtodos);
  savetoLs()
 }
 const handleDelete=(e,id)=>{
  let index=todos.findIndex(item=>{
    return item.id===id;
  })
  let newtodos=todos.filter(item=>{
    return item.id!==id;
  })
  settodos(newtodos);
  savetoLs()
 }
 const handleAdd=()=>{
  settodos([...todos,{id:uuidv4(),todo,isCompleted:false}]);
  settodo("")
  savetoLs()
 }
 const handleChange=(e)=>{
  settodo(e.target.value);
 }
 const handlecheckbox=(e)=>{
  let id=e.target.name;
  let index=todos.findIndex(item=>{
    return item.id===id;
  })
  let newtodos=[...todos];//for assifning new todos
  newtodos[index].isCompleted=!newtodos[index].isCompleted;
  settodos(newtodos);
  savetoLs()
  console.log(id);
 }
  return (
    <>
    <Navbar/>
      <div className="md:container md:mx-auto mx-3 bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask-Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font -bond">Add Todo</h2>
          <input  type="text" className='w-full rounded-lg px-5 py-1' onChange={handleChange} value={todo}/>
          <button disabled={todo.length<=3} className='bg-violet-900 hover:bg-violet-950 text-bold text-sm text-white rounded-md p-3 py-1 disabled:bg-violet-600' onClick={handleAdd}>Save</button>
        </div>
        <input type="checkbox" id="sf" checked={showfinished} name="" className='mx-2' onChange={togglefinished}/>
        <label htmlFor="sf">Show Finished</label>
       <h2 className="text-xl font-bond">Your Todo</h2>
       <div className="todos">
       {todos.map(item=>{
         return (showfinished||!item.isCompleted)&&<div key={item.id} className="todo flex  justify-between my-5">
        <input onChange={handlecheckbox} name={item.id} type="checkbox"  id="" checked={item.isCompleted}/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          <div className="buttons flex h-full">
            <button className='bg-violet-900 hover:bg-violet-950 text-bold text-sm text-white rounded-md p-3 py-1 mx-1' onClick={(e)=>{handleEdit(e,item.id)}}><FaEdit /></button>
            <button  className='bg-violet-900 hover:bg-violet-950 text-bold text-sm text-white rounded-md p-3 py-1 mx-1'onClick={(e)=>{handleDelete(e,item.id)}}><MdDelete /></button>
          </div>
        </div>})}
       </div>
      </div>
    </>
  )
}

export default App
