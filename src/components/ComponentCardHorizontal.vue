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
  <div class="pit-card-horizontal__outer">
    <div class="pit-card-horizontal__inner">
      <div class="pit-card__imgs">
        <img :src="'img/cards/' + event.src" alt="" class="pit-card__img-main" />
        <img
          class="pit-card__img-play"
          src="@/assets/img/cards/icon-play.svg"
          alt=""
        />
      </div>
      <div class="pit-cards__text-block">
        <div class="pit-cards__text-block__inner">
        <h2 class="pit-card__title">{{ event.title }}</h2>
        <span class="pit-card__date">{{ event.longDay }}, {{ event.dayMonth }} at {{ event.time }}</span>
        <span class="pit-card__place">{{ event.place }}</span>
      </div>
      <div>
        <button class="pit-card__btn" @click="buyTicket"><slot></slot></button>
      </div>
    </div>
     
    </div>
  </div>
</template>


