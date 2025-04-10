import React, { Component } from "react";
import NewTaskForm from "./NewTaskForm/NewTaskForm.jsx";
import Footer from "./Footer/Footer.jsx";
import TaskList from "./TaskList/TaskList.jsx";
import './BodySttyle.css';

export default class App extends Component {
    maxId = 0;

    createTask = (label) => {
        return {
            label: label,
            completed: false,
            id: ++this.maxId,
            createdAt: new Date()
        }
    }

    state = {
        tasks: [],
        filter: 'all',
        isEditing: {}
    };

    onCompleted = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        }));
    };

    counterOfCompleted = () => {
        return this.state.tasks.filter((task) => !task.completed).length;
    };

    deleteTask = (id) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter(task => task.id !== id)
        }));
    };

    addTask = (task) => {
        this.setState(({ tasks }) => ({
            tasks: [...tasks, this.createTask(task)]
        }));
    };

    clearCompleted = () => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter(task => !task.completed),
        }));
    };

    setFilter = (filter) => {
        this.setState({ filter });
    };

    getFilteredItems = () => {
        const { tasks, filter } = this.state;
        switch (filter) {
            case 'all':
                return tasks;
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };

    updateTaskLabel = (id, newLabel) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) =>
                task.id === id ? { ...task, label: newLabel } : task
            ),
            isEditing: { ...prevState.isEditing, [id]: false },
        }));
    };

    toggleEditing = (id) => {
        this.setState((prevState) => ({
            isEditing: {
                ...prevState.isEditing,
                [id]: !prevState.isEditing[id],
            },
        }));
    };


    render() {
        const activeTasks = this.counterOfCompleted();
        const filteredTodos = this.getFilteredItems();
        return (

            <div className="todoapp">
                <NewTaskForm
                    onAdd={this.addTask}
                />
                <TaskList
                    tasks={filteredTodos}
                    onDeleted={this.deleteTask}
                    onCompleted={this.onCompleted}
                    onEdit={this.onEdit}
                    updateTaskLabel={this.updateTaskLabel}
                    toggleEditing={this.toggleEditing}
                    isEditing={this.state.isEditing}

                />
                <Footer
                    counterOfCompleted={activeTasks}
                    clearCompleted={this.clearCompleted}
                    setFilter={this.setFilter}
                    currentFilter={this.state.filter}
                />
            </div>
        );
    }
}
