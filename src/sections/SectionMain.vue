<script setup>
import ComponentCardVertical from '@/components/ComponentCardVertical.vue'
const props = defineProps(['events'])
const { events } = props

const scrollToTop = () => {
  const scrollStep = window.scrollY / 50
  const scrollToTopLoop = () => {
    if (window.scrollY > 0) {
      window.scrollTo(0, window.scrollY - scrollStep)
      requestAnimationFrame(scrollToTopLoop)
    }
  }
  scrollToTopLoop()
}
</script>


<template>
  <section class="pit-cards">
    <div class="pit-cards__wrapper" v-if="events">
      <div class="pit-cards__cards-blocks">
        <component-card-vertical v-for="event in events" :event="event" :key="event.id" />
      </div>
    </div>
  </section>
  <section class="pit-card__info">
    <img class="pit-card__info-img" src="@/assets/img/pit-info.jpg" alt="" />
    <div class="pit-card__info-wrapper">
      <div class="pit-card__info-block">
        <h2 class="pit-card__info-title">Welcome to PIT.LIVE</h2>
        <p class="pit-card__info-text">
          The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox
          whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived
          waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold
          Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras
          vex.
        </p>
        <router-link to="/about"><span  class="pit-card__info-btn">Learn more…</span></router-link>
      </div>
      <a class="pit-card__info-top" @click="scrollToTop">
          <img src="../assets/img/footer/footer-icon-to-top.svg" alt="">
        </a>
    </div>
</section></template>
