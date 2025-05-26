import { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";

const TaskForm = () => {
    const { dispatch } = useTaskContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState(0);
    const [duedate, setDuedate] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {title, description, status, priority, duedate};
        console.log(task)

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setTitle('');
            setDescription('');
            setStatus('To Do');
            setPriority(0);
            setDuedate('');
            setError(null);
            setEmptyFields([])
            console.log('New task added', json);
            dispatch({type: 'CREATE_TASK', payload: json});
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task Title:</label>
            <input
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input
                type="text" 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Status:</label>
            <input
                type="text" 
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className={emptyFields.includes('status') ? 'error' : ''}
            />

            <label>Priority (1-Highest, 5-Lowest):</label>
            <input
                type="number" 
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
            />

            <label>Duedate:</label>
            <input
                type="date" 
                onChange={(e) => setDuedate(e.target.value)}
                value={duedate}
            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm;