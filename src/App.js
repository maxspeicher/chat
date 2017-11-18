import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import logo from './logo.svg';
import './App.css';

const generateAvatar = function() {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // min = 5, max = 15
  const length = Math.floor(Math.random() * ((15-5)+1) + 5);

  let id = '';

  for (let i=0; i<length; ++i) {
    const r = Math.floor(Math.random() * 26);
    id += abc[r];
  }
 
  return `https://api.adorable.io/avatars/200/${id}@adorable.io.png`;
};

const handleEnd = function({ steps, values }) {
  if (values[values.length-1] === 1) {
    window.location.href = 'http://www.maxspeicher.com/';
  }
};

const steps = [
  {
    id: '1',
    message: "Hi there! I'm a chat bot pretending to be Max. *beep boop* I'm a designer & computer scientist?",
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: "Where's the real Max?", trigger: '3' },
      { value: 2, label: 'Designer *and* computer scientist?', trigger: '5' }
    ]
  },
  {
    id: '3',
    message: "He's in Ann Arbor, MI, right now. Wanna get in touch?",
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 1, label: 'Sure, why not?!', trigger: '4a' },
      { value: 2, label: "No, I'm good.", trigger: '4a' }
    ]
  },
  {
    id: '4a',
    message: ({ previousValue, steps }) => {
      if (previousValue === 1) {
        return "Awesome! Feel free to drop me a line at mspeiche@umich.edu.";
      } else {
        return "Alright, maybe some other time."
      }
    },
    trigger: '4b',
  },
  {
    id: '4b',
    options: [
      { value: 1, label: "So... designer *and* computer scientist?", trigger: '5' }
    ]
  },
  {
    id: '5',
    message: `Indeed! I've studied computer science, but during my Master's started to specialize in human-computer interaction.
      Right now, I'm a post-doc at the University of Michigan doing research on designing and prototyping next-generation user interfaces.`,
    trigger: '6',
  },
  {
    id: '6',
    options: [
      { value: 1, label: 'What did you do before that?', trigger: 'final1' },
      { value: 2, label: 'Blah?', trigger: 'final1' }
    ]
  },
  {
    id: 'final1',
    message: 'Shall I take you to my main website?',
    trigger: 'final2',
  },
  {
    id: 'final2',
    options: [
      { value: 1, label: 'Sure!', trigger: 'final3' },
      { value: 2, label: 'Nah!', trigger: 'final4' }
    ]
  },
  {
    id: 'final3',
    message: '*beep beep boop*',
    end: true,
  },
  {
    id: 'final4',
    message: 'Fair enough. It was really nice talking to you! Have a great day!',
    trigger: 'final5',
  },
  {
    id: 'final5',
    options: [
      { value: 1, label: 'Start over', trigger: '1' }
    ]
  }
];

// preload user avatar
const userAvatar = generateAvatar();
const bufferImg = new Image();
bufferImg.src = userAvatar;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <ChatBot
            botAvatar={'avatar.jpg'}
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
            handleEnd={handleEnd}
            hideHeader={true}
            style={
              {
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                display: 'inline-block',
                fontFamily: 'Montserrat',
                margin: '1em 0 1em 0'
              }
            }
            userAvatar={userAvatar}
            userDelay={1000}
            width={'600px'}

            // the actual bot logic
            steps={steps}
          />
        </div>
      </div>
    );
  }
}

export default App;
