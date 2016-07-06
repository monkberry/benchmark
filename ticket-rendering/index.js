import Monkberry from 'monkberry';
import Template from './template.monk';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from './template.jsx';

import Vue from 'vue';
import VueComponent from './template.vue';

import templateString from './templateString';
import data from './data';

export function getSuite1(suite) {
  let root = document.createElement('div');

  return suite
    .add('Monkberry', () => {
      let view = Monkberry.render(Template, root);
      view.update(data());
    })
    .add('React', () => {
      let reactComponent = ReactDOM.render(React.createElement(ReactComponent), root);
      reactComponent.setState(data());
    })
    .add('Vue', () => {
      let vueComponent = new Vue(VueComponent).$mount(root);
      vueComponent.$data = data();
    })
    .add('Template string', () => {
      root.innerHTML = templateString(data());
    });
}

export function getSuite2(suite) {
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
