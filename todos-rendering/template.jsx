var React = require('react');

module.exports = React.createClass({
  render: function () {
    if (this.state) {
      return (
        <ol>
          {this.state.todos.map((todo, i) =>
            <li key={i}>
              {todo.complete ?
                <s>{todo.title}</s>
              :
                <b>{todo.title}</b>
              }
            </li>
          )}
        </ol>
      );
    } else {
      return null;
    }
  }
});
