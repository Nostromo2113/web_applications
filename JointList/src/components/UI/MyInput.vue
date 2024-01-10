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

<style scoped>




.input {
    width: 100%;
    position: relative;
    padding: 10px 15px;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 0px 1px 0px orange;
    background: rgb(62 61 61);
    transition: 0.1s ease-in;
}
.input:focus {
    box-shadow: 0px 0px 3px 2px orange;
}
</style>
