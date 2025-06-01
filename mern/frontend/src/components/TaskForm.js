import { useState, useEffect } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';

const TaskForm = ({ taskToEdit, clearEdit }) => {
    const { dispatch } = useTaskContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState(0);
    const [duedate, setDuedate] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // Edit Mode
    useEffect(() => {
    if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        setStatus(taskToEdit.status || 'To Do');
        setPriority(taskToEdit.priority || '0');
        setDuedate(taskToEdit.duedate || '');
    }
  }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {title, description, status, priority, duedate};
        console.log(task);

        if (!user) {
            setError('You must be logged in.');
            return;
        }

        if (taskToEdit) {
            console.log("Update task trigger", task);
            const response = await fetch('/api/tasks/' + taskToEdit._id, {
                method: 'PATCH',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
                console.log('Task updated', json);
                dispatch({type: 'EDIT_TASK', payload: json});
                clearEdit();
            }
        } else {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
        }

        
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{taskToEdit ? 'Update Task' : 'Add a New Task'}</h3>

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
            <DatePicker
                selected={duedate}
                onChange={(date) => setDuedate(date)}
                dateFormat="dd/MM/yyyy"
            />

            <div>
                <button>{taskToEdit ? 'Update Task' : 'Add Task'}</button>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    )
}

export default TaskForm;