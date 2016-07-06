<template>
  <ol v-for="todo in todos">
    <li v-if="todo.complete">
      <s>{{ todo.title }}</s>
    </li>
    <li v-else>
      <b>{{ todo.title }}</b>
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      todos: []
    }
  }
}
</script>
