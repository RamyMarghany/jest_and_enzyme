import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const test = () => <div>test</div>
class App extends Component {
  state={
    on : false,
    mainColor: 'blue',
    lifeCycle:''
  }
  componentDidMount(){
    this.setState({lifeCycle:'componentDidMount'})
  }
  componentWillReceiveProps(){
    this.setState({lifeCycle:'componentWillReceiveProps'})
  }

  handleStrings(str){
    if(str === 'Hello World') return true
    return false
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ul className="list">
            <li>Link1</li>
            <li>Link2</li>
            <li>Link3</li>
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>hello world</p>
          <p className="button-state">{this.state.on ? 'Yes!' : 'No!'}</p>
          <button onClick={()=> this.setState({on:true})}>Click</button>
          <h3 className={this.state.mainColor}>welcome Everyone!</h3>
          <test/>
        </header>
      </div>
    );
  }
}

export class Link extends Component{
  render(){
    return(
      this.props.hide ? null :<a href={this.props.address}>Click</a>
    )
  }
}

export default App;
