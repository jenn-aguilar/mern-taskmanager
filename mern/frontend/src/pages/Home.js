import { useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";

import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';


const Home = () => {
    // const [ tasks, setTasks ] = useState(null);
    const {tasks, dispatch} = useTaskContext();

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:4000/api/tasks');
            const json = await response.json(); // array of objects

            if (response.ok) {
                // setTasks(json)
                dispatch({type: 'SET_TASKS', payload: json})
            }

        }

        fetchTasks();
    }, [dispatch])
    
    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home;