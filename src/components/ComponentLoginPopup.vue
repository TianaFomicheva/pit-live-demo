<script setup>
import { onClickOutside } from 'vue-click-outside-of'
import { useAuthStore } from '@/store/auth.js'
const authStore = useAuthStore()
const props = defineProps(['open'])
const emit = defineEmits(['close', 'on-logout'])
const { open } = props
const onClose = () =>{
    emit('close')
}
onClickOutside(() => {
    emit('close')
})

const onLogout = async () => {
    try {
        await authStore.logout()
        emit('on-logout')
        emit('close')
    } catch (error) {
        alert(error)
    }
}

</script>
<template>
    <Teleport to="#navigation" v-if="open" >
        <Transition appear>
            <div class="pit-header__btn-popup header-popup" >

                <div class="pit-header__inner">
                    <div class="pit-header__text-container">
                        <router-link to="/preferences"><span class="pit-header__text">Preferences</span></router-link>
                    </div>
                    <div class="pit-header__text-container pit-header__text-container--popup" @click="onLogout" >
                        <span class="pit-header__text" >Logout</span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
