<script setup>
const props = defineProps(['event', 'fromSearch'])
const { event, fromSearch } = props

</script>

<template>
  <div class="pit-card-horizontal-min__outer">
    <div class="pit-card-horizontal-min__inner">
      <div class="pit-card__imgs">
        <img :src="'img/cards/' + event.src" alt="" class="pit-card__img-main" />
        <img v-if="!fromSearch" class="pit-card__img-play" src="@/assets/img/cards/icon-play-small.svg" alt="" />
      </div>
      <div class="pit-card__text-block">
          <h2 class="pit-card__title">{{ event.title }}</h2>
         <span class="pit-card__date"><span v-if="!fromSearch">{{ event.shortDay }},</span> {{ event.dayMonth }} at {{ event.time }}</span>
          <span class="pit-card__place">{{ event.place }}</span>
      </div>
    </div>
  </div>
</template>

