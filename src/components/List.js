import React, { Component } from "react";

class List extends Component {
  OnUpdateStatus = () => {
    //su dung id de thay doi 1 doi tuong
    console.log(this.props.task.id);
    //truyen nguoc ra taskfrom2
    this.props.OnUpdateStatus(this.props.task.id);
  };
  //truyen nguoc ra taskfrom2
  Delected = () => {
    this.props.Delected(this.props.task.id);
  };
  //truyen nguoc ra taskfrom2
  Update = () => {
    this.props.Update(this.props.task.id);
  };
  render() {
    var { task, index } = this.props;
    //console.log(task);
    return (
      <tr className="">
        <td className="">{index}</td>
        <td className="">{task.name}</td>
        <td className="">
          <a
            onClick={this.OnUpdateStatus}
            className={
              task.status === true
                ? "ui yellow image label"
                : "ui gray image label"
            }
          >
            {task.status === true ? "Active" : "Hiden"}
          </a>
        </td>
        <td className="">
          <div className="edit">
            <button onClick={this.Update} className="ui yellow button">
              Revise
            </button>
            <button onClick={this.Delected} className="ui black button">
              Delected
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default List;
