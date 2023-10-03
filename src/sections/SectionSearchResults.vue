<script setup>
import ComponentCardHorizontal from '@/components/ComponentCardHorizontal.vue'
import { ref, computed, onMounted } from 'vue'
import { useEventsStore } from '@/store/events.js'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const query = computed(() => route.params.query)
const eventsStore = useEventsStore()
const results = computed(() => eventsStore.getFilteredResults(query.value))
const posLat = ref('')
const posLong = ref('')
const sortProp = ref('date')
const sortedResults = computed(() => {
  return results?.value.sort(byField(sortProp.value))
})

const byField = (field) => {
  if (field === 'date') {
    return (a, b) => Date.parse(a['date']) > Date.parse(b['date']) ? 1 : -1;
  } else if (field === 'distance') {

    if(!!posLong.value &&  !!posLat.value){
    return (a, b) => distance(posLong.value, posLat.value, parseFloat(a['geo'].split(', ')[1]), parseFloat(a['geo'].split(', ')[0])) > distance(posLong.value, posLat.value, parseFloat(b['geo'].split(', ')[1]), parseFloat(b['geo'].split(', ')[0])) ? 1 : -1;
    }
  }
  else {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }
}
function showLocation(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  posLat.value = latitude
  posLong.value = longitude
}

function errorHandler(err) {
  if (err.code == 1) {
    console.log("geolocation is denied")
  } else if (err.code == 2) {
    console.log("Error: Position is unavailable!")
  }
}

function getLocation() {

  if (navigator.geolocation) {
    var options = { timeout: 60000 };
    navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options)
  } else {
    //alert("Sorry, browser does not support geolocation!");
  }
}
function distance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
}
const current = ref(1)
const start = ref(0)
const end = ref(8)
const onClickHandler = (page) => {
  start.value = page == 1 ? 0 : (page - 1) * 8
  end.value = page * 8
  current.value = page
};

onMounted(() => getLocation())

const scrollToTop = () => {
  const scrollStep = window.scrollY / 50;
  const scrollToTopLoop = () => {
    if (window.scrollY > 0) {
      window.scrollTo(0, window.scrollY - scrollStep);
      requestAnimationFrame(scrollToTopLoop);
    }
  };
  scrollToTopLoop();
};

</script>

<template>
  <section class="pit-search-results" :key="query">
    <div class="pit-search-results__wrapper">
      <div class="pit-search-results__header">
        <h2><span class="pit-search-results__title"> Search results for </span><span
            class="pit-search-results__result">"{{ query }}"</span></h2>
      </div>
      <div class="pit-search-results__sorting">
        <span>Sort by:</span>
        <div class="pit-search-results__btns-block">
          <div class="button pit-search-results__btn" :class="{ 'active': sortProp === 'date' }"
            @click="sortProp = 'date'">Date</div>
          <div class="button pit-search-results__btn" :class="{ 'active': sortProp === 'distance' }"
            @click="sortProp = 'distance'">Distance</div>
          <div class="button pit-search-results__btn" :class="{ 'active': sortProp === 'place' }"
            @click="sortProp = 'place'">Venue</div>
        </div>
      </div>
      <div class="pit-search-results__blocks">
        <component-card-horizontal v-for="event in sortedResults.slice(start, end)" :event="event" :key="event.id"
          @click="router.push('/event/' + event.id)">Buy tickets</component-card-horizontal>
      </div>
      <div class="pit-search-results__pagination"><vue-awesome-paginate v-if="sortedResults.length"
          :class="{ 'back-disabled': current == 1, 'next-disabled': current >= sortedResults.length / 8 }"
          :total-items="sortedResults.length" :items-per-page="8" v-model="current" :on-click="onClickHandler" /></div>
    </div>
    <a class="pit-search-results__top" @click="scrollToTop">
      <img src="../assets/img/footer/footer-icon-to-top.svg" alt="">
    </a>
  </section>
</template>