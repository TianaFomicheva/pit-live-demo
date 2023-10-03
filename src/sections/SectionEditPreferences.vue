<script setup>
import ComponentAddCard from '../components/ComponentAddCard.vue'
import ComponentForgotPasswordPopup from '@/components/ComponentForgotPasswordPopup.vue'
import ComponentConfirmationPopup from '@/components/ComponentConfirmationPopup.vue'
import { ref, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'
import { storeToRefs } from 'pinia'
const isForgotPasswordPopupOpen = ref(false)
const isConfirmationPopupOpen = ref(false)
const authStore = useAuthStore()
const { user, carts } = storeToRefs(authStore)
const emit = defineEmits(['set-authorized'])
const router = useRouter()
const showContact = ref(true)
const showPayment = ref(true)
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
const deleteAccount = () => {
  isConfirmationPopupOpen.value = false
  localStorage.removeItem('user')
  emit('set-authorized', false)
  router.push('/')
}

const values = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  email: user.value.email,
  mobile: user.value.mobile
})

const subscribe = ref(true)
const onSubmit = () => {
  authStore.setUser({
    ...user.value, firstName: values.firstName, lastName: values.lastName, email: values.email,
    mobile: values.mobile
  })
  localStorage.setItem('user', JSON.stringify({
    ...user.value, firstName: values.firstName, lastName: values.lastName, email: values.email,
    mobile: values.mobile
  }))
    newCartErrs.numberErr = addedCart.value && !newCart.number.length,
    newCartErrs.numberValidErr = newCart.number.length && newCart.number.replaceAll(' ', '').length < 16
    newCartErrs.holderErr = addedCart.value && !newCart.holder.length,
    newCartErrs.expireErr = addedCart.value && !newCart.expire.length,
    newCartErrs.expireValidErr =  newCart.expire.length && (newCart.expire.length <5 || Number(newCart.expire.split('/')[0]) > 12 || Number(newCart.expire.split('/')[1]) > 40)
    newCartErrs.cvcErr = addedCart.value && !newCart.cvc.length
    newCartErrs.cvcValidErr = newCart.cvc.length && (newCart.cvc.length <3)

  if (!newCartErrs.numberErr && !newCartErrs.holderErr && !newCartErrs.expireErr && !newCartErrs.expireValidErr && !newCartErrs.cvcErr) {

    authStore.setCarts(!addedCart.value ? [...toRaw(carts.value)] : toRaw(carts.value).length ? [...toRaw(carts.value), toRaw(newCart)] : [toRaw(newCart)])
    window.location.reload()
  }

}

const deleteCard = (card) => {
  authStore.deleteCart(toRaw(card))
  addedCart.value = false
}
const addedCart = ref(false)

const onOpenPasswordPopup = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isForgotPasswordPopupOpen.value = true
  let element = document.getElementById('app')
  element.classList.add('shadow-covered')
}
const onOpenConfirmationPopup = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isConfirmationPopupOpen.value = true
  let element = document.getElementById('app')
  element.classList.add('shadow-covered')
}
const lastDigits = (number) =>{
  return number.slice(-4)
}
</script>

