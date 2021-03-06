import React from 'react';

class Matches extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      matches: []
    }
  }

  header(){
    return (
      <div className="row Robo-Font grid-header">
        <h4 className="col-5">
          DATE
        </h4>
        <h4 className="col-6">
          WINNER
        </h4>
        <h4 className="col-1">
        </h4>
      </div>)
  }

  callApi(){
    fetch("https://intense-atoll-95121.herokuapp.com/matches")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({matches: responseJson});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  componentWillMount(){
    this.callApi();

    this.interval = setInterval(() => {
      this.callApi();
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    const content =
      this.state.matches.map((match) =>
        <div className="row Robo-Font grid-body" key={match.id + "-match"}>
          <div className="col-5 grid-element">
            {match.created_at}
          </div>
          <div className="col-6 grid-element">
            {match.winner}
          </div>
          <div className="col-1 grid-element">

          </div>
        </div>
      )

    return (
      <div className="matches-container">
        <div className="matches-header">
          {this.header()}
        </div>
        <div className="matches-body">
          {content}
        </div>
        <div className="grid-footer">
        </div>
      </div>
    )
  }

}

export default Matches;
