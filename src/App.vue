<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    msg: string = 'Hello Vuejs';
}
</script>

<template>
    <h4 v-text="msg" />
</template>

<style scoped>
h4 {
    color: blue;
}
</style>
