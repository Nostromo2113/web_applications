<template>
    <input 
        :value="modelValue"
        @input="updateInput" 
        :class="{
            'input':true,
            'input-redaction': redactionStyle
    }"
        :placeholder=placeholderText 
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
        redactionStyle: {
            type: Boolean,
            default: false,
        },
        placeholderText: {
            type: String,
        }
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

<style lang="scss" >
.input,
.input-redaction {
    width: 100%;
    padding: 12px 15px;
    border-radius: 10px;
    transition: 0.1s ease-in;
    font-family: monospace;
}

.input {
    background: var(--interface-color);
    font-size: $font-size-big-normal;
}
::placeholder {
    color: $turquoise;
}
.input:focus {
    box-shadow: 0px 0px 2px 1px $turquoise;
}

.input-redaction {
    padding: 4px;
    border: none;
    box-shadow: none;
    background: none;
}

.input-redaction:focus {
    box-shadow: none;
}
</style>
