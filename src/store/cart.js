import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
    state: () => ({
        ticket: JSON.parse(localStorage.getItem('ticket')) || {},
        holder: JSON.parse(localStorage.getItem('holder'))|| {
            firstName: '',
            lastName: ''
        },
        cart: JSON.parse(localStorage.getItem('cart'))||  {
            number: '',
            holder: '',
            expire: '',
            cvc: ''
        },
        fee: 2.77
    }),
    actions: {
        addTicket(event ) {
            localStorage.setItem('ticket', JSON.stringify({...event, amount: 1 }))
            this.ticket = { ...event, amount: 1 }
        },
        setCart(cart){
            localStorage.setItem('cart', JSON.stringify({...cart, number: cart.number, holder: cart.holder, expire: cart.expire, cvc: cart.cvc}))
            this.cart = cart
        },
        increaseTicket() {
            this.ticket.amount++
            const ticket = JSON.parse(localStorage.getItem('ticket'))
            localStorage.setItem('ticket', JSON.stringify({...ticket, amount: this.ticket.amount}))
            this.fee = 2.77
        },
        decreaseTicket() {
            if(this.ticket.amount >0){
            this.ticket.amount--
            const ticket = JSON.parse(localStorage.getItem('ticket'))
            localStorage.setItem('ticket', JSON.stringify({...ticket, amount: this.ticket.amount}))
            }
            if(this.ticket.amount  === 0){
                this.fee = 0
            }
        },
        deteteTicket() {
            this.ticket = {}
        },
        setHolder( holder ) {
            localStorage.setItem('holder', JSON.stringify(holder))
            this.holder = holder
        }



    },
    
    

})