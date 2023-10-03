<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth.js'
const storeAuth = useAuthStore()
const { user } = storeToRefs(storeAuth)
const isAuthorized = ref(user.value.token)
const isRegistred = ref(user.value.password)
</script>

<template>
  <section class="pit-success">
    <div class="pit-success__wrapper">
      <h2 class="pit-success__title">Thank you!</h2>
      <img
        src="@/assets/img/success-icon.svg"
        alt=""
        class="pit-success__img" />
      <span class="pit-success__subtitle">Order successfully paid</span>
      <p v-if="!isAuthorized" class="pit-success__info">
        Your tickets have been sent to your email address and can also be viewed
        here.
      </p>
      <button class="pit-success__btn-plain">
        <div class="pit-success__btn-plain-content">
          <img src="@/assets/img/ticket.svg" class="ticket__icon" />
          <span>Your ticket</span>
        </div>
      </button>
      <span class="pit-success__complete" v-if="!isRegistred">Complete your registration</span>
      <p  v-if="!isRegistred" class="pit-success__text">
        To complete your registration, please use the link that was sent to your
        email. Thank you for buying tickets with PIT.LIVE.
      </p>
    </div>
  </section>
</template>
