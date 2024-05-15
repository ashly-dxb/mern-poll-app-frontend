import { Component } from "react";
import { addTask } from "./services/taskServices";

class Tasks extends Component {
  state = {
    currentTask: "",
    idEdit: "",
    editDesc: "",
    refresh: false,
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  };

  handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await addTask({ task_name: this.state.currentTask });

      this.setState({
        currentTask: "",
        refresh: !this.state.refresh,
      });
    } catch (error) {
      console.log(error);
    }
  };

  refreshList = async () => {
    this.setState(
      {
        refresh: !this.state.refresh,
      },
      () => {
        console.log("Refresh:", this.state.refresh);
      }
    );
  };
}

export default Tasks;
