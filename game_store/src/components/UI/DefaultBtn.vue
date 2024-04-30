<template>
  <div>
    <button
      @click="buttonClicked()"
      class="default-btn"
      :class="{ black: black }"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: "default-btn",

  props: {
    black: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    buttonClicked() {
      this.$emit("button-clicked");
    },
  },
};
</script>
<style lang="scss" scoped>
.default-btn {
  @include reset-btn;
  transition-duration: var(--transition-duration);
  &:hover {
    color: var(--color-accent);
  }
}

.black {
  color: var--(--color-light);
  &:hover {
    color: black;
  }
}
</style>
