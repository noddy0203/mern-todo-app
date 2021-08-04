import React, { useState, useEffect, useRef } from "react";
import todo from "../todo.svg";
import "../App.css";

const Todo = () => {
  const inputRef = useRef();
  const toGetLocalItems = () => {
    const lists = localStorage.getItem("list");
    if (lists) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };

  const [data, setData] = useState("");
  const [input, setInput] = useState(toGetLocalItems());
  const [edit, setEdit] = useState("");
  const [toggle, setToggle] = useState(false);

  const addItem = () => {
    if (data === "") {
      alert("fill input field");
    }  else if(input && toggle){
      setInput(
        input.map((currElem)=>{
         if(currElem.id === edit){
           return {...currElem , name:input}
         }
         return currElem
        })
      )
      setData([]);
    setEdit(null);
    setToggle(false);
    }
    
    else {
      const objData = {
        id: new Date().getTime().toString(),
        name: data,
      };
      setInput([...input , objData]);
      setData("");
    }
  };

  const addWithEnter = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const removeItem = (id) => {
    const filterData = input.filter((elem, index) => {
      return id !== index;
    });
    setInput(filterData);
  };

  let removeAll = () => {
    setInput([]);
  };

  const editTodo = (index) => {
    const edited_todo = input.find((currElem) => {
      return currElem.id === index;
    });
    setData(edited_todo.name);
    setEdit(index);
    setToggle(true);
  };

  //to set list in local storage
  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("list", JSON.stringify(input));
  }, [input]);

  return (
    <>
      <div className="background">
        <div className="main_div">
          <figure>
            <img className="imgMod" src={todo} alt="img..." />
            <figcaption>Add Your Tasks Here...</figcaption>
          </figure>

          <div className="addItem">
            <input
              type="text"
              ref={inputRef}
              className="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              name="text"
              id="text"
              placeholder="Add Item Here"
              onKeyPress={addWithEnter}
            />

            {
              toggle ? (
                <i
                  className="fas fa-edit text-icon"
                  onClick={editTodo}
                  title="add-itme"
                ></i>
              ) : (
                <i
                  className="fas fa-plus-square text-icon"
                  onClick={addItem}
                  title="add-itme"
                ></i>
              )
            }
          </div>

          <div className="showItem">
            <ol className="eachItem">
              {input.map((elem, index) => {
                return (
                  <li key={elem.id}>
                    <h4>{elem.name}</h4>
                    <i
                      className="far fa-edit item-icon"
                      onClick={() => editTodo(elem.id)}
                    ></i>
                    <i
                      className="fas fa-trash item-icon"
                      onClick={() => {
                        removeItem(index);
                      }}
                      title="remove"
                    ></i>
                  </li>
                );
              })}
            </ol>
            <div className="btnlg">
              <button onClick={removeAll}></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;