<script setup>
import ComponentLoginPopup from '@/components/ComponentLoginPopup.vue'
import ComponentCardHorizontalMin from '@/components/ComponentCardHorizontalMin.vue'
import { computed, ref, onMounted } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['events', 'isAuthorized'])
const emit = defineEmits(['close', 'setAuthorized'])
const { events, isAuthorized } = props
const showSearchMobile = ref(false)
const clickOutside = () => {
  search.value = ''
}
const open = ref(false)
const search = ref('')
const searchResults = computed(() => {
  if (search.value === '') {
    return []
  }
  return events.filter(event => {
    if (
      event.tag?.toLowerCase().includes(search.value.toLowerCase()) || event.place?.toLowerCase().includes(search.value.toLowerCase()) || event.title?.toLowerCase().includes(search.value.toLowerCase()) || event.town?.toLowerCase().includes(search.value.toLowerCase())

    ) {
      return event
    }
  })
})
const clearResults = () => {
  search.value = ''
}


  document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
      if (search.value.length) {
        router.push(`/results/${search.value}`)
        search.value = ''
      }
    }
  })



const toggleSearchMobile = () => {
    showSearchMobile.value = !showSearchMobile.value
    if (!showSearchMobile.value) {
      clearResults()
    }
}
const onLogout = async () => {
  emit('setAuthorized', false)

}

const scrollDown = () => {
    const scrollOptions = {
      top: document.body.scrollHeight || document.documentElement.scrollHeight,
      behavior: 'smooth',
    };
    window.scrollTo(scrollOptions);
}
const onOpenPopup = () => {
  open.value = true
}
</script>

<template>
  <header class="pit-header">
    <div class="pit-header__wrapper">
      <div class="pit-header__input-container" :class="{ 'mobile-shown': showSearchMobile }"
        v-on-click-outside="clickOutside">
        <img src="@/assets/img/icon-search.svg" alt="" class="icon" />
        <div v-if="search.length" class="svg-wrapper" @click="clearResults"><font-awesome-icon
            :icon="['fas', 'plus']" /> </div>
        <input type="text"  v-model="search" class="custom-input"
          placeholder="Search event, artist, venue or town…" />
        <div class="pit-header__input-autocomplete">
          <div class="pit-header__input-autocomplete-inner" v-if="searchResults.length">
            <div class="results-outer">
              <div v-for="event in searchResults" :key="event.id">
                <router-link :to="{ name: 'event', params: { id: event.id } }"
                  @click="search = ''"><component-card-horizontal-min :event="event" :from-search="true" /></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pit-header__logo">
        <router-link to="/"><img src="@/assets/img/logo.svg"
            alt="" /></router-link>
      </div>
      <nav class="pit-header__navigation" id="navigation">

        <router-link to="'/about'" class="pit-header__about"><span 
            class="pit-header__about-link">About us</span></router-link>

        <span class="pit-header__navigation-item" @click="scrollDown">Contact</span>

        <button class="pit-header__btn pit-header__btn-search-mobile" @click="toggleSearchMobile"></button>

        <div v-if="isAuthorized" id="logout" class="pit-header__btn-logout"
          @click="onOpenPopup" :key="isAuthorized">
          <a  >Logout</a>
        </div>

        <router-link  to="/signin">
          <div v-if="!isAuthorized" class="pit-header__btn-login" :key="isAuthorized">
            <a >Login</a>
          </div>
        </router-link>
      </nav>
  </div>
  <ComponentLoginPopup :open="open" :key="open" @close="open = false"
    @on-logout="onLogout" />
</header></template>