<template>
  <section class="pit-preferences">
    <div class="pit-preferences__wrapper">
      <div class="pit-preferences__header">
        <h2 class="pit-preferences__title">Edit preferences</h2>
      </div>
      <div class="pit-preferences__toggle-block pit-preferences__toggle-block--contact" :class="{'active':showContact}">
        <div class="pit-preferences__toggle-header" :class="{'active':showContact}">
          <div class="preferences__toggle-title">Contact details</div>
          <font-awesome-icon v-if="!showContact" icon="chevron-down" @click="showContact = true" />
          <font-awesome-icon v-else icon="chevron-up" @click="showContact = false" />
        </div>
        <div class="pit-preferences__inputs-outer" v-if="showContact">
          <div class="input-container">
            <input type="text" v-model="values.firstName" class="custom-input pit-preferences__input "
              placeholder="First name">
          </div>
          <div class="input-container">
            <input type="text" v-model="values.lastName" class="custom-input pit-preferences__input"
              placeholder="Last name">
          </div>
          <div class="input-container">
            <input type="text" v-model="values.email" class="custom-input pit-preferences__input"
              placeholder="Email address">
          </div>
          <div class="input-container">
            <input type="text" v-model="values.mobile" class="custom-input pit-preferences__input"
              placeholder="Mobile number (optional)">
          </div>
        </div>
      </div>
      <div class="pit-preferences__toggle-block pit-preferences__toggle-block--payment"  :class="{'active':showPayment}">
        <div class="pit-preferences__toggle-header" :class="{'active':showPayment}">
          <div class="preferences__toggle-title">Payment method</div>
          <font-awesome-icon v-if="!showPayment" icon="chevron-down" @click="showPayment = true" />
          <font-awesome-icon v-else icon="chevron-up" @click="showPayment = false" />
        </div>
        <div class="pit-preferences__inputs-outer" v-if="showPayment">
          <div class="pit-preferences__block-header pit-preferences__block-header--payment">
            <div class="pit-preferences__block-title">Saved cards</div>
          </div>
          <div v-for="(card, index) in carts" :key="index">
            <div class="input-container input-container--card">
              <img :src="index % 2 ? 'img/payment/maestro.svg' : 'img/payment/visa.svg'" alt=""
                class="input__icon-card" />
              <img src="/src/assets/img/payment/icon-clear.svg" alt="" class="input__icon" @click="deleteCard(card)" />
              <input :type="text" readonly v-mask="'#### #### #### ####'" :value="lastDigits(card.number)" 
                class="custom-input pit-preferences__input customized-credit-field" unselectable='on' onselectstart="return false;"
  onmousedown="return false;">
              <span  class="cart-circles-outer"><span v-for="(item, index) in 3" :key="index"
                  class="cart-circles-group"><font-awesome-icon v-for="(item, index) in 4" :icon="['fas', 'circle']" :key="index" />
                </span></span>
            </div>

          </div>
          <ComponentAddCard v-if="addedCart" v-model:number="newCart.number" v-model:holder="newCart.holder"
            v-model:expire="newCart.expire" v-model:cvc="newCart.cvc" v-model:numberErr="newCartErrs.numberErr" v-model:numberValidErr="newCartErrs.numberValidErr"
            v-model:holderErr="newCartErrs.holderErr" v-model:expireErr="newCartErrs.expireErr" v-model:expireValidErr="newCartErrs.expireValidErr" v-model:cvcValidErr="newCartErrs.cvcValidErr"
            v-model:cvcErr="newCartErrs.cvcErr" />
          <div class="input-container input-container--add">
            <div v-if="!addedCart" class="pit-preferences__btn-plain" @click="addedCart = true"> <span><img
                  src="/src/assets/img/payment/icon-card.svg" alt="" class="btn__start-icon" />Add new card</span></div>
          </div>
        </div>
      </div>
      <div class="pit-preferences__btns-block pit-preferences__btns-block--subscribe">
        <div class="input-container pit-preferences__input-subscribe">
          <label class="custom-checkbox__label" for="subscribe">
            <input type="checkbox" v-model="subscribe" class="custom-checkbox" name="" id="subscribe" />
            <span class="checkmark"></span>Subscribe to our newsletter</label>
        </div>
        <div class="input-container pit-preferences__input-save">
          <div class="pit-preferences__btn" @click="onSubmit">Save changes</div>
        </div>

        <div class="input-container pit-preferences__input-change">
          <div class="pit-preferences__btn-plain" @click="onOpenPasswordPopup">Change password</div>
        </div>
        <div class="input-container">
          <button class="pit-preferences__btn-invisible" @click="onOpenConfirmationPopup">Delete your account</button>
        </div>
      </div>
    </div>
    <ComponentConfirmationPopup :is-confirmation-popup-open="isConfirmationPopupOpen"
    :key="isConfirmationPopupOpen" @close="isConfirmationPopupOpen = false" @delete-account="deleteAccount"/>
  <ComponentForgotPasswordPopup :is-forgot-password-popup-open="isForgotPasswordPopupOpen"
    :key="isForgotPasswordPopupOpen" @close="isForgotPasswordPopupOpen = false" />
</section></template>
