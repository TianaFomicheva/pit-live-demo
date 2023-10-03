import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp, faChevronLeft, faPlus, faMinus, faCircle} from '@fortawesome/free-solid-svg-icons'
import { faEye} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import directives from "./directives/"
import { fakeBackend } from './helpers/fake-backend.js'
import '@/assets/styles/style.css'
library.add(faChevronUp)
library.add(faChevronDown)
library.add(faChevronLeft)
library.add(faMinus)
library.add(faPlus)
library.add(faEye)
library.add(faCircle)
fakeBackend()
const app = createApp(App)
directives(app)



app.use(pinia).use(VueTheMask).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
