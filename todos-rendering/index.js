import Monkberry from 'monkberry';
import Template from './template.monk';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from './template.jsx';

import Vue from 'vue';
import VueComponent from './template.vue'

import templateString from './templateString';

export function getSuite1(suite) {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');
  let root4 = document.createElement('div');

  let view = Monkberry.render(Template, root1);
  let reactComponent = ReactDOM.render(React.createElement(ReactComponent), root2);
  let vueComponent = new Vue(VueComponent).$mount(root3);
  root4.innerHTML = templateString(data());

  return suite
    .add('Monkberry', () => {
      view.update(data());
    })
    .add('React', () => {
      reactComponent.setState(data());
    })
    .add('Vue', () => {
      vueComponent.$data = data();
    })
    .add('Template string', () => {
      root4.innerHTML = templateString(data());
    });
}

export function test() {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');
  let root4 = document.createElement('div');

  document.body.appendChild(root1);
  document.body.appendChild(root2);
  document.body.appendChild(root3);
  document.body.appendChild(root4);

  let view = Monkberry.render(Template, root1);
  let reactComponent = ReactDOM.render(React.createElement(ReactComponent), root2);
  let vueComponent = new Vue(VueComponent).$mount(root3);

  setInterval(() => {
    view.update(data());
    reactComponent.setState(data());
    vueComponent.$data = data();
    root4.innerHTML = templateString(data());
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
