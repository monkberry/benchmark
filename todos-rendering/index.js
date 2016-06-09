import Monkberry from 'monkberry';
import Template from './template.monk';

import React from 'react';
import ReactDOM from 'react-dom';
import Component from './template.jsx';

import templateString from './templateString';

export function getSuite1(suite) {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');

  let view = Monkberry.render(Template, root1);
  let component = ReactDOM.render(React.createElement(Component), root2);
  root3.innerHTML = templateString(data());

  return suite
    .add('Monkberry', () => {
      view.update(data());
    })
    .add('React', () => {
      component.setState(data());
    })
    .add('Template string', () => {
      root3.innerHTML = templateString(data());
    });
}

export function test() {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');

  document.body.appendChild(root1);
  document.body.appendChild(root2);
  document.body.appendChild(root3);

  let view = Monkberry.render(Template, root1);
  let component = ReactDOM.render(React.createElement(Component), root2);
  root3.innerHTML = templateString(data());

  setInterval(() => {
    view.update(data());
    component.setState(data());
    root3.innerHTML = templateString(data());
  }, 500);
}

function data() {
  return {
    todos: [
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5},
      {title: Math.random(), complete: Math.random() > 0.5}
    ]
  };
}
