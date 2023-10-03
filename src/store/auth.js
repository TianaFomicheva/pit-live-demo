import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetchWrapper.js'
const baseUrl = `${import.meta.env.VITE_API_URL}/user`

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')) || {},
        carts: JSON.parse(localStorage.getItem('carts')) || [],
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
                this.user = user
                localStorage.setItem('user', JSON.stringify(user))
            }
            catch (error) {
                console.log(error)
            }
        },
        logout() {
            this.user.token = null
            const localUser = JSON.parse(localStorage.getItem('user'))
            delete localUser.token
            localStorage.setItem('user', JSON.stringify(localUser))
        },
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/register`, user)
        },
        setUser(user) {
            this.user = user
        },
        setCarts(carts) {
            this.carts = carts
            localStorage.setItem('carts', JSON.stringify(carts))
        },
        deleteCart(cart){
            const arr = JSON.parse(localStorage.getItem('carts'))
           
            const index = arr.findIndex(el =>el.number == cart.number)

            arr.splice(index, 1)

            this.carts = arr
            localStorage.setItem('carts', JSON.stringify(arr))
             

        }
    },
    getters: {
        isAuthorized: (state) => !!state.user.token,
            getCarts: (state) =>  state.carts
    }
})