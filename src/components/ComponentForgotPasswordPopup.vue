<script setup>
import { ref } from 'vue'
import { onClickOutside } from 'vue-click-outside-of'
const props = defineProps(['isForgotPasswordPopupOpen'])
const emit = defineEmits(['close'])
onClickOutside(() => {
    let element = document.getElementById('app')
    element.classList.remove('shadow-covered')
    emit('close')
})
const onClose = () => {
    let element = document.getElementById('app')
    element.classList.remove('shadow-covered')
    emit('close')
}
const email = ref('')
const emailErr = ref('')
const sended = ref(false)

const onSend = () =>{
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
        emailErr.value = 'Please enter a valid email address'
    }
    if(!emailErr.value.length){
        sended.value = true
    }  
}
</script>

<template>
    <Teleport to="body" v-if="isForgotPasswordPopupOpen">
        <Transition appear>
            <div class="pit-popup header-popup">
                <div class="pit-popup__wrapper">
                    <div class="pit-popup__inner">
                        <div v-if="!sended">
                            <div class="pit-popup__input-container">
                                <input type="text" v-model="email" class="custom-input"
                                    placeholder="Email address" @input="emailErr = ''">
                                <span v-if="emailErr.length" class="forgot-password-error" v-html="emailErr"></span>
                            </div>
                            <div @click="onSend" class="pit-popup__btn">
                                <span>Send</span>
                            </div>
                        </div>
                        <div v-else>
                            <h2 class="pit-popup__title">Your password was sent to your email</h2>
                            <button class="pit-popup__btn" @click="onClose">
                                <span>OK</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
