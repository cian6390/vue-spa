import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'

test('App should render  the msg prop', () => {
  const msg = 'vue test'
  const wrapper = shallowMount(App, {
    propsData: { msg }
  })

  expect(wrapper.html()).toContain(msg)
})
