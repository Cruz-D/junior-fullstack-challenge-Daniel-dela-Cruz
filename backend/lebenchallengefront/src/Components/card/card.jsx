import React from "react";
import "./cardStyle.css";
import { format } from "date-fns";
import { deleteTask, updateTask } from "../../services/api";

function Card({ task, fetchTasks }) {
  // method to complete the task
  const handleUpdate = async () => {
    // data interface with the task id and the boolean value to update the task
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      // update the task with the id and the updated task
      await updateTask(task.id, updatedTask);
      alert("Task updated successfully!");
      // fetch the tasks again to update the list
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // method to delete the task
  const handleDelete = async () => {
    try {
      // confirm the deletion of the task
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmDelete) {
        // delete the task with the id
        await deleteTask(task.id);
        alert("Task deleted successfully!");
      } else {
        return;
      }
      // fetch the tasks again to update the list
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  return (
    <div className={`card ${task.isCompleted ? "completed" : "pending"}`}>
      <div className="card-title">
        <h2>{task.name}</h2>
      </div>
      <div className="card-body">
        <p>
          <i className="bi bi-card-text"> </i> <b>Description: </b>
          {task.description}
        </p>
        <hr />
        <p>
          <i className="bi bi-calendar-event"> </i> <b>Due Date: </b>
          {formatDate(task.dueDate)}
        </p>
        <hr />
        <p>
          <i
            className={`bi ${
              task.isCompleted
                ? "bi-check-circle-fill text-success"
                : "bi-x-circle-fill text-danger"
            }`}
          >
            {" "}
          </i>
          <b>Status: </b>
          {task.isCompleted ? "Completed" : "Pending"}
        </p>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={handleUpdate}
          disabled={task.isCompleted} 
        >
          {task.isCompleted ? "Completed" : "Mark as Completed"}
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
