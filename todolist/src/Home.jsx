import { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill} from 'react-icons/bs'; // Importing icons from react-icons library
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get( 'http://localhost:3002/todos' )
        .then(result =>setTodos(result.data))
        .catch(err => console.log(err))
    },[])    

        const handleEdit = (id) =>{
        axios.put('http://localhost:3002/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
        }
    
        const handleDelete = (id) =>{
        axios.delete('http://localhost:3002/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
        }
    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create />

            {todos.length === 0 
            ? (
                <div className='no-todos'>
                    <h2>No Record</h2>
                </div>
            ) : (
                <div className='todo-list'>
                    {todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={ () => handleEdit(todo._id)}>
                                {todo.done ? 
                                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                                : <BsCircleFill className='icon' />}
                                
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span>
                                    <BsFillTrashFill className='icon' 
                                    onClick={() => handleDelete(todo._id)}/>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
