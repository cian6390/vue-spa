<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

let timer;

function food(name: string, distance: 'close' | 'soso' | 'far') {
  return {
    name,
    distance
  };
}

@Component
export default class Home extends Vue {
  foodList: { name: string; distance: string }[] = [
    food('牛肉麵', 'close'),
    food('麥當勞', 'soso'),
    food('家樂福 - 爭鮮', 'soso'),
    food('家樂福 - 定食8', 'soso'),
    food('家樂福 - 花月嵐', 'soso'),
    food('家樂福 - 樓下', 'soso'),
    food('八方雲集', 'close'),
    food('小初店', 'far'),
    food('小初店', 'far'),
    food('飯殿', 'close'),
    food('烏龍麵', 'close'),
    food('自助餐', 'close'),
    food('自助餐', 'close'),
    food('豪小子', 'far'),
    food('水餃', 'far'),
    food('K 布朗 (帕尼尼)', 'far'),
    food('微笑咖哩', 'far'),
    food('Louisa', 'soso'),
    food('樹太老', 'soso'),
    food('OKKO', 'close'),
    food('糊塗麵', 'far'),
    food('蒸餃', 'far'),
    food('Subway', 'far'),
    food('溫沙拉', 'far'),
    food('海南雞飯', 'far'),
    food('空海', 'soso')
  ];

  filters: {
    close: boolean;
    soso: boolean;
    far: boolean;
  } = {
    close: true,
    soso: true,
    far: true
  };

  active: string = '';

  get filteredOptions() {
    const rules: string[] = [];
    for (let filter of Object.entries(this.filters)) {
      const [key, value] = filter;
      if (value) rules.push(key);
    }

    return this.foodList.filter(food => rules.includes(food.distance));
  }

  get optionsLen() {
    return this.filteredOptions.length - 1;
  }

  start() {
    timer = setInterval(() => {
      this.active = this.filteredOptions[
        this.randomBetween(0, this.optionsLen)
      ].name;
    }, 250);
  }

  deal() {
    clearInterval(timer);
  }

  random() {
    this.active = this.filteredOptions[
      this.randomBetween(0, this.optionsLen)
    ].name;
  }

  randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
</script>

<template>
  <div class="home-page">
    <header>中午吃什麼？</header>
    <main>
      <div class="answer-row">
        <span @click="deal">{{ active }}</span>
      </div>
    </main>
    <footer>
      <div class="buttons-row">
        <button
          :class="{ active: filters.close }"
          @click="filters.close = !filters.close"
          v-text="'附近'"
        />
        <button
          :class="{ active: filters.soso }"
          @click="filters.soso = !filters.soso"
          v-text="'普通'"
        />
        <button
          :class="{ active: filters.far }"
          @click="filters.far = !filters.far"
          v-text="'遠'"
        />
      </div>
      <button @click="random">隨機</button>
    </footer>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    .answer-row {
      height: 35px;
    }
  }
  footer {
    flex: none;
    width: 100%;
    height: 120px;
    .buttons-row {
      height: 40px;
      display: flex;
      justify-content: center;
      justify-items: flex-start;
      margin-bottom: 10px;
      button {
        width: 80px;
        height: 40px;
        border: 0;
        color: #333;
        background-color: #fff;
        &.active {
          color: #fff;
          background-color: orange;
        }
        &:not(:last-child) {
          margin-right: 2px;
        }
        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }
    button {
      border: none;
      height: 80px;
      width: 100%;
      display: flex;
      color: #fff;
      font-size: 18px;
      align-items: center;
      justify-content: center;
      background-color: #666;
    }
  }
}
</style>
