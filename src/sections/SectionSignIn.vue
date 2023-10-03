<script setup>
import ComponentForgotPasswordPopup from '@/components/ComponentForgotPasswordPopup.vue'
import { useAuthStore } from '@/store/auth.js'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const emit = defineEmits(['setAuthorized'])
const isForgotPasswordPopupOpen = ref(false)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const email = ref('')
const password = ref('')
const showMode = ref(false)
const signinError = ref('')
const passwordFieldType = computed(() => showMode.value ? 'text' : 'password')
const errEmail = ref('')
const errPassword = ref('')

const onSubmitSinin = async () => {
  if (!password.value.length) {
    errPassword.value = 'Please enter a password'
  }
  if (!email.value.length || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
    errEmail.value = 'Please enter a valid email address'
  }
  if (!errEmail.value.length && !errPassword.value.length) {
    try {
      await authStore.login(email.value, password.value)

      if (user.value.token) {
        emit('setAuthorized', true)
      } else {
        signinError.value = 'Username or password is incorrect'
      }
    } catch (error) {
      alert(error)
    }
  }
}
const onOpenPopup = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isForgotPasswordPopupOpen.value = true
  let element = document.getElementById('app')
  element.classList.add('shadow-covered')
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && route.path=== '/signin') {
      onSubmitSinin()
    }
  })

</script>

<template>
  <section class="pit-auth">
    <div class="pit-auth__wrapper">
      <h2 class="pit-auth__title">Sign in</h2>
      <form @submit="onSubmitSinin">
        <div class="pit-auth__input-container pit-auth__input-container--email">
          <input type="text" v-model="email" class="custom-input pit-auth__input" placeholder="Email"
            @input="errEmail = ''">
          <span v-if="errEmail" class="error" v-html="errEmail"></span>
        </div>
        <div class="pit-auth__input-container pit-auth__input-container--password">
          <img v-if="!showMode" src="@/assets/img/login/login-icon.svg" alt="" class="pit-auth__icon"
            @click="showMode = true" />
          <span v-else @click="showMode = false"><font-awesome-icon :icon="['far', 'eye']" /> </span>
          <input :type="passwordFieldType" v-model="password" class="custom-input pit-auth__input"
            placeholder="Password" @input="errPassword = ''">
          <span v-if="errPassword.length" class="error" v-html="errPassword"></span>
          <span v-if="signinError.length" class="error" v-html="signinError"></span>
        </div>
        <div  class="pit-auth__btn" @click="onSubmitSinin">Sign in</div>
      </form>

      <div class="pit-auth__text-container pit-auth__text-container--forgot">
        <span class="pit-auth__link pit-auth__link--forgot" @click="onOpenPopup">Forgot your password?</span>
      </div>
      <div class="pit-auth__text-container pit-auth__text-container--registration">
        <p class="pit-auth__text pit-auth__text--registration">Not registred yet? <router-link to="/registration"><span href=""
              class="pit-auth__link">Sign up here</span></router-link></p>
      </div>
      <router-link to="/"><button class="pit-auth__btn-plain">Continue as a Guest</button></router-link>
      <div class="pit-auth__text-container pit-auth__text-container--info">
        <p class="pit-auth__text">and create an account as part</p>
        <p class="pit-auth__text">of the checkout process.</p>
      </div>
    </div>
    <ComponentForgotPasswordPopup :is-forgot-password-popup-open="isForgotPasswordPopupOpen"
      :key="isForgotPasswordPopupOpen" @close="isForgotPasswordPopupOpen = false" />
  </section>
</template>