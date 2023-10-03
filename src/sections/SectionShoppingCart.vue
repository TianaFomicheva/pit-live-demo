<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '@/store/cart.js'
import { storeToRefs } from 'pinia'
const storeCart = useCartStore()
const router = useRouter()
const { ticket,  fee, holder } = storeToRefs(storeCart)
const holderErr = ref('')
const increaseTicket = () => {
  storeCart.increaseTicket()
}
const decreaseTicket = () => {
  storeCart.decreaseTicket()
}
const goToCheckout = () => {
  if(holder.value.firstName === '' || holder.value.lastName === ''){
    holderErr.value = 'please enter ticket holder name'
  }
  if (holder.value.firstName !== '' && holder.value.lastName !== '') {   
    storeCart.setHolder( holder.value )
    router.push('/checkout')
  }
}
</script>

<template>
  <div class="pit-cart" >
    <div class="pit-cart__wrapper">
      <router-link 
        :to="router.options.history.state.back">
        <div class="navigation" >
          <small><font-awesome-icon :icon="['fas', 'chevron-left']" /></small>Back
        </div>
      </router-link>
      <section>
      <div class="pit-cart__header">
        <span class="pit-cart__title">
          Your selection
        </span>
      </div>
      <div class="pit-cart__inner">
        <div class="pit-cart__description">
          <div class="pit-cart__imgs">
            <div class="pit-cart__img-wrapper">
              <img :src="'img/cards/' + ticket.src" alt="" class="pit-cart__img-main" />
              <img class="pit-cart__img-play" src="@/assets/img/cards/icon-play.svg" alt="" />
              </div>
          </div>
          <div class="pit-cart__text-block">
  
            <h2 class="pit-cart__title">{{ ticket.title }} + Breakfast With Bears</h2>
  
  
            <span class="pit-cart__date">{{ ticket.longDay }}, {{ ticket.dayMonth }} at {{ ticket.time }}</span>
            <span class="pit-cart__place">{{ ticket.place }},
              {{ ticket.town }}</span>
            <span class="pit-cart__section">Section: General admission</span>
  
          </div>
        </div>
        <div class="pit-cart__payment">
          <div></div>
          <form >
          <div class="pit-cart__details">
              <div class="pit-cart__info">
                <span class="pit-cart__text">Ticket price:</span>
                <span class="pit-cart__text">Quantity:</span>
              </div>
              <div class="pit-cart__info-price">
                <div class="pit-cart__price"><span class="pit-cart__price"> £ {{ ticket.price }}</span>
                </div>
                <div class="pit-cart__amount-block">
                  <span class="pit-cart__amount-button" :class="{'disabled': ticket.amount === 0}" @click="decreaseTicket"><font-awesome-icon
                      icon="minus" /></span>
                  <span class="pit-cart__amount">{{ ticket.amount }}</span>
                  <span class="pit-cart__amount-button" @click="increaseTicket"><font-awesome-icon
                      icon="plus" /></span>
                </div>
              </div>
              <div class="pit-cart__info-fullprice">
                <span class="pit-cart__text">Full Price Ticket:</span>
                <span class="pit-cart__text">£ {{ (parseFloat(ticket.price) * parseFloat(ticket.amount)).toFixed(2)
                }}</span>
              </div>
              <div class="pit-cart__info-bookingfee">
                <span class="pit-cart__text">Booking fee:</span>
                <span class="pit-cart__text">£ {{ fee }}</span>
              </div>
            <div class="pit-cart__info-total">
                <span class="pit-cart__text">Total:</span>
                <span class="pit-cart__text-total">£ {{ (parseFloat(ticket.price) * parseFloat(ticket.amount) +
                  parseFloat(fee)).toFixed(2) }}</span>
              </div>
              <p class="pit-cart__info-ticket">Ticket holder details:</p>
              <div class="pit-paycard__inputs-couple">
                <div class="pit-cart__input-container">
                  <input type="text" v-model="holder.firstName" class="custom-input" placeholder="FIRST NAME" @input="holderErr = ''">
                </div>
                <div class="pit-cart__input-container">
                  <input type="text" v-model="holder.lastName" class="custom-input" placeholder="LAST NAME" @input="holderErr = ''">
                </div>
                <span v-if="holderErr.length" class="error" v-html="holderErr"></span>
              </div>
              <p class="pit-cart__mark">18+ event - id required. Under 25s require id to buy alcohol</p>
            <div class="pit-cart__btns-couple">
              <div class="pit-cart__btn" @click="goToCheckout">Checkout now</div>
              <router-link :to="router.options.history.state.back"><div class="pit-cart__btn-plain">Cancel</div></router-link>
            </div>
          </div>
        </form>
        </div>
      </div> 
    </section>
    </div>
  </div>
</template>
