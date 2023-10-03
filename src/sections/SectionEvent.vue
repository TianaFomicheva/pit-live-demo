<script setup>
import { ref, computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { useRoute, useRouter } from 'vue-router'
import { useEventsStore } from '@/store/events.js'
import { useCartStore } from '@/store/cart.js'
const storeEvents = useEventsStore()
const storeCart = useCartStore()
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)
const type = ref('-Select-')
const event = computed(() => storeEvents.getEvent(id.value))


const showOptions = ref(false)
const toggleOptions = () => {
  showOptions.value = !showOptions.value
}
const onSelect = (val) => {
  type.value = val
  showOptions.value = false
}
const clickOutside = () => {
  showOptions.value = false
}



const buyTicket = () =>{
    storeCart.addTicket({...event.value, type: type.value === 'Type 1' ? 1 : 2 , price: type.value === 'Type 1' ? event.value.price1 : event.value.price2 })
    router.push('/shopping')
  }

</script>

<template>
  <section class="pit-event">
    <div class="pit-event__wrapper">
      <router-link
        :to="router.options.history.state.back">
        <div class="navigation">
          <small><font-awesome-icon :icon="['fas', 'chevron-left']" /></small>Back
        </div>
      </router-link>
      <div class="pit-event__inner">
        <div class="pit-event__imgs">
          <img :src="'img/cards/' + event.src" alt="" class="pit-event__img-main" />
          <img class="pit-event__img-play" src="@/assets/img/cards/icon-play-big.svg" alt="" />
        </div>
        <div class="pit-event__text-block">
          <div class="pit-event__text-row pit-event__text-row--title">
            <h2 class="pit-event__title">{{ event.title }}</h2>
          </div>
          <div class="pit-event__text-row pit-event__text-row--info">
            <span class="pit-event__subtitle">plus supports:</span>
            <span class="pit-event__supports">Breakfast with bears</span>
          </div>
          <div class="pit-event__text-row pit-event__text-row--place">
            <span class="pit-event__date"><img src="/src/assets/img/ticket/calendar.svg" alt="" />{{ event.longDay }}, {{
              event.dayMonth }} at {{ event.time }}</span>

            <span class="pit-event__place"><img src="/src/assets/img/ticket/location.svg" alshare /> {{ event.place }}, {{
              event.town }}</span>
          </div>
          <div v-if="!event.disabled" class="pit-event__text-row pit-event__text-row--tickets">
            <span class="pit-event__subtitle pit-event__subtitle--tickets">tickets:</span>
            <div class="pit-event__tickets pit-event__tickets-type">


              <div class="pit-event__select-container"><font-awesome-icon icon="chevron-down" />
                <div v-html="type" @click="toggleOptions" class="pit-event__select" :key="type"></div>
                <div class="pit-event__options-list" v-if="showOptions" v-on-click-outside="clickOutside">
                  <span @click="onSelect('Type 1')">Type 1</span>
                  <span @click="onSelect('Type 2')">Type 2</span>
                </div>
              </div>
              <button class="pit-event__btn pit-event__btn-type invisible" ></button>
            </div>
          </div>
            <div class="pit-event__text-row pit-event__text-row--buy">
              <div class="pit-event__tickets pit-event__tickets-type">
              <div class="pit-event__ticket-price">
                <span class="pit-event__price"><span v-if="type !== '-Select-'">£ {{ type === 'Type 1' ?
                  event.price1 : event.price2 }}</span></span>
              </div>

              <div v-if="type === '-Select-'"><button class="pit-event__btn pit-event__btn-type" :class="{'disabled' :event.disabled}">Buy
                  tickets</button></div>
              <div v-else>
                <button
                    class="pit-event__btn pit-event__btn-type" @click="buyTicket()" >Buy tickets</button>
              </div>
              </div>
          </div>
        </div>
        <div class="pit-event__share">
          <div class="pit-event__icons">
            <span class="pit-event__text">Share: </span>
            <a class="pit-event__link-type" href="#" target="_blank">
              <img src="/src/assets/img/share/facebook-grey.svg " alt="" class="share__icon" />
            </a>
            <a class="pit-event__link-type" href="#" target="_blank">
              <img src="/src/assets/img/share/twitter-grey.svg" alt="" class="share__icon" />
            </a>
            <a class="pit-event__link-type" href="#" target="_blank">
              <img src="/src/assets/img/share/envelope-grey.svg" alt="" class="share__icon" />
            </a>
          </div>
        </div>
        <div class="pit-event__text-block pit-event__text-block--info">
          <div class="pit-event__text-row pit-event__text-row--about">
            <span class="pit-event__subtitle">about</span>
            <span class="pit-event__text">Facebook event</span>
            <span class="pit-event__text">Safe As Milk Promotions + New Cross Live present</span>
            <span class="pit-event__text"><span class="pit-event__text-bold">Blvck Hippie</span> - First Ever London
              Show</span>
            <span class="pit-event__text">Blvck Hippie is an Indie Rock Band from Memphis, TN tryna show Black kids they
              can be weird too. </span>
            <span class="pit-event__text">Blvck Hippie makes VHS-inspired music for anyone who’s ever felt like an
              outsider. By melding an emo sensibility with an indie rock aesthetic Blvck Hippie creates tunes for getting
              unstuck, existing weirdly, and finding togetherness. Raw vocals pair with sticky guitar riffs,
              heart-wrenching lyrics, and heavy breakdowns to create a live show for all of us raging inside. With their
              firmly indie attitude, refusal to accept the status quo, and knack for pushing musical boundaries, Blvck
              Hippie has turned being an outsider into their superpower. </span>
            
          <span class="pit-event__text">RIYL: The Strokes, Car Seat Headrest, Bright Eyes, Blood Orange</span>
          
          <span class="pit-event__link"><a href="https://orcd.co/elysianskies" target="_blank">https://orcd.co/elysianskies</a></span>
          <span class="pit-event__text"><span class="pit-event__text-bold">Breakfast With Bears</span></span>
          <span class="pit-event__text">London Based Emo Boiz, writing sad songs to make you dance and cry.</span>
          <span class="pit-event__text"><a
              href="https://linktr.ee/Breakfastwithbears" target="_blank">https://linktr.ee/Breakfastwithbears</a></span>
          <span class="pit-event__text"><span class="pit-event__text-bold">Shoefig</span></span>
          <span class="pit-event__text">Wavy dream pop band tryna make some wibes.</span>
          <span class="pit-event__link pit-event__link--last"><a
              href="https://www.instagram.com/shoefig_/" target="_blank">www.instagram.com/shoefig_/</a></span>

        </div>
      </div>
    </div>
  </div>
</section></template>
