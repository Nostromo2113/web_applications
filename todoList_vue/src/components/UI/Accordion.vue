<template>
    <div class="accordion" @click="toggleAccordion">
        <default-btn>Accordion</default-btn>
    </div>
    <div class="content" :style="{ maxHeight: contentHeight + 'px' }" ref="content">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'accordion',
    data() {
        return {
            contentHeight: 0,
            isOpen: false,
        };
    },
    methods: {
        toggleAccordion() {
            this.isOpen = !this.isOpen;
            this.contentHeight = this.isOpen ? this.$refs.content.scrollHeight : 0;
        },
    },
};
</script>

<style scoped>
.accordion {
  border: 2px dashed #ccc;
  padding: 20px;
  cursor: pointer;
  position: relative;
}

.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.expanded {
  position: absolute;
  z-index: 1;
  background-color: #fff;
}
</style>