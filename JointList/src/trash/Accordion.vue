<template>
    <div>
        <button @click="toggleAccordion">{{ buttonText }}</button>
        <div :class="{
            'accordion-close': !isOpen,
            'accordion-open': isOpen,
        }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'accordion',
    data() {
        return {
            isOpen: false
        };
    },
    computed: {
        buttonText() {
            return this.isOpen ? 'Скрыть' : 'Показать';
        }
    },
    methods: {
        toggleAccordion() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>

<style>
.accordion-close {
max-height: 0;
overflow: hidden;
transition: max-height 0.5s cubic-bezier(0.77, 0, 0.18, 1); /* Используйте cubic-bezier для более плавной анимации */
}

.accordion-open {
max-height: 500px; /* Укажите здесь максимальную высоту */
transition: max-height 0.5s cubic-bezier(0.77, 0, 0.18, 1); /* Используйте cubic-bezier для более плавной анимации */
}
</style>