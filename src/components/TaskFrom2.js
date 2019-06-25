import React, { Component } from "react";
import List from "./List.js";

class TaskFrom2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: "",
      filtername: "",
      filterstatus: -1
    };
  }
  onChange=(event)=>{
   var name = event.target.name;
   var value = event.target.value;
   this.props.onFilter(name === 'filtername'? value : this.state.filtername, name === 'filterstatus'? value : this.state.filterstatus);
   this.setState({
     [name]:value
   });
  }
  render() {
    var { tasks, isDisplayForm } = this.props;
    var { filtername, filterstatus } = this.state;
    var Element = tasks.map((task, index) => {
      return (
        <List
          //truyen nguoc ra app.js
          OnUpdateStatus={this.props.OnUpdateStatus}
          Delected={this.props.Delected}
          Update={this.props.Update}
          key={task.id}
          index={index}
          task={task}
        />
      );
    });
    return (
      <div className={isDisplayForm ? "taskfrom2" : "taskfrom2-2"}>
        <div className="tablets">
          <table className="ui celled table">
            <thead className="">
              <tr className="">
                <th className="">STT</th>
                <th className="">Name</th>
                <th className="">Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="">
                <td className="">
                  <div className="ui ribbon label">Null</div>
                </td>
                <td className="">
                  <div className="ui focus input">
                    <input
                      type="text"
                      placeholder="Name..."
                      name="filtername"
                      value={filtername}
                      onChange={this.onChange}
                    />
                  </div>
                </td>
                <td>
                  <div className="field">
                    <select
                      name="filterstatus"
                      value={filterstatus}
                      onChange={this.onChange}
                    >
                      <option value={-1}>All</option>
                      <option value={1}>Active</option>
                      <option value={0}>Hiden</option>
                    </select>
                  </div>
                </td>
                <td className="" />
              </tr>
              {Element}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskFrom2;
