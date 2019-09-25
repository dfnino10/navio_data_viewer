  import React, {Component} from 'react';

  class Tweet extends Component {
    constructor (props){
      super(props);
      console.log("Props", this.tweet);
      this.state = {
        votes: 0
      }
    }

    onClick () {
      this.setState({votes: this.state.votes+1})
    }

    render(){
      //console.log("Tweet", this.props.tweet)
      return (
        <div>
        {this.props.tweet.text}
        <label htmlFor="">
        <button
        className="btn btn-primary"
        onClick={this.onClick.bind(this)}
        >
        Vote
        </button>
        <span>votes: <span id="spVoteValue">{this.state.votes}</span></span>
        </label>
        </div>
        )
    }
  }

  export default Tweet;