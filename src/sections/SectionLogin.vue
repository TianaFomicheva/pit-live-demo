<script setup>
import ComponentForgotPasswordPopup from '@/components/ComponentForgotPasswordPopup.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const emit = defineEmits(['set-authorized'])
const password = ref('')
const showMode = ref(false)
const errLogin = ref('')
const isForgotPasswordPopupOpen = ref(false)
const passwordFieldType = computed(() => showMode.value ? 'text' : 'password')
const onSubmitLogin = async () => {
  if(!user.value.email){
    errLogin.value = "Your email wasn't found. Have you been registred?"
  }
  if(!password.value.length){
    errLogin.value = "Please enter password"
  }
  if (!errLogin.value.length) {
    try {
      await authStore.login(user.value.email, password.value)
      emit('set-authorized', true)
    } catch (error) {
      alert(error)
    }
  } 
}
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter'&& route.path=== '/login') {
      onSubmitLogin()
    }
  })
</script>

<template>
  <section class="pit-auth">
    <div class="pit-auth__wrapper">
      <h2 class="pit-auth__title">Hi {{ user.firstName }},</h2>
      <span class="pit-auth__text">Enter your password to sign in</span>
      <div class="pit-auth__input-container">
        <img v-if="!showMode" src="@/assets/img/login/login-icon.svg" alt="" class="pit-auth__icon"
          @click="showMode = true" />
        <span v-else @click="showMode = false"><font-awesome-icon :icon="['far', 'eye']" /> </span>
        <input :type="passwordFieldType" v-model="password" class="custom-input pit-auth__input" placeholder="Password" @input="errLogin = ''">
        <span v-if="errLogin.length" class="login-error" v-html="errLogin"></span>
      </div>
      <div class="pit-auth__btn" @click="onSubmitLogin">Sign in</div>
      <span class="pit-auth__link" @click="isForgotPasswordPopupOpen = true">Forgot your password?</span>
    </div>
    <ComponentForgotPasswordPopup :is-forgot-password-popup-open="isForgotPasswordPopupOpen"
      :key="isForgotPasswordPopupOpen" @close="isForgotPasswordPopupOpen = false" />
  </section>
</template>