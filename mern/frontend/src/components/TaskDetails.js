import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import { formatDistanceToNow, format } from 'date-fns';

const TaskDetails = ({ task }) => {
    const { dispatch } = useTaskContext();
    const { user } = useAuthContext();
    
    const handleClick = async () => {
        if (!user) {
            return;
        }
        
        const response = await fetch('api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Description: </strong>{task.description}</p>
            <p><strong>Status: </strong>{task.status}</p>
            <p><strong>Priority: </strong>{task.priority}</p>
            <p><strong>Date Added: </strong>{formatDistanceToNow(new Date(task.createdAt), {addSuffix: true}) }</p>
            {task.duedate ? (
            <p><strong>Due Date: </strong>{format(new Date(task.duedate), 'dd/MM/yyyy')}</p>
            ) : (
            <p><strong>No due date</strong></p>
            )}
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default TaskDetails;