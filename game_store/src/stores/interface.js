import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const UseInterfaceStore = defineStore("interfaceStore", () => {
  const innerWidth = ref(window.innerWidth);

  const updateInnerWidth = (newValue) => {
    innerWidth.value = newValue;
  };

  return {
    innerWidth,
    updateInnerWidth,
  };
});
