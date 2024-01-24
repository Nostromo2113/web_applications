<template>
    <input 
        :value="modelValue"
        @input="updateInput" 
        class="input"  
        :placeholder="placeholderDigit(
        this.placeholderText1, 
        this.placeholderText2, 
        this.placeholderText3, 
        this.placeholderText4, 
        this.is
        )" 
        type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
        placeholderText1: {
            default: 'Дефолтный текст',
            type: String,
        },
        placeholderText2: {
            default: 'Дефолтный текст',
            type: String,
        },
        placeholderText3: {
            default: 'Дефолтный текст',
            type: String,
        },
        placeholderText4: {
            default: 'Дефолтный текст',
            type: String,
        },
        is: {
            type: Number,
        },
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value.trim())
        },
        check() {
            console.log(this.placeholderText1)
            console.log(this.placeholderText2)
        },
        placeholderDigit(placeholderText1, placeholderText2, placeholderText3, placeholderText4, is) {
            if (is === 2) return placeholderText2
            if (is === 1) return placeholderText1
            if (is === 3) return placeholderText3
            if (is === 4) return placeholderText4
            else return 'Дефолтный текст'
        }
    }
}
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 10px;
    background: #323232;
    transition: 0.1s ease-in;
    font-size: $font-size-title;
    font-family: monospace;
}
.input:focus {
    box-shadow: 0px 0px 3px 1px orange;
}
</style>
