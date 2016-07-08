<template>
  <ol>
    <li v-for="todo in todos">
      <s v-if="todo.complete">{{ todo.title }}</s>
      <b v-else>{{ todo.title }}</b>
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
