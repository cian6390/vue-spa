<script lang="ts">
import Home from '@/views/pages/Home.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: { Home } })
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <home />
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
