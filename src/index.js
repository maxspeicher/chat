import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/* ensure page is always scrolled to bottom */

let oldHeight;

window.setInterval(function() {
  const content = document.querySelector('.rsc-content');

  if (!content) {
    return;
  }

  const contentHeight = content.clientHeight;

  if (oldHeight && oldHeight !== contentHeight) {
    window.scrollTo(0, document.body.scrollHeight);
  }

  oldHeight = contentHeight;
}, 100);
