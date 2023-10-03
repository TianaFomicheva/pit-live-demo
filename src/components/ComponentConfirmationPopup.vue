<script setup>
import { onClickOutside } from 'vue-click-outside-of'
const props = defineProps(['isConfirmationPopupOpen'])
const emit = defineEmits(['close', 'delete-account'])
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
const onDelete = () => {
    let element = document.getElementById('app')
    element.classList.remove('shadow-covered')
    emit('delete-account')
    emit('close')
}

</script>

<template>
    <Teleport to="body" v-if="isConfirmationPopupOpen">
        <Transition appear>
            <div class="pit-popup header-popup">
                <div class="pit-popup__wrapper">
                    <div class="pit-popup__inner">

                        <div>
                            <h2 class="pit-popup__title">Do you really want to delete your account?</h2>
                            <div class="pit-popup__btn-couple">
                                <button class="pit-popup__btn" @click="onClose">
                                    <span>Cancel</span>
                                </button>
                                <button class="pit-popup__btn-plain" @click="onDelete">
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
