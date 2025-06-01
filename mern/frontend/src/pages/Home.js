import { useState, useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';


const Home = () => {
    // const [ tasks, setTasks ] = useState(null);
    const {tasks, dispatch} = useTaskContext();
    const { user } = useAuthContext();

    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json(); // array of objects

            if (response.ok) {
                // setTasks(json)
                dispatch({type: 'SET_TASKS', payload: json})
            }

        }

        if (user) {
            fetchTasks();
        }
    }, [tasks, dispatch, user])

    const handleEdit = (task) => {
        setTaskToEdit(task);
    }
    
    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} onEdit={handleEdit} />
                ))}
            </div>
            <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />
        </div>
    )
}

export default Home;