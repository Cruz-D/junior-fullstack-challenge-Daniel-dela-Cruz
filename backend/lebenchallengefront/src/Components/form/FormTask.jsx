import './formStyle.css';
import { useState } from "react";
import { createTask } from '../../services/api';

const FormTask = ({ fetchTasks }) => { // Recibe fetchTasks como prop

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handlesubmit = async (e) => {
        e.preventDefault();

        // data interface
        const tasks = {
            name: name,
            description: description,
            dueDate: dueDate,
        };

        try {
            // send the data to the API
            const response = await createTask(tasks);
            console.log(response.data);
            // clear the fields
            setName('');
            setDescription('');
            setDueDate('');
            alert("Task created successfully!");
            // update the list
            fetchTasks(); 
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <form onSubmit={handlesubmit} className="form-container">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
    );
};

export default FormTask;