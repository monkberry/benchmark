var Inferno = require('inferno');

var ChildrenTypes = Inferno.ChildrenTypes;

module.exports = function(props) {
	if (props) {
		var todos = props.todos;
		return (
			<ol childrenType={ ChildrenTypes.NON_KEYED }>
				{todos.map((todo, i) =>
					<li childrenType={ ChildrenTypes.NODE }>
						{todo.complete ?
						<s childrenType={ ChildrenTypes.TEXT }>{todo.title}</s>
						:
						<b childrenType={ ChildrenTypes.TEXT }>{todo.title}</b>
						}
					</li>
				)}
			</ol>
		);
	} else {
		return null;
	}
}

