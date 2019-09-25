import React from 'react';
import Navigo from './Navio.js'

import './App.css';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      database: '',
      data: [],
      loadedData: false,
      params:[],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getParams() {
    const pathname = window.location.pathname;
    const url = window.location.href;
    let params;
    if(pathname.length > 1){
      params = [pathname.split('/')[1]];
      if (url.includes('?')){
        params = params.concat(url.split('?')[1].split('&'));
      }
    }
    return params? params: 0;
  }

  componentDidMount(){
    let params = this.getParams()
    if(params){
      this.getDatabase(params);
    }
  }

  handleChange(event) {
    this.setState({database: event.target.value});
  }

  getDatabase(value) {
    if (!(typeof value === 'string' || value instanceof String)){
      value = ''+value[0]+'?'+value[1]+'&'+value[2];
    }
    console.log(value);
    fetch('/'+value)
      .then(res => res.json())
      .then((data) => {
        this.setState({data: data,loadedData: true});
      });
  }
//,()=> console.log("Data en setstate", data)
  handleSubmit(){
    this.getDatabase(this.state.database);
  }

  renderNavigo(){
    return(
    <Navigo
      loadedData={this.state.loadedData}
      data= {this.state.data}
      >
    </Navigo>);
  }

  render(){
    return (
      <div className="container" id="main">
        <div className="title" id="main-title">
          <h2 >Navigo Data Viewer</h2>
        </div>
        <div className="container" id="content">
          <div className="title">
            <h3 className="second-title">Choose a dataset</h3>
          </div>
          <form className="form-inline">
            <div className="form-group mb-2">
              <label type="text" id="Database label">Dataset name:</label>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="database-input"
                placeholder="Dataset"
                value={this.state.database}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mb-2"
              onClick={this.handleSubmit}
            >
              Show data
            </button>
          </form>
          <div className="navigo">
            <Navigo
              loadedData={this.state.loadedData}
              data={this.state.data }
              >
            </Navigo>
          </div>
        </div>
      </div>
    );
      };
  }

    export default App;