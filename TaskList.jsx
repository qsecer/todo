import React , {Component} from "react";
import Task from "../Task/Task.jsx";
import "./TaskList.css";

export default class TaskList extends Component {
    render() {
        const { tasks, onDeleted, onCompleted, onEdit, isEditing, toggleEditing, updateTaskLabel  } = this.props;

        return (
            <ul className="todo-list">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        label={task.label}
                        completed={task.completed}
                        onDeleted={onDeleted}
                        onCompleted={onCompleted}
                        onEdit={onEdit}
                        createdAt={task.createdAt}
                        isEditing={isEditing[task.id] || false}
                        toggleEditing={toggleEditing}
                        updateTaskLabel={updateTaskLabel}
                    />
                ))}
            </ul>
        );
    }
}