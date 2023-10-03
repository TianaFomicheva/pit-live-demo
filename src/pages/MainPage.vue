<script setup>
import SectionHeader from '@/sections/SectionHeader.vue'
import SectionFooter from '@/sections/SectionFooter.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useEventsStore } from '@/store/events.js'
import { useAuthStore } from '@/store/auth.js'
const route = useRoute()
const router = useRouter()
const storeEvents = useEventsStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { events } = storeToRefs(storeEvents)
const count = ref(0)
const isAuthorized = computed(() => user.value.token)
const setAuthorized = (state) => {
  console.log(2344)
  isAuthorized.value = state
  count.value++
  router.push('/')
}
onMounted(() => {
  storeEvents.loadEvents()
  count.value++})
</script>


<template>
  <section-header :events="events" :key="count" :is-authorized="isAuthorized" @set-authorized="setAuthorized"/>
  <router-view v-slot="{ Component }" @set-authorized="setAuthorized">

    <keep-alive>
    <component :is="Component" :events="events" :key="events && events.length +route.path +count" />
    </keep-alive>
  </router-view>
  <SectionFooter />
  
</template>


