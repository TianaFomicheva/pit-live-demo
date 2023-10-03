<script setup>
import { useAuthStore } from '@/store/auth.js'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const values = ref({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
})
const errFirstName = ref('')
const errLastName = ref('')
const errEmail = ref('')
const errMobile = ref('')
const subscribe = ref(true)

const onSubmit = async () => {
    if(!values.value.firstName.length){
        errFirstName.value = 'Please enter a first name'
    }
    if(!values.value.lastName.length){
        errLastName.value = 'Please enter a last name'
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.value.email))) {
        errEmail.value = 'Please enter a valid email address'
    }
    if (values.value.mobile.length && !values.value.mobile.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/)) {
        errMobile.value = 'Please enter a valid mobile number'
    }
    if (!errEmail.value.length && !errMobile.value.length) {
        try {
            await authStore.register(values)
            authStore.setUser(values)
            await router.push('/login')
        } catch (error) {
            alert(error)
        }
    }
}
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && route.path=== '/registration') {
      onSubmit()
    }
  })


</script>

<template>
    <section class="pit-auth">
        <form @submit="onSubmit">
            <div class="pit-auth__wrapper">
                <h2 class="pit-auth__title">Welcome back!</h2>
                <div class="pit-auth__text-container pit-auth__text-container--account">
                    <span class="pit-auth__text">Please take a moment set up your account.</span>
                </div>
                <div class="pit-auth__text-container pit-auth__text-container--contact">
                    <span class="pit-auth__text pit-auth__text--contact">Contact details</span>
                </div>
                <div class="pit-auth__input-container">
                    <input type="text" v-model="values.firstName" class="custom-input pit-auth__input"
                        placeholder="First name" @input="errFirstName = ''">
                        <span v-if="errFirstName.length" class="error" v-html="errFirstName"></span>
                </div>
                <div class="pit-auth__input-container">
                    <input type="text" v-model="values.lastName" class="custom-input pit-auth__input"
                        placeholder="Last name" @input="errLastName = ''">
                        <span v-if="errLastName.length" class="error" v-html="errLastName"></span>
                </div>
                <div class="pit-auth__input-container">
                    <input type="text" v-model="values.email" class="custom-input pit-auth__input"
                        placeholder="Email address" @input="errEmail = ''">
                    <span v-if="errEmail.length" class="error" v-html="errEmail"></span>
                </div>
                <div class="pit-auth__input-container">
                    <input type="text" v-model="values.mobile" class="custom-input pit-auth__input"
                        placeholder="Mobile number (optional)" @input="errMobile = ''">
                    <span v-if="errMobile.length" class="error" v-html="errMobile"></span>
                </div>
                <div class="pit-checkout__input-container pit-auth__subscribe">
                    <label class="custom-checkbox__label" for="subscribe">
                        <input type="checkbox" v-model="subscribe"  class="custom-checkbox" name="" id="subscribe" />
                        <span class="checkmark"></span><span class="pit-checkmark__text">Subscribe to our
                            newsletter</span></label>
                </div>
                <div @click="onSubmit" class="pit-auth__btn" >Continue</div>
                <div class="pit-auth__prompt-container pit-auth__prompt-container--info">
                    <p class="pit-auth__text pit-auth__text--account">Already have an account? <router-link to="/signin"><span
                                class="pit-auth__link">Log in here.</span></router-link></p>
                </div>
        </div>
    </form>
</section></template>