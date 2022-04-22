import React from 'react'
import { useState } from 'react'
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';
import './ListTodo.css'

const ListTodo = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('todos'))||[])

    const handleDelete = (id) =>{
        setItems( prevItems =>{
            const newItems = prevItems.filter((item) =>  item.id !== id)
            localStorage.setItem('todos',JSON.stringify(newItems))
            return newItems
        })
        toast.success('Delete succeed!')
    }

    const [editTodo, setEditTodo] = useState({})
    const handleEdit = (item) =>{
        let isEmptyObject =  Object.keys(editTodo).length === 0
        if(isEmptyObject === false && editTodo.id === item.id){

            
            setItems(preItem => {
                const objIndex = items.findIndex((obj => obj.id === editTodo.id))
                const newItems = [...items] 
                newItems[objIndex].title = editTodo.title
                localStorage.setItem('todos',JSON.stringify(newItems))
                setEditTodo({})
                return newItems
            })
            toast.success('Edited successfully')
        }
        else{
            setEditTodo({id: item.id, title: item.title})
        }
    }

    let isEmptyObject =  Object.keys(editTodo).length === 0 

    const handleOnChangeEditTodo = (e) => {
        setEditTodo( prevEditTodo =>{
            const newEditTodo = {...editTodo, title: e.target.value}
            return newEditTodo
            } 
        )
    }

  return (
    <div className='list-todo-container'>
        <AddTodo setItemsOfParent = {setItems}/>
        <div className='list-todo-content'>
            <ul>
                {
                    items && items.length>0&&
                    items.map((item,index) =>(
                        <li key={index} className='itemTodo'>
                            {
                                isEmptyObject?<span>{index+1} - {item.title}</span>:
                                <>
                                    {editTodo.id === item.id?
                                    <span>{index+1} - <input className='formControl'
                                    onChange={(e)=> handleOnChangeEditTodo(e)}
                                    value={editTodo.title}/></span>:
                                    <span>{index+1} - {item.title}</span>
                                    }
                                </>
                                
                            }
                            <div className='itemBtn'>
                                <button
                                    onClick={()=> handleEdit(item)}
                                >{!isEmptyObject && editTodo.id === item.id?'Save':'Edit'}</button>
                                <button onClick={()=>handleDelete(item.id)}>Delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default ListTodo