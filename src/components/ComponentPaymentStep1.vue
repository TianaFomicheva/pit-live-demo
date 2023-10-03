<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth.js'
const storeAuth = useAuthStore()
const { user } = storeToRefs(storeAuth)
const isAuthorized = ref(user.value.token)
const emit = defineEmits(['go-to-step'])
const goToStep = (val) =>{
    emit('go-to-step', val)
}
</script>

<template>
    <section>
        <form>
            <div class="pit-cart__btn-container pit-cart__input-container--pay pit-cart__input-container--info">
               <span class="pit-cart__text pit-cart__text--payment"> Select payment method </span>
            </div>
            <div class="pit-cart__btn-container pit-cart__btn-container--pay">
                <button class="pit-cart__btn" @click="goToStep(isAuthorized ? 2 : 3)"> <span><img src="/src/assets/img/payment/icon-card-white.svg" alt=""
                            class="btn__start-icon" />Pay with card</span></button>
            </div>
            <div class="pit-cart__btn-container pit-cart__input-container--apple">
                <button class="pit-cart__btn-plain"> <span class="pit-cart__buy-with">Buy with <img src="/src/assets/img/payment/ApplePay.svg"
                            alt="" class="btn__end-icon" /></span></button>
            </div>
            <div class="pit-cart__btn-container pit-cart__input-container--google">
                <button class="pit-cart__btn-plain"> <span class="pit-cart__buy-with">Buy with <img src="/src/assets/img/payment/GooglePay.svg"
                            alt="" class="btn__end-icon" /></span></button>
            </div>
        </form>
    </section>
</template>