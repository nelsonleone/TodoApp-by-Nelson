import { useEffect, useState } from "react"
import {nanoid} from 'nanoid';

export default function Todo({setTodos,todos}){
   
   const [openTextArea,setOpenTextArea] = useState(false)
   const [isEditing,setIsEditing] = useState(false)
   const [edittedValue,setEdittedValue] = useState(null)
   const [view,setView] = useState(false)
   const [viewingData,setViewingData] = useState(null)
   const [todoInputValue,setTodoInputValue] = useState("")
   const [alert,setAlert] = useState({
      msg:"",
      type:"",
      display:false
   })

   const conditionalClassName = todoInputValue !== "" ? "activeInput-state" : "";
   const addedDay = new Date().toDateString()
   const addedTime = new Date().toLocaleTimeString()


   function handleTextAreaClosure(){
      setOpenTextArea(false) 
      setIsEditing(false)
      setTodoInputValue("")
   }

   function handlePlusButtonClick(){
      setOpenTextArea(true)

      if(todoInputValue && !isEditing){
         setTodos(prev => {
            return [{text:todoInputValue,id:nanoid(),day:addedDay,time:addedTime},...prev]
         })
         setTodoInputValue("")
         setOpenTextArea(false)
         alertConstructor(true,"add","To-do Added")
      }

      if(isEditing && todoInputValue !== "" && todoInputValue !== " "){
         finishEditing()
      }
   }

   function handleEnterKey(e){
      if(e.key === "Enter" && todoInputValue !== "" && !isEditing){
         setTodos(prev => {
            return [{text:todoInputValue,id:nanoid(),day:addedDay,time:addedTime},...prev]
         })
         setTodoInputValue("")
         setOpenTextArea(false)
         alertConstructor(true,"add","To-do Added")
      }

      if(isEditing && e.key === "Enter" && todoInputValue !== "" && todoInputValue !== " "){
         finishEditing()
      }
   }

   function handleDoneTodos(id){
      setTodos(prev => {
         return prev.filter(item => {
            return item.id  !== id
         })
      })

      alertConstructor(true,"delete","To-do Deleted")
   }


   // setting up a dynamic alert function for the ALERT state value
   function alertConstructor(display=false,type="",msg=""){
      setAlert({display,type,msg})
   }

   // handling the eidt todo functionality
   function handleEdit(id,text){
      setTodoInputValue(text)
      setOpenTextArea(true)
      setIsEditing(true)
      setEdittedValue(id)
   }


   function finishEditing(){
     setTodos(prev => {
       return prev.map(item => {
         const {id,text} = item;
         return id === edittedValue ? {...item,id:nanoid(),text:todoInputValue} : item;
       })
     })
      setTodoInputValue("")
      setIsEditing(false)
      setOpenTextArea(false)
      alertConstructor(true,"add","To-do Editted")
   }


   function handleViewing(text,day,time){
      setView(true)
      setViewingData({text,day,time})
   }


   // style for determining the alert width/display
   const alertTransitionStyle =  {
      display : !alert.display ? "none" : "block"
   }

   useEffect(() => {
      if(alert.display){
         setTimeout(() => {
            alertConstructor(false,"","")
         }, 1700);
      }
   })

   return(
      <div className="todo-section">
         {alert.display &&
           <p className={alert.type === "delete" ? "deleteAlert" : "addAlert"} style={alertTransitionStyle}>{alert.msg}</p>
         }

         <div className="todo-icons">
            <img src="/images/todo-list.png" alt="Todo note image" className='home-icon'/>
            <button 
               className="add-todoBtn"
               aria-controls="input-todo" 
               aria-expanded={openTextArea}
               onClick={handlePlusButtonClick}
              >
               <img src="/images/plus-iconn.png" alt="" aria-hidden="true" className={conditionalClassName}/>
            </button>
         </div>

         {openTextArea && 
            <div>
               <textarea 
                 id="input-todo" 
                 maxLength={200} 
                 onChange={(e) => setTodoInputValue(e.target.value)}
                 onKeyDown={(e) =>handleEnterKey(e)}
                 value={todoInputValue}
                 >
                 </textarea>
               <button className="cancel-input" onClick={handleTextAreaClosure}>x</button>
            </div>
         }

         <div className="todo-list">
            {todos.map((item,index) => {
               const {id,text,day,time} = item;

               return(
                  <article className="todo-item" key={id} id={id}>
                     <button className="mark-doneBtn" onClick={() => handleDoneTodos(id)} disabled={view}>
                        <img src="/images/good-mark.svg" alt="Good Mark Icon" />
                     </button>
                     <p>{text.substr(0,35)}..............</p>
                     <div className="todoItem-icons">
                        <button onClick={() => handleEdit(id,text)} aria-controls={id}  aria-labelledby="edit-todo">
                          <img src="/images/edit.png" alt="" aria-hidden="true"/>
                        </button>
                        <title id="edit-todo" style={{display:"none"}}>Edit This Todo Item</title>


                        <button onClick={() => handleViewing(text,day,time)} aria-controls="view-modal" aria-expanded={view}>
                          <img src="/images/view.png" alt="" aria-hidden="true"/>
                        </button>
                     </div>
                  </article>
               )
            })}
         </div>
         {view && 
            <div id="view-modal" className="view-modal">
               <button onClick={() => setView(false)} aria-expanded={view} aria-controls="view-modal">
                  <img src="/images/icon-close.svg" alt="" aria-hidden="true" />
               </button>
               <p>{viewingData.day} By..... {viewingData.time}</p>
               <p>{viewingData.text}</p>
            </div>
         }
      </div>
   )
}
