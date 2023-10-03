import { useAuthStore } from '@/store/auth.js'
import { createRouter, createWebHashHistory } from 'vue-router'
import main from '@/sections/SectionMain.vue'
import login from '@/sections/SectionLogin.vue'
import signin from '@/sections/SectionSignIn.vue'
import registration from '@/sections/SectionRegistration.vue'
import results from '@/sections/SectionSearchResults.vue'
import event from '@/sections/SectionEvent.vue'
import shopping from '@/sections/SectionShoppingCart.vue'
import preferences from '@/sections/SectionEditPreferences.vue'
import checkout from '@/sections/SectionCheckout.vue'
import success from '@/sections/SectionSuccess.vue'


export const router = createRouter({
    history: createWebHashHistory(),
    routes: [

        {
            path: '/',
            component: main
        },

        {
            path: '/login',
            component: login
        },
        {
            path: '/results',
            name: 'resultsEmpty',
            component: results
        },
        {
            path: '/results/:query',
            name: 'results',
            component: results
        },
        {
            path: '/event/:id',
            name: 'event',
            component: event
        },
        {
            path: '/shopping',
            component: shopping
        },
        {
            path: '/preferences',
            component: preferences
        },
        {
            path: '/checkout',
            component: checkout
        },
        {
            path: '/signin',
            component: signin
        },
        {
            path: '/registration',
            component: registration
        },
        {
            path: '/success',
            component: success
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    }
})
router.beforeEach((to, from) =>{
    const privatePages = ['/preferences']
    if(from.path !== '/registration'){
        privatePages.push('/login')
    }
    const authRequired = privatePages.includes(to.path)
    const authStore = useAuthStore()

    if (authRequired && !authStore.user.token) {
        return '/signin'
    }
})
export default router
