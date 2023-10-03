<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { ref, reactive, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart.js'
import { useAuthStore } from '@/store/auth.js'
const router = useRouter()
const storeAuth = useAuthStore()
const storeCart = useCartStore()
const { cart, ticket, fee } = storeToRefs(storeCart)
const { carts } = storeToRefs(storeAuth)
const { user } = storeToRefs(storeAuth)
const isAuthorized = ref(user.value.token)
const subscribe = ref(true)
onMounted(() => {
    if (toRaw(cart?.value)?.number) {
        selectCart(toRaw(cart.value))
    }
    if (toRaw(carts.value)?.length === 1) {
        selectCart(toRaw(carts.value)[0])
    }
})
const newCart = reactive({
    number: '',
    holder: '',
    expire: '',
    cvc: ''
})
const newCartErrs = reactive({
    numberErr: false,
    holderErr: false,
    expireErr: false,
    cvcErr: false
})
const errExpire = ref('')
const errNumber = ref('')
const errHolder = ref('')
const errCvc = ref('')
const emit = defineEmits(['go-to-step'])
const errCart = ref(false)
const fromSaved = ref(false)

const showSavedCarts = ref(false)
const selectCart = (cartItem) => {
    cart.value = cartItem
    fromSaved.value = true
    errCart.value = ''
    showSavedCarts.value = false
}
const addedCart = ref(false)
const clickOutside = (e) => {
    if(e.target?.attributes?.src?.nodeValue !== '/src/assets/img/payment/chevron-down.svg'){
    showSavedCarts.value = false
    }
}
const deleteCart = (cartItem) => {
    storeAuth.deleteCart(cartItem)
}
const finishOrder = () => {

    if (addedCart.value) {
            newCartErrs.numberErr = !newCart.number.length,
            newCartErrs.holderErr = !newCart.holder.length,
            newCartErrs.expireErr = !newCart.expire.length,
            newCartErrs.cvcErr = !newCart.cvc.length
        if (newCartErrs.numberErr || newCartErrs.holderErr || newCartErrs.expireErr || newCartErrs.cvcErr) {
            errCart.value = true
        }
        if (!newCartErrs.numberErr && !newCartErrs.holderErr && !newCartErrs.expireErr && !newCartErrs.cvcErr) {
            storeAuth.setCarts(toRaw(carts.value).length ? [...toRaw(carts.value), toRaw(newCart)] : [toRaw(newCart)])
            storeCart.setCart(toRaw(cart.value))

        }
    } else {
        if (!toRaw(cart.value?.number)?.length) {
            errNumber.value = 'Please enter a cart number'
        }
        if (!toRaw(cart.value?.holder)?.length) {
            errHolder.value = 'Please enter a holder name'
        }
        if (!toRaw(cart.value?.expire)?.length) {
            errExpire.value = 'Please enter a expire date'
        }
        if (!toRaw(cart.value?.cvc)?.length) {
            errCvc.value = 'Please enter a cvc'
        }
        if(errNumber.value.length || errHolder.value.length || errExpire.value.length || errCvc.value.length){
            errCart.value = true
        }else{
            storeCart.setCart(toRaw(cart.value))
        }
    }
    if (!errCart.value) {        
        let path = ticket.amount > 3 ? '/unsuccess' : 'success'
        router.push(path)
    } else{
    }
}
const toggleShowSavedCards = (e) =>{
    addedCart.value = false
    showSavedCarts.value = !showSavedCarts.value
    e.stopPropagation()
}
const goToStep = (val) =>{
    emit('go-to-step', val)
}
const lastDigits = (number) =>{
  return number.slice(-4)
}
</script>

<template>
    <section class="pit-cart__form">
        <div class="pit-cart__text-couple pit-cart__text-couple--select"> <span v-if="addedCart" class="pit-cart__text">Add new card details</span> <span v-if="carts.length && isAuthorized" :class="{'pit-cart__text': !addedCart, 'pit-cart__link': addedCart}"
        @click="toggleShowSavedCards">Select saved card</span></div>
        <div class="pit-cart__input-container " v-if="!addedCart && carts.length && isAuthorized">
            <img src="/src/assets/img/payment/maestro.svg" alt="" class="input__icon-card input__icon-card-maestro" />
            <img src="/src/assets/img/payment/chevron-down.svg" alt="" class="input__icon"
                @click="toggleShowSavedCards" />
            <div v-html="lastDigits(cart.number)"  class="custom-input pit-cart__input customized-credit-field"></div>
            <span  class="cart-circles-outer"><span v-for="(item, index) in 3" :key="index"
                  class="cart-circles-group"><font-awesome-icon v-for="(item, index) in 4" :key="index" :icon="['fas', 'circle']" />
                </span></span>
            <span v-if="errCart.length" class="error" v-html="errCart"></span>


                <div class="pit-cart__carts-list" v-if="showSavedCarts" v-on-click-outside="clickOutside">
                    <div class="pit-cart__carts-list-item" v-for="(cartItem, index) in carts" :key="index"
                        @click="selectCart(cartItem)">
                        <div class="pit-cart__input-container">
                            <img :src="index % 2 ? 'img/payment/maestro.svg' : 'img/payment/visa.svg'" alt=""
                                class="input__icon-card input__icon-card-visa" />

                            <div v-html="lastDigits(cartItem.number)" 
                                class="custom-input pit-cart__input customized-credit-field"></div>
                                <span  class="cart-circles-outer"><span v-for="(item, index) in 3" :key="index"
                  class="cart-circles-group"><font-awesome-icon v-for="(item, index) in 4" :key="index" :icon="['fas', 'circle']" />
                </span></span>
                        </div>
                    </div>
                </div>
        </div>

        <div class="pit-cart__btn-container" v-if="!addedCart">
            <button class="pit-cart__btn-plain" @click="goToStep(3)"> <span><img
                        src="/src/assets/img/payment/icon-card.svg" alt="" class="btn__start-icon" />Add new
                    card</span></button>
        </div>
        
        <div class="pit-cart__text-container">
                <div class="pit-cart__text-couple">
                    <p><span class="pit-cart__payment-title">Total:</span><span class="pit-cart__payment-subtitle">
                            ({{ ticket.amount }} ticket{{ ticket.amount > 1 ? 's' : ''}})</span></p>
                    <span class="pit-cart__payment-title">£ {{ (parseFloat(ticket.price) * parseFloat(ticket.amount) +
                        parseFloat(fee)).toFixed(2) }}</span>
                </div>
            </div>
        <p class="pit-cart__text pit-cart__text--limitation">18+ event - id required. Under 25s require id to buy alcohol</p>
        <div class="pit-cart__btn" @click="finishOrder">Pay now</div>

    </section>
</template>