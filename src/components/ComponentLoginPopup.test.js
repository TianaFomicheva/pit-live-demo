import { render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../store/auth'
import ComponentLoginPopup from './ComponentLoginPopup.vue'
import {createRouter, createWebHistory} from 'vue-router'
import preferences from '../sections/SectionEditPreferences.vue'
beforeEach(() => {
  // creates a fresh pinia and make it active so it's automatically picked
  // up by any useStore() call without having to pass it to it:
  // `useStore(pinia)`
  setActivePinia(createPinia())
  const  authStore = useAuthStore()
})
test('render login popup', () => { 

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {path: '/preferences', component: preferences}
    ],
  })

    const {debug} = render(ComponentLoginPopup, {global: {
      plugins: [router]
    }})
    debug()
 })