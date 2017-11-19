import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import ReactPlayer from 'react-player';
// import logo from './logo.svg';
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

// object holding flags for use in dialog
let flags = {};

// define the dialog as an FSM with exactly one edge between any pair of nodes
const prompts = { // what the bot says
  "0": {
    content: () => {
      flags = {};
      return "Hi there! I'm a chat bot pretending to be Max. *beep boop* I'm a designer & computer scientist.";
    },
    edges: {
      "1": "0",
      "4": "1"
    }
  },
  "1": {
    content: () => {
      flags.getInTouch = true;
      return "He's in Ann Arbor, MI, right now. Wanna get in touch?";
    },
    edges: {
      "2": "2",
      "3": "3"
    }
  },
  "2": {
    content: "Awesome! Feel free to drop me a line at mspeiche@umich.edu anytime.",
    edges: {
      "4": "4"
    }
  },
  "3": {
    content: "Alright, maybe some other time.",
    edges: {
      "4": "4"
    }
  },
  "4": {
    content: `Indeed! I've studied computer science, but during my Master's started to specialize in human-computer interaction.
      Right now, I'm a post-doc at the University of Michigan doing research on designing and prototyping next-generation user interfaces.`,
    edges: {
      "5": "5",
      "6": "6"
    }
  },
  "5": {
    content: "Before that I did data analytics, UX, and some other stuff for HoloBuilder.com, a start-up that's now headquartered in San Francisco.",
    edges: {
      "8": "7",
      "10": "9"
    }
  },
  "6": {
    content: () => {
      flags.hasSeenVideo = true;
      return "Right now, we're doing some really exciting things with augmented reality. I can even show you a video!";
    },
    prompt: "7"
  },
  "7": {
    component: (<ReactPlayer url='https://vimeo.com/228921453' />),
    edges: {
      "5": "5"
    }
  },
  "8": {
    content: "I did an industrial Ph.D. at Unister GmbH in Leipzig, in cooperation with Chemnitz University of Technology.",
    edges: {
      "9": "8",
      "10": "9"
    }
  },
  "9": {
    content: `Because Unister R&D was creating a new semantic search engine at that time, I developed an approach to automatically determine and 
      optimize the usability of search engines based on user interactions, like mouse movements. The title of my thesis was "Search Interaction
      Optimization: A Human-Centered Design Approach".`,
    edges: {
      "10": "9"
    },
  },
  "10": {
    content: "I love to play ringtennis. But I suppose it's safe to assume you haven't heard of that?!",
    edges: {
      "11": "10"
    },
  },
  "11": {
    content: () => {
      if (flags.hasSeenVideo) {
        return "Time for another video ...";
      }

      return "Don't worry! I've got you covered!"
    },
    prompt: "12"
  },
  "12": {
    component: (<ReactPlayer url='https://www.youtube.com/watch?v=WyiUg7W1-N0' />),
    edges: {
      "13": "11"
    }
  },
  "13": {
    content: "That's cool! Anything else you'd like to ask?",
    edges: {
      "14": "12",
      "15": "13"
    },
  },
  "14": {
    content: "Uhm... without alcohol, I'd say matcha. With alcohol... probably Gin & Tonic.",
    prompt: "final"
  },
  "15": {
    content: "Definitely 4 cheese!",
    prompt: "final"
  },
  "final": {
    content: () => {
      if (flags.getInTouch) {
        return "I'm afraid I'm out of dialog here. So... Shall I take you to my regular, boring website?";
      } else {
        return `I'm afraid I'm out of dialog here. So... If you wanna get in touch, feel free to drop me a line at mspeiche@umich.edu.
          I can also take you to my regular, boring website if you like?`;
      }
    },
    edges: {
      "final2": "final",
      "final3": "final2"
    }
  },
  "final2": {
    content: "*beep beep boop*"
  },
  "final3": {
    content: "Fair enough. It was really nice talking to you! Have a great day!",
    edges: {
      "0": "final3"
    }
  }
};

const input = { // what the user chooses from
  "0": "Where's the real Max?",
  "1": "Designer *and* computer scientist?",
  "2": "Sure, why not?!",
  "3": "No, thanks, I'm good.",
  "4": "So... designer *and* computer scientist?",
  "5": "What did you do before that?",
  "6": "Sounds exciting! Tell me more!",
  "7": "And before that?",
  "8": "Sounds cool! What was your thesis about?",
  "9": "Any hobbies besides being a nerd?",
  "10": "Uhm...",
  "11": "Looks awesome! I should definitely check that out.",
  "12": "What's your favorite drink?",
  "13": "What's your favorite pizza?",
  "final": "Sure!",
  "final2": "Nah!",
  "final3": "Start over"
};

const steps = [];
let triggerCounter = 1;

// generate the steps for the chat bot
for (let i in prompts) {
  const content = prompts[i].content;
  const component = prompts[i].component;
  const edges = prompts[i].edges;
  const nextPrompt = prompts[i].prompt;

  const prompt = {
    id: "p" + i
  };

  if (content) {
    prompt.message = content;
  } else {
    prompt.component = component;
  }

  if (!edges) {
    if (!nextPrompt) {
      prompt.end = true;
    } else {
      prompt.trigger = "p" + nextPrompt;
    }

    steps.push(prompt);

    continue;
  }

  prompt.trigger = triggerCounter + "";

  steps.push(prompt);

  const connection = {
    id: (triggerCounter++) + "",
    options: []
  };

  let valueCounter = 1; 

  for (let j in edges) {
    connection.options.push({
      value: valueCounter++,
      label: input[edges[j]],
      trigger: "p" + j
    });
  }

  steps.push(connection);
}

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
            width={'750px'}

            // the actual bot logic
            steps={steps}
          />
        </div>
      </div>
    );
  }
}

export default App;



/********** the old stuff **********

const steps = [
  {
    id: '1',
    message: "Hi there! I'm a chat bot pretending to be Max. *beep boop* I'm a designer & computer scientist.",
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: "Where's the real Max?", trigger: '3' },
      { value: 2, label: "Designer *and* computer scientist?", trigger: '5' }
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
      { value: 1, label: "Sure, why not?!", trigger: '4a' },
      { value: 2, label: "No, thanks, I'm good.", trigger: '4a' }
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
      { value: 1, label: "What did you do before that?", trigger: 'final1' },
      { value: 2, label: "Blah?", trigger: 'final1' }
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

************************************/