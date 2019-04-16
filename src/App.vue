<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  msg: string = 'Hello Vuejs';
}
</script>

<template>
  <h4 v-text="msg" />
</template>

<style lang="scss" scoped>
h4 {
  color: $primary;
  &:hover {
    color: $success;
  }
}
</style>
