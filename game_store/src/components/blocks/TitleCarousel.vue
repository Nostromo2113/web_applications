<template lang="">
  <q-carousel
    :padding="false"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    infinite
    control-color="accent"
    arrows
    :height="sliderHeight + 'px'"
    class="bg-dark shadow-2 rounded-borders no-padding section section-first"
  >
    <q-carousel-slide :name="1" class="column no-wrap overflow">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <slider-card
          style="width: 100%; height: 100%"
          v-for="kit in sliderCards.slice(0, 1)"
          :key="kit.id"
          :cards="kit"
        ></slider-card>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="2" class="column no-wrap">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <slider-card
          style="width: 100%; height: 100%"
          v-for="kit in sliderCards.slice(1, 2)"
          :key="kit.id"
          :cards="kit"
        ></slider-card>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="3" class="column no-wrap">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <slider-card
          style="width: 100%; height: 100%"
          v-for="kit in sliderCards.slice(2, 3)"
          :key="kit.id"
          :cards="kit"
        ></slider-card>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="4" class="column no-wrap">
      <div
        class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
      >
        <slider-card
          style="width: 100%; height: 100%"
          v-for="kit in sliderCards.slice(3, 4)"
          :key="kit.id"
          :cards="kit"
        ></slider-card>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import { ref, computed, watch } from "vue";
import { UseInterfaceStore } from "src/stores/interface";
export default {
  props: {
    sliderCards: {
      type: Array,
    },
  },
  setup(props) {
    const innerWidth = ref(computed(() => UseInterfaceStore().innerWidth));
    const sliderHeight = ref(550);

    const handleResize = (width) => {
      if (width > 1024) {
        sliderHeight.value = 500;
      }
      if (width < 1024 && width > 768) {
        sliderHeight.value = 460;
      }
      if (width < 768 && width > 481) {
        sliderHeight.value = 380;
      }
      if (width < 481) {
        sliderHeight.value = 295;
      }
    };

    watch(
      innerWidth,
      (newValue, oldValue) => {
        handleResize(newValue);
      },
      { immediate: true }
    );

    return {
      sliderHeight,
      innerWidth,
      slide: ref(1),
    };
  },
};
</script>
<style lang=""></style>
