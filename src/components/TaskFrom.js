import React, { Component } from "react";

class TaskFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: false,
      id:'',
      isDisplayForm: false
    };
  }
  
  onChange=(event)=>{
    var name = event.target.name;
    var value = event.target.value;
    //check status is boolen
    if(name === 'status'){
      value = event.target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    });
  }
  // truyen ra app.js this.state
  onSubmit=(event)=>{
    event.preventDefault();
    //truyen ra app.js
    this.props.DataTaskFrom(this.state);
    this.OnClear();
    this.HidenFrom();
  }
  // Hiden = () => {
  //   this.props.HidenFrom();
  // };
  HidenFrom = () => {
    this.props.HidenFrom();
  };
  OnClear=()=>{
    this.setState({
      name:'',
      state: false
    });
  }
  //revise
  componentWillMount(){
    if(this.props.task){
      //app.js truyen qua task chu khong phai function
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
      console.log(this.state);
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }
  }
  render() {
    var {id} = this.state;
    return (
      <div className="taskfrom">
        <div className="ui segment">
        {/* them se khong co id
        sua se cco id. nen dung id de xu li 
        */}
          {id === '' ? 'ADD JOB' : 'REVISE JOB'}
          <button onClick={this.HidenFrom} className="ui red button">
            Hide
          </button>
        </div>
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className="field">
            <label>Status</label>
            <select
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Hiden</option>
            </select>
          </div>

          <button type="submit" className="ui primary button">
            Save
          </button>
          {/* <button onClick={this.OnClear} type="submit" className="ui secondary button">
            Remove
          </button> */}
        </form>
      </div>
    );
  }
}

export default TaskFrom;
