import { defineStore } from 'pinia'
import useLocalStorage from '@/composables/useLocalStorage.js'
const useLocal = useLocalStorage()
export const useCartStore = defineStore('cart', {
    state: () => ({
        ticket: useLocal.getFromStorage('ticket') || {},
        holder: useLocal.getFromStorage('holder') || {
            firstName: '',
            lastName: ''
        },
        cart: useLocal.getFromStorage('cart') ||  {
            number: '',
            holder: '',
            expire: '',
            cvc: ''
        },
        fee: 2.77
    }),
    actions: {
        addTicket(event ) {
            useLocal.setToStorage('ticket', {...event, amount: 1 })
            this.ticket = { ...event, amount: 1 }
        },
        setCart(cart){
            useLocal.setToStorage('cart', {...cart, number: cart.number, holder: cart.holder, expire: cart.expire, cvc: cart.cvc})
            this.cart = cart
        },
        increaseTicket() {
            this.ticket.amount++
            const ticket = useLocal.getFromStorage('ticket')
            useLocal.setToStorage('ticket', {...ticket, amount: this.ticket.amount})
            this.fee = 2.77
        },
        decreaseTicket() {
            if(this.ticket.amount >0){
            this.ticket.amount--
            const ticket = useLocal.getFromStorage('ticket')
            useLocal.setToStorage('ticket', {...ticket, amount: this.ticket.amount})
            }
            if(this.ticket.amount  === 0){
                this.fee = 0
            }
        },
        deteteTicket() {
            this.ticket = {}
        },
        setHolder( holder ) {
            useLocal.setToStorage('holder', holder)
            this.holder = holder
        }



    },
    
    

})