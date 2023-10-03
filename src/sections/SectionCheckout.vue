<script setup>
import ComponentPaymentStep1 from '@/components/ComponentPaymentStep1.vue'
import ComponentPaymentStep2 from '@/components/ComponentPaymentStep2.vue'
import ComponentPaymentStep3 from '@/components/ComponentPaymentStep3.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from 'vue-click-outside-of'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cart.js'
const storeCart = useCartStore()
const router = useRouter()
const { ticket, holder, fee } = storeToRefs(storeCart)

const step = ref(1)
const goToStep = (val) => {
  step.value = val
}
const holderName = computed(() =>
  holder?.value?.firstName.length || holder?.value?.lastName.length
    ? holder.value.firstName + ' ' + holder.value.lastName
    : 'not entered'
)

</script>

<template>
  <section class="pit-cart">
    <div class="pit-cart__wrapper">
      <div class="navigation">
        <router-link @click="goToStep(step - 1)"
        :to="step == 1 ? router.options.history.state.back : router.options.history.state.current">
        <div class="navigation" >
          <small><font-awesome-icon :icon="['fas', 'chevron-left']" /></small>Back
        </div>
      </router-link>
      </div>
      <div class="pit-cart__header">
        <span class="pit-cart__header-title">
          <img class="pit-cart__start-icon" src="@/assets/img/payment/Q2.svg" alt="" /> Secure payment with <img
            class="pit-cart__end-icon" src="@/assets/img/payment/worldpay.svg" alt="" />
        </span>
      </div>
      <div class="pit-cart__inner">
        <div class="pit-cart__description">
          <div class="pit-cart__imgs">
            <img :src="'img/cards/' + ticket.src" alt="" class="pit-cart__img-main" />
            <img class="pit-cart__img-play" src="@/assets/img/cards/icon-play.svg" alt="" />
          </div>
          <div class="pit-cart__text-block">

            <h2 class="pit-cart__title">{{ ticket.title }} + Breakfast With Bears <span class="pit-cart__amount">{{ ticket.amount }}</span></h2> 


            <span class="pit-cart__date">  {{ ticket.longDay }}, {{ ticket.dayMonth }} at {{ ticket.time }}</span>
            <span class="pit-cart__place">{{ ticket.place }},
              {{ ticket.town }}</span>
            <span class="pit-cart__section">Section: General admission</span>
            <p class="pit-cart__wrapper-text"><span class="pit-cart__subtitle">Ticket holder: </span> 
              <span class="pit-cart__name"> {{ holderName }} </span><router-link to="/shopping"><span class="pit-cart__link" >Edit</span></router-link>
            </p>
          </div>
        </div>
        <div class="pit-cart__payment pit-cart__payment--cards">
          <div></div>
          <div class="pit-cart__details">
            <div class="pit-cart__payment-header pit-cart__payment-header--info">
              <div class="pit-cart__text-couple pit-cart__text-couple--info">
                <span class="pit-cart__payment-title">Total: <span class=" pit-cart__payment-subtitle mobile"> ({{ ticket.amount }} ticket{{ ticket.amount > 1 ? 's' : ''}})</span></span>
                <span class="pit-cart__payment-title">£ {{ (parseFloat(ticket.price) * parseFloat(ticket.amount) +
                parseFloat(fee)).toFixed(2) }}</span>
              </div>
            </div>
            <div class="pit-cart__payment-subheader">
              <p class="pit-cart__text pit-cart__text-privacy">Our <router-link to="/privacy"><span class="pit-cart__link">Privacy Policy</span></router-link> and <router-link to="/terms"><span
                  class="pit-cart__link">Terms & Conditions.</span></router-link></p>
            </div>

            <ComponentPaymentStep1 v-if="step === 1" @go-to-step="goToStep"/>
            <ComponentPaymentStep2 v-if="step === 2"  @go-to-step="goToStep" />  
            <keep-alive>         
            <ComponentPaymentStep3 v-if="step === 3"  @go-to-step="goToStep" />
            </keep-alive>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>
