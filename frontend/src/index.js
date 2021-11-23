import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const card = (
  <div id = "cardBase" class = "wireframe border rounded shadow">
    <img class = "wireframe rounded" id = "cardImage" src ="https://www.hurawalhi.com/wp-content/uploads/2019/04/5.8-1.jpg"></img>
    <div class = "wireframe" id = "cardInfo">
      <div class = "wireframe cardInternal" id = "cardName">Luigi's Underwater Experience</div>
      <div class = "wireframe cardInternal" id = "cardStars">3.8 Stars</div>
      <p class = "wireframe cardInternal" id = "cardCategories">Italian &nbsp;&nbsp;Gelato &nbsp;&nbsp;Cocktail Bar</p>
    </div>
    <div class = "wireframe" id = "cardMenu">&nbsp;&#10247;</div>
  </div>
);

ReactDOM.render(
  card,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
