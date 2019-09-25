import React from 'react';
import navio from 'navio';

class Navio extends React.Component {
  componentDidMount(){
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if(this.props.loadedData){

      const nv = navio(this.myDiv, 600);

      nv.data(this.props.data);

      nv.addAllAttribs();
    }
  }

  render(){
    return(
      <div ref={myDiv => this.myDiv = myDiv}>

      </div>
      );
  }
}

export default Navio;