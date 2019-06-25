import React, { Component } from "react";
import TaskFrom from "./components/TaskFrom";
import TaskFrom2 from "./components/TaskFrom2";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      tasks: [],
      status: false,
      taskEdit: null,
      filter: {
        name: "",
        status: -1
      }
    };
  }
  ChangeDisplay = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
      taskEdit: null
    });
  };
  HidenFrom = () => {
    this.setState({
      isDisplayForm: false
    });
  };
  //luu data tu taskfrom truyen qua
  DataTaskFrom = data => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.AutoId();

      tasks.push(data);
    } else {
      //edit
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks
      // //xoa de hien ra ADD JOBS
      // taskEdit: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  /* Random ID */
  rd4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  AutoId = () => {
    return this.rd4() + this.rd4() + "_" + this.rd4() + this.rd4();
  }; //********* */
  /**/
  // CreateData = () => {
  //   var tasks = [
  //     {
  //       id: this.AutoId(),
  //       name: "Hoc lap trinh",
  //       status: true
  //     },
  //     {
  //       id: this.AutoId(),
  //       name: "Hoc lap reactjs",
  //       status: true
  //     },
  //     {
  //       id: this.AutoId(),
  //       name: "Hoc lap blockchain",
  //       status: false
  //     }
  //   ];

  //   //luu data bang local
  //   this.setState({
  //     tasks: tasks
  //   });
  //   // luu vao local & chuyen ve String
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }

  /******************** */
  //chinh sua trang thai
  OnUpdateStatus = id => {
    console.log(id);
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
    }
    console.log(index);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  //duyet phan tu
  findIndex = id => {
    var { tasks } = this.state;
    //duy tung phan tu
    // - 1 nghia la khong tim thay
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return (result = index);
      }
    });
    return result;
  };
  /*********************************** */
  Delected = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      //xoa splice truyen vao index va chon 1 de xoa 1 phan tu
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
    }
    console.log(index);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.HidenFrom();
  };
  /*********************** */
  Update = id => {
    var { tasks } = this.state;
    //tim id
    var index = this.findIndex(id);
    console.log(index);
    var taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    });
    console.log(this.state.taskEdit);
    //show form add
    // this.ChangeDisplay();
  };

  onFilter = (filtername, filterstatus) => {
    console.log(filtername, filterstatus);
    filterstatus = parseInt(filterstatus);
    console.log(typeof filterstatus);
    this.setState({
      filter: {
        name: filtername.toLowerCase(),
        status: filterstatus
      }
    });
  };
  render() {
    var { isDisplayForm, tasks, taskEdit, filter } = this.state;
    console.log(filter);
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return tasks;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    var elmTaskForm = isDisplayForm ? (
      <TaskFrom
        task={taskEdit}
        DataTaskFrom={this.DataTaskFrom}
        HidenFrom={this.HidenFrom}
      />
    ) : (
      ""
    );
    return (
      <div className={isDisplayForm ? "main" : "main2"}>
        <div className="">{elmTaskForm}</div>
        <div className="">
          <div>
            <div className="ui action input">
              <input type="text" placeholder="Search..." />
              <button className="ui button">Search</button>
            </div>
            <div className="buttonAdd">
              <button
                onClick={this.ChangeDisplay}
                className="ui primary button"
              >
                Add jobs
              </button>
              {/* <button className="ui pink button" onClick={this.CreateData}>
                Create data
              </button> */}
              <button className="ui blue button">Sort</button>
            </div>
          </div>
          <TaskFrom2
            onFilter={this.onFilter}
            tasks={tasks}
            OnUpdateStatus={this.OnUpdateStatus}
            Delected={this.Delected}
            Update={this.Update}
          />
        </div>
      </div>
    );
  }
}

export default App;
