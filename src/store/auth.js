import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetchWrapper.js'
import useLocalStorage from '@/composables/useLocalStorage.js'
const useLocal = useLocalStorage()
const baseUrl = `${process.env.VITE_API_URL}/user`

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: useLocal.getFromStorage('user') || {},
        carts: useLocal.getFromStorage('carts') || [],
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
                this.user = user
                useLocal.setToStorage('user', user)
            }
            catch (error) {
                console.log(error)
            }
        },
        logout() {
            this.user.token = null
            const localUser = useLocal.getFromStorage('user')
            delete localUser.token
            useLocal.setToStorage('user',localUser)
        },
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/register`, user)
        },
        setUser(user) {
            this.user = user
        },
        setCarts(carts) {
            this.carts = carts
            useLocal.setToStorage('carts', carts)
        },
        deleteCart(cart){
            const arr = useLocal.getFromStorage('carts')           
            const index = arr.findIndex(el =>el.number == cart.number)
            arr.splice(index, 1)
            this.carts = arr
            useLocal.setToStorage('carts', arr)
             

        }
    },
    getters: {
        isAuthorized: (state) => !!state.user.token,
            getCarts: (state) =>  state.carts
    }
})