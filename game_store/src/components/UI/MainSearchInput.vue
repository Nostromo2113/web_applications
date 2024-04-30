<template>
  <div class="input">
    <div class="input__search-icon">
      <q-icon name="search" size="26px" />
    </div>
    <input
      :value="modelValue"
      @input="updateInput"
      :placeholder="placeholderText"
      type="text"
      class="input__field"
    />
  </div>
</template>

<script>
export default {
  name: "main-search-input",
  props: {
    modelValue: [String, Number],

    placeholderText: {
      type: String,
      default: "Placeholder",
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value.trim());
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  position: relative;
  width: 100%;
  height: auto;
  transition-duration: var(--transition-duration);
  &__field {
    outline: none;
    width: 100%;
    height: 66px;
    padding-inline: 25px;
    border-radius: var(--border-radius);
    background: var(--color-dark-alt);
    outline: none;
    transition-duration: inherit;
    border: none;
    font-size: 18px;
    color: var(--color-light);

    @include mobile {
      height: 45px;
    }

    &::placeholder {
      font-size: 18px;
      color: rgb(194, 198, 211);
    }
  }

  &__search-icon {
    color: rgb(194, 198, 211);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
    transition-duration: inherit;
    @include hover {
      color: var(--color-accent);
    }
  }
  .test {
    position: absolute;
  }
}
</style>
