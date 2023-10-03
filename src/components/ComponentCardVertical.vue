<script setup>
import { useCartStore } from '@/store/cart.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const storeCart = useCartStore()
const props = defineProps(['event'])
const { event } = props



const buyTicket = () =>{
    router.push(`/event/${event.id}`)
  }
</script>

<template>
  <div class="pit-card-vertical__outer">
    <div class="pit-card-vertical__inner">
      <router-link :to="{name: 'event', params: {id: event.id}}"><div class="pit-card-vertical__featured">
        <div class="pit-card__imgs">
          <img :src="'img/cards/' + event.src" alt="" class="pit-card__img-main" />
          <img class="pit-card__img-play" src="@/assets/img/cards/icon-play.svg" alt=""/>
         </div>
        <div class="pit-card__text-block">
          <h2 class="pit-card__title">{{ event.title }}</h2>
          <span class="pit-card__date">{{ event.dayMonth }} at {{ event.time }}</span>
          <span class="pit-card__place">{{ event.place }}</span>
        </div>
      </div>
    </router-link>
      <button :disabled="event.disabled" class="pit-card__btn" @click="buyTicket()">{{event.disabled ? 'Contact Venue' :'Buy tickets'}}</button>
    </div>
  </div>
</template>


