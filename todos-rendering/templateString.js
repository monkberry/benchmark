export default function (data) {
  return `
  <ol>
    ${data.todos.map(todo => `
      <li>
        ${todo.complete ? `
          <s>${todo.title}</s>
        ` : `
          <b>${todo.title}</b>
        `}
      </li>
    `).join(``)}
  </ol>
  `;
}
