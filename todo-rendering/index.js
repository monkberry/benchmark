import Monkberry from 'monkberry';
import Template from './template.monk';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './template.jsx';
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
      ReactDOM.render(React.createElement(Component, {data: data()}), root);
    })
    .add('Template string', () => {
      root.innerHTML = templateString(data());
    });
}

export function getSuite2(suite) {
  let root1 = document.createElement('div');
  let root2 = document.createElement('div');
  let root3 = document.createElement('div');
  let view = Monkberry.render(Template, root1);
  let component = ReactDOM.render(React.createElement(Component, {data: data()}), root2);

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
