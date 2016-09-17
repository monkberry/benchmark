import Monkberry from 'monkberry';
import Template from './template.monk';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from './template.jsx';

import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import renderInferno from './template.inferno.js';

import Vue from 'vue';
import VueComponent from './template.vue';

import templateString from './templateString';
import data from './data';

export function getSuite1(suite) {
  return suite
    .add('Monkberry', () => {
      const root = document.createElement('div');
      const view = Monkberry.render(Template, root);
      view.update(data());
    })
    .add('React', {
      defer: true,
      fn: deferred => {
        const root = document.createElement('div');
        ReactDOM.render(React.createElement(ReactComponent), root, () => {
          deferred.resolve();
        });
      }
    })
    .add('Vue', () => {
      const root = document.createElement('div');
      new Vue(VueComponent).$mount(root);
    })
    .add('Inferno', () => {
      const root = document.createElement('div');
      InfernoDOM.render(renderInferno(data()), root);
    })
    .add('Template string', () => {
      const root = document.createElement('div');
      root.innerHTML = templateString(data());
    });
}

export function getSuite2(suite) {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');
  let root4 = document.createElement('div');
  let root5 = document.createElement('div');
  let view = Monkberry.render(Template, root1);
  let reactComponent = ReactDOM.render(React.createElement(ReactComponent), root2);
  let vueComponent = new Vue(VueComponent).$mount(root3);
  root4.innerHTML = templateString(data());
  InfernoDOM.render(renderInferno(data()), root5);

  return suite
    .add('Monkberry', () => {
      view.update(data());
    })
    .add('React', {
      defer: true,
      fn: deferred => {
        reactComponent.setState(data(), () => {
          deferred.resolve();
        });
      }
    })
    .add('Vue', {
      defer: true,
      fn: deferred => {
        vueComponent.data = data();
        Vue.nextTick(() => {
           deferred.resolve();
        });
      }
    })
    .add('Inferno', () => {
      InfernoDOM.render(renderInferno(data()), root5);
    })
    .add('Template string', () => {
      root4.innerHTML = templateString(data());
    });
}
