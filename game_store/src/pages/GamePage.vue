<template lang="">
  <div
    class="game"
    :style="{
      backgroundImage: 'url(' + productRouter.cards.url + ')',
    }"
  >
    <h1>{{ productRouter.cards.title }}</h1>
    <p>Dynamic ID: {{ $route.params.id }}</p>
    <p></p>
  </div>
</template>
<script>
import { UseProductsStore } from "src/stores/products";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const productsStore = UseProductsStore();
    const route = useRoute();
    const productId = ref(parseInt(route.params.id));
    console.log(productsStore.products);

    const productRouter = ref(
      productsStore.products.find((product) => product.id === productId.value)
    );
    console.log(productRouter.value);

    return { productRouter };
  },
};
</script>
<style scoped lang="scss">
.game {
  width: 90%;
  height: 900px;
  margin: 20px auto;
  border-radius: var(--border-radius-large);
  padding: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @include mobile {
    height: 500px;
    border-radius: var(--border-radius);
  }
}
</style>
