import { Component } from "react";
import {
    addTask,
} from "./services/taskServices";

class Tasks extends Component {

    state = {
        currentTask: '',
        idEdit: '',
        editDesc: '',
        refresh: false,
    };

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    }

    handleAddTask = async (e) => {
        e.preventDefault();
        // const originalTasks = this.state.tasks;

        try {
            await addTask({ task_name: this.state.currentTask });

            this.setState({
                // tasks,
                currentTask: "",
                refresh: !this.state.refresh,
            });

        } catch (error) {
            console.log(error);
        }
    };

    
    refreshList = async () => {
        this.setState({ 
            refresh: !this.state.refresh,
        }, () => {
            console.log('REFRESH VAL:', this.state.refresh)
        });
    }

}

export default Tasks;
