var Inferno = require('inferno');

module.exports = function(props) {
	if (props) {
		var todos = props.todos;
		return (
			<ol>
				{todos.map((todo, i) =>
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

