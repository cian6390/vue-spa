<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  msg: string = 'Hello Vuejs'
}
</script>

<template>
  <div>
    <h4 v-text="msg" />
    <img width="150px" height="auto" src="/images/vue.png" />
  </div>
</template>

<style lang="scss" scoped>
h4 {
  color: $primary;
  &:hover {
    color: $success;
  }
}
</style>
