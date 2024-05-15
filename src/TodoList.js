import React, { Component } from "react";
import moment from "moment";

import {
  getTasks,
  updateTask,
  updateTaskDesc,
  deleteTask,
} from "./services/taskServices";

import { Card, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";

import "./App.css";

class TodoList extends Component {
  state = {
    tasks: [],
    idEdit: "",
    editDesc: "",
    refresh: false,
  };

  async componentDidMount() {
    // console.log("child prop REFRESH VAL: ", this.props.refresh);
    // console.log("child state REFRESH VAL: ", this.state.refresh);

    this.loadTasks();
  }

  loadTasks = async () => {
    try {
      const { data } = await getTasks();
      this.setState({ tasks: data });
    } catch (error) {
      console.log(error);
    }
  };

  static getDerivedStateFromProps(props, state) {
    // console.log("getDerivedStateFromProps: props, state::",  props.refresh,  state.refresh);

    if (props.refresh !== state.refresh) {
      return {
        refresh: props.refresh,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh !== this.state.refresh) {
      this.loadTasks();
    }
  }

  handleUpdate = async (currentTask) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = !tasks[index].completed;
      this.setState({ tasks });

      await updateTask(currentTask, {
        completed: tasks[index].completed,
      });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  handleUpdateDesc = async (currentTask) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);

      tasks[index] = { ...tasks[index] };
      tasks[index].task_name = this.state.editDesc;

      this.setState({
        tasks: tasks,
        editDesc: "",
        idEdit: "",
      });

      await updateTaskDesc(currentTask, {
        task_name: tasks[index].task_name,
      });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTask);
      this.setState({ tasks });

      await deleteTask(currentTask);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  showModifyForm = (currentTask, taskDetails) => {
    this.setState({
      idEdit: currentTask,
      editDesc: taskDetails.task_name,
    });
  };

  handleChangeName = (event) => {
    this.setState({ editDesc: event.target.value });
  };

  render() {
    return (
      <div className="task_root">
        {this.state.tasks.map((task, idx) => (
          <Card
            key={task._id}
            className="flex task_container"
            variant="outlined"
          >
            <div className={task.completed ? "task line_through" : "task"}>
              {this.state.idEdit === task._id ? (
                <div>
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ width: "70%", marginRight: "7px" }}
                    value={this.state.editDesc}
                    required={true}
                    onChange={this.handleChangeName}
                    // style={{display: (this.state.idEdit === task._id) ? 'block' : 'none'}}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => this.handleUpdateDesc(task._id)}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <div className="flex-parent-element">
                  <div className="flex-child-element">
                    <Checkbox
                      checked={task.completed}
                      onClick={() => this.handleUpdate(task._id)}
                      color="primary"
                    />
                    {task.task_name}
                  </div>

                  <div className="flex-child-element">
                    {moment(task.created_date).format("YYYY-MM-DD HH:mm")}
                  </div>

                  <div className="flex-child-element">
                    <Button
                      onClick={() => this.showModifyForm(task._id, task)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      className="mx-2 my-1"
                    >
                      Modify
                    </Button>

                    <Button
                      onClick={() => this.handleDelete(task._id)}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      className="mx-2 my-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default TodoList;
