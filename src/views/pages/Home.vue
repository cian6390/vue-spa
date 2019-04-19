<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

let timer

function food(name: string, price: number) {
  return {
    name,
    price
  }
}

@Component
export default class Home extends Vue {
  foodOptions: { name: string; price: number }[] = [
    food('牛肉麵', 120),
    food('麥當勞', 140),
    food('家樂福 - 爭鮮', 300),
    food('家樂福 - 定食8', 200),
    food('家樂福 - 花月嵐', 160),
    food('八方雲集', 120),
    food('小初店', 80),
    food('飯殿', 80),
    food('烏龍麵', 160),
    food('自助餐', 80),
    food('豪小子', 200),
    food('水餃', 80),
    food('K 布朗', 160),
    food('咖哩', 160),
    food('路易莎', 120),
    food('樹太老', 300)
  ]
  active: string = ''

  get optionsLen() {
    return this.foodOptions.length - 1
  }

  start() {
    timer = setInterval(() => {
      this.active = this.foodOptions[
        this.randomBetween(0, this.optionsLen)
      ].name
    }, 250)
  }

  deal() {
    clearInterval(timer)
  }

  random() {
    this.active = this.foodOptions[this.randomBetween(0, this.optionsLen)].name
  }

  randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
</script>

<template>
  <div class="home-page">
    <header>中午吃什麼？</header>
    <main>
      <div>
        <span @click="deal">{{ active }}</span>
      </div>
    </main>
    <footer @click="random">隨機</footer>
  </div>
</template>

<style lang="scss">
.home-page {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f1f1f1;
  header {
    flex: none;
    width: 100%;
    font-size: 24px;
    padding: 12px 0;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: orange;
  }
  main {
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
  footer {
    flex: none;
    width: 100%;
    height: 60px;
    display: flex;
    color: #fff;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    background-color: #666;
  }
}
</style>
