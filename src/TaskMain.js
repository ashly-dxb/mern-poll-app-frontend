import React from "react";
import Tasks from "./Tasks";
import TodoList from "./TodoList";

import { Paper, TextField } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import refreshImage from "./images/refresh.svg";

class TaskMain extends Tasks {
  state = {
    currentTask: "",
    idEdit: "",
    editDesc: "",
    refresh: false,
  };

  render() {
    return (
      <div className="flex-container m-3">
        <div className="ui-container py-5 px-2">
          <Paper elevation={10} className="container">
            <div className="task_heading">TO-DO List</div>

            <form onSubmit={this.handleAddTask} className="task_create_form">
              <TextField
                variant="outlined"
                size="small"
                style={{ width: "50%", marginRight: "7px" }}
                value={this.state.currentTask}
                required={true}
                onChange={this.handleChange}
                placeholder="New Task"
              />

              <Button
                type="submit"
                style={{ height: "34px" }}
                color="primary"
                variant="contained"
                size="large"
              >
                Add Task
              </Button>

              <IconButton
                type="button"
                color="primary"
                variant="contained"
                size="small"
                onClick={this.refreshList}
                title="Refresh"
              >
                <img src={refreshImage} width="30" alt="refresh" />
              </IconButton>
            </form>

            <TodoList refresh={this.state.refresh} />
          </Paper>
        </div>
      </div>
    );
  }
}

export default TaskMain;
