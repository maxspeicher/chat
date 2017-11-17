import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Friendly Chatbot</h1>
        </header>
        <div className="App-intro">
          <ChatBot
            botDelay={1000}
            contentStyle={
              {
                height: 'auto',
                overflowY: 'auto'
              }
            }
            footerStyle={
              {
                display: 'none'
              }
            }
            hideHeader={true}
            steps={[
              {
                id: '1',
                message: 'Marco!',
                trigger: '2',
              },
              {
                id: '2',
                options: [
                  { label: 'Polo!', trigger: '1' }
                ]
              }
            ]}
            style={
              {
                display: 'inline-block',
                margin: '1em'
              }
            }
            userDelay={1000}
          />
        </div>
      </div>
    );
  }
}

export default App;
