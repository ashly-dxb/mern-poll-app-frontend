import React from "react";
// import { Component } from "react";

import Tasks from "./Tasks";
import TodoList from "./TodoList";

import { Paper, TextField } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import refreshImage from "./images/refresh.svg";

class TaskMain extends Tasks {
  state = {
    // tasks: [],
    currentTask: "",
    idEdit: "",
    editDesc: "",
    refresh: false,
  };

  render() {
    return (
      <div className="flex-container m-3" style={{ paddingTop: "60px" }}>
        <Paper elevation={10} className="container">
          <div className="heading">TO-DO List</div>

          <form
            onSubmit={this.handleAddTask}
            className="create_form"
            style={{ margin: "15px 10px" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "50%", marginRight: "7px" }}
              value={this.state.currentTask}
              required={true}
              onChange={this.handleChange}
              placeholder="New Item"
            />

            <Button
              type="submit"
              style={{ height: "40px" }}
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
    );
  }
}

export default TaskMain;
