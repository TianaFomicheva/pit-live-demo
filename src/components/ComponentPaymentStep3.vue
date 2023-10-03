<script setup>
import ComponentAddCard from '../components/ComponentAddCard.vue'
import { ref, onMounted, onBeforeUnmount, toRaw, reactive } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import Tooltip from './Tooltip.vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart.js'
import { useAuthStore } from '@/store/auth.js'
import { useRouter } from 'vue-router'
const storeAuth = useAuthStore()
const storeCart = useCartStore()
const { carts } = storeToRefs(storeAuth)
const { user } = storeToRefs(storeAuth)
const isAuthorized = ref(user.value.token)
const router = useRouter()
const { cart, ticket, fee } = storeToRefs(storeCart)
const showSavedCarts = ref(false)
const newCart = reactive({
  number: '',
  holder: '',
  expire: '',
  cvc: ''
})
const newCartErrs = reactive({
  numberErr: false,
  numberValidErr: false,
  holderErr: false,
  expireErr: false,
  expireValidErr: false,
  cvcErr: false,
  cvcValidErr: false
})

const finishOrder = () => {
    newCartErrs.numberErr = !newCart.number.length,
    newCartErrs.numberValidErr = newCart.number.length && newCart.number.replaceAll(' ', '').length < 16
    newCartErrs.holderErr = !newCart.holder.length,
    newCartErrs.expireErr = !newCart.expire.length,
    newCartErrs.expireValidErr =  newCart.expire.length && (newCart.expire.length <5 || Number(newCart.expire.split('/')[0]) > 12 || Number(newCart.expire.split('/')[1]) > 40)
    newCartErrs.cvcErr = !newCart.cvc.length
    newCartErrs.cvcValidErr = newCart.cvc.length && (newCart.cvc.length <3)
  if (
    !newCartErrs.errEmail &&
    !newCartErrs.errEmailConfirm &&
    !newCartErrs.errNumber &&
    !newCartErrs.errHolder &&
    !newCartErrs.errExpire &&
    !newCartErrs.errCvc
  ) {
    storeCart.setCart(toRaw(newCart))
    if (isAuthorized.value && !fromSaved.value) {
      storeAuth.setCarts(
        toRaw(carts.value).length
          ? [...toRaw(carts.value), toRaw(newCart)]
          : [toRaw(newCart)]
      )
    }
    router.push('/success')
  }
}

const selectCard = (cartItem) => {
  newCart.number = toRaw(cartItem).number
  newCart.holder = toRaw(cartItem).holder
  newCart.expire = toRaw(cartItem).expire
  newCart.cvc = toRaw(cartItem).cvc
  cart.value = cartItem
  showSavedCarts.value = false
  fromSaved.value = true
}
const fromSaved = ref(false)
const clickOutside = () => {
  showSavedCarts.value = false
}

const lastDigits = (number) => {
  return number.slice(-4)
}
</script>

<template>
  <section class="pit-cart__add">
    <div class="pit-cart__text-couple">
      <span class="pit-cart__text pit-cart__text--add"
        >Add new card details</span
      >
      <span
        class="pit-cart__link pit-cart__link--select"
        v-if="carts.length && isAuthorized"
        @click="showSavedCarts = !showSavedCarts"
        >Select saved card</span
      >
    </div>

      <div class="pit-cart__input-container">
        <div
          class="pit-cart__carts-list"
          v-if="showSavedCarts"
          v-on-click-outside="clickOutside"
        >
          <div
            class="pit-cart__carts-list-item"
            v-for="(cartItem, index) in carts" :key="index"
            @click="selectCard(cartItem)"
          >
            <div class="pit-cart__input-container">
              <img
                :src="
                  index % 2 ? 'img/payment/maestro.svg' : 'img/payment/visa.svg'
                "
                alt=""
                class="input__icon-card input__icon-card-visa"
              />
              <div
                type="text"
                v-html="lastDigits(cartItem.number)"
                class="custom-input pit-cart__input customized-credit-field"
              ></div>
              <span class="cart-circles-outer"
                ><span v-for="(item, index) in 3" class="cart-circles-group" :key="index"
                  ><font-awesome-icon
                    v-for="(item, index) in 4" :key="index"
                    :icon="['fas', 'circle']" /></span
              ></span>
            </div>
          </div>
        </div>
      </div>

          <ComponentAddCard  v-model:number="newCart.number" v-model:holder="newCart.holder"
            v-model:expire="newCart.expire" v-model:cvc="newCart.cvc" v-model:numberErr="newCartErrs.numberErr" v-model:numberValidErr="newCartErrs.numberValidErr"
            v-model:holderErr="newCartErrs.holderErr" v-model:expireErr="newCartErrs.expireErr" v-model:expireValidErr="newCartErrs.expireValidErr" v-model:cvcValidErr="newCartErrs.cvcValidErr"
            v-model:cvcErr="newCartErrs.cvcErr" />


      <div class="pit-cart__text-couple pit-cart__text-couple">
        <p>
          <span class="pit-cart__payment-title">Total:</span
          ><span class="pit-cart__payment-subtitle">
            ({{ ticket.amount }} ticket)</span
          >
        </p>
        <span class="pit-cart__payment-title"
          >£
          {{
            (
              parseFloat(ticket.price) * parseFloat(ticket.amount) +
              parseFloat(fee)
            ).toFixed(2)
          }}</span
        >
      </div>
    <p class="pit-cart__text-small">
      18+ event - id required. Under 25s require id to buy alcohol
    </p>

    <div class="pit-cart__btn" @click="finishOrder">Pay now</div>
  </section>
</template>