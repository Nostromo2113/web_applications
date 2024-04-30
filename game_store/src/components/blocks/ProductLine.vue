<template lang="">
  <li class="product-line">
    <img
      class="product-line__img"
      :src="product.cards.url"
      :alt="product.cards.title"
      height="80px"
      width="140px"
    />
    <div class="product-line__info">
      <p class="product-line__title">{{ product.cards.title }}</p>
      <p class="product-line__price">{{ product.cards.price }} ₽</p>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
};
</script>
<style scoped lang="scss">
.product-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 30px;
  transition-duration: var(--transition-duration);
  &__img {
    border-radius: var(--border-radius);
    box-shadow: 0px 0px 3px 0px var(--color-accent-alt);
  }
  &__info {
    display: flex;
    width: 100%;
    column-gap: 20px;
    justify-content: space-between;
  }
}
</style>
