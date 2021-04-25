import React, { useState, useEffect } from 'react'
import todo from "./todo.svg"
import "./App.css"
const App = () => {

  const toGetLocalItems = ()=>{
    const lists = localStorage.getItem("list")
    if(lists){
      return JSON.parse(localStorage.getItem("list"))
    } else {
      return [];
    }
  }

const [data , setData] = useState("")
const [input, setInput] = useState(toGetLocalItems())

const addItem = ()=>{
if(data===""){
   alert("fill input field")
} else{
  setInput([...input , data])
  setData("")
 }}

const removeItem = (id)=>{
const filterData = input.filter((elem, index)=>{
  return id !== index
})
setInput(filterData)
}

const removeAll = ()=> {
     setInput([])
}

//to set list in local storage
useEffect(() => {
    localStorage.setItem("list" , JSON.stringify(input))
}, [input])

//to get list from local storage


  return (
   <>
      <div className="background">
        <div className="main_div">
          <figure>
            <img className="imgMod" src={todo} alt="img..."/>
            <figcaption>Add Your Tasks Here...</figcaption>
          </figure>

          <div className="addItem">
            <input type="text" className="text" value={data} onChange={(e)=>setData(e.target.value)} name="text" id="text" placeholder="Add Item Here"/>
            <i className="fas fa-plus-square text-icon" onClick={addItem} title="add-itme"></i>
          </div>
          <div className="showItem">
              <ol className="eachItem">
                {
                  input.map((elem , index)=>{
                     return(
                      <li key={index}>
                      <h4>{elem}</h4>
                      <i className="fas fa-trash item-icon" onClick={()=>{removeItem(index)}} title="remove"></i>
                     </li>
                     )
                  })
                }
                 
              </ol>
          <div className="btnlg">
               <button onClick={removeAll}></button>
          </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default App

