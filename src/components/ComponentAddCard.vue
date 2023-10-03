<script setup>
import Tooltip from './Tooltip.vue'
const props = defineProps(['number', 'holder', 'expire', 'cvc', 'numberErr', 'numberValidErr', 'holderErr', 'expireErr', 'expireValidErr','cvcErr', 'cvcValidErr'])
const emit = defineEmits(['update:number', 'update:holder', 'update:expire', 'update:cvc', 'update:numberErr','update:numberValidErr', 'update:holderErr', 'update:expireErr', 'update:expireValidErr','update:cvcErr','update:cvcValidErr'])


</script>
<template>
    <div class="input-container">
        <img src="/src/assets/img/payment/maestro.svg" alt="" class="input__icon" />
        <input type="text" ref="inputNumber" :value="number"  @input="$emit('update:number', $event.target.value)"
            v-mask="'#### #### #### ####'" class="custom-input" placeholder="CARD NUMBER">
            <span v-if="numberErr && !props.number.length"  class="error" v-html="'Please enter card number'"></span>
            <span v-if="numberValidErr && props.number.length <16" class="error" v-html="'Please enter valid card number'"></span>
  
        </div>
    <div class="input-container">
        <input type="text" :value="holder" @input="$emit('update:holder', $event.target.value);$emit('update:holderErr', '')"
            class="custom-input" placeholder="CARDHOLDER NAME">
            <span v-if="holderErr" class="error" v-html="'Please enter holder name'"></span>
    </div>
    <div class="pit-paycard__inputs-couple--underlined">
        <div class="input-container">
            <input type="text" :value="expire"
                @input="$emit('update:expire', $event.target.value); $emit('update:expireErr', ''); $emit('update:expireValidErr', '')" v-mask="'##/##'"
                class="custom-input" placeholder="EXPIRY DATE">
            <span v-if="expireErr" class="error" v-html="'enter expire date'"></span>
            <span v-if="expireValidErr" class="error" v-html="'Please enter a valid expire date'"></span>
        </div>
        <div class="input-container">
            <Tooltip  :position="right" :tooltipText="'custom text'">
                <img src="@/assets/img/payment/help.svg" alt="" class="input__icon input__icon-help" />
            </Tooltip>
            <input v-mask="'###'" :value="cvc"
                @input="$emit('update:cvc', $event.target.value); errCvc = '';$emit('update:cvcErr', ''); $emit('update:cvcValidErr', '')" :type="cvcType"
                class="custom-input" placeholder="CVC" @click="cvcType = 'text'" @blur="cvcType = 'password'" />
            <span v-if="cvcErr" class="error" v-html="'Please enter cvc'"></span>
            <span v-if="cvcValidErr" class="error" v-html="'Please enter a valid cvc'"></span>
        </div>
    </div>
</template>