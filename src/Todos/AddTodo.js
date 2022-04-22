import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

function AddTodo({setItemsOfParent}) {
    const [item, setItem] = useState('')

    const handleAdd = () =>{
        if(!item){
            toast.error(`Missing title's Todo!`)
        }else{
            setItemsOfParent(prevItems => {
                const newItems = [...prevItems, {
                    id: `td${prevItems.length+1}`,
                    title: item
                }]

                localStorage.setItem('todos',JSON.stringify(newItems))
                return newItems
            })
            setItem('')
            toast.success('Wow so easy!')
        }

    }
  return (
    <div className='add-todo' >
            <input  type='text'
            value={item}
            className='formControl' 
            placeholder='Enter what to do...'
            onChange={(e)=>setItem(e.target.value)}></input>
            <button type='button' 
                onClick={handleAdd}
            >Add</button>
    </div>
  )
}

export default AddTodo