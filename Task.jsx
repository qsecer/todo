import React, {Component} from "react";
import "./Task.css"
import { formatDistanceToNow } from 'date-fns'


export default class Task extends Component {
    state  = {
        newLabel: this.props.label,
    }

    handleInputChange = (e) => {
        this.setState({ newLabel: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateTaskLabel(this.props.id, this.state.newLabel);
    };

    render() {
        const { label, completed, onDeleted, toggleEditing, id, isEditing } = this.props;

        return (
            <li className={completed ? "completed" : ""}>
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={completed}
                           onChange={() => this.props.onCompleted(id)}
                    />

                    {isEditing ? (
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="edit"
                                value={this.state.newLabel}
                                onChange={this.handleInputChange}
                                autoFocus
                            />
                        </form>
                    ) : (
                        <label>
                            <span className="description">{label}</span>
                            <span className="created">
                                {formatDistanceToNow(this.props.createdAt, { addSuffix: true })}
                            </span>
                        </label>
                    )}

                    <button className="icon icon-edit" onClick={() => toggleEditing(id)} />
                    <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
                </div>
            </li>
        );
    }
}