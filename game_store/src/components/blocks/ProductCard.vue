<template>
  <li class="card">
    <div
      class="card__img"
      :class="{ 'mini-img': mini }"
      :style="{ backgroundImage: 'url(' + product.cards.url + ')' }"
    >
      <q-btn class="card__btn" color="accent-alt" style="width: 40px" dense>
        <q-icon :size="iconSize" name="shopping_cart"></q-icon>
      </q-btn>
    </div>
    <div class="card-info">
      <p :class="{ 'mini-text': mini }">{{ product.cards.title }}</p>
      <p :class="{ 'mini-text': mini }">{{ product.cards.price }} ₽</p>
    </div>
  </li>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    product: {
      type: Object,
    },
    mini: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconSize = ref(props.mini ? "18px" : "25px");

    return {
      iconSize,
    };
  },
};
</script>
<style scoped lang="scss">
.card {
  padding: 0;
  border-radius: var(--border-radius);
  box-shadow: 0px 0px 3px 0px var(--color-accent-alt);
  background-color: var(--color-dark);
  overflow: hidden;
  cursor: pointer;
  @include hover {
    box-shadow: 0px 0px 1px 1px var(--color-accent);
  }

  &__img {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 300px;
    background-color: teal;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    padding: 10px;

    @include mobile {
      height: 300px;
    }
    @include mobile-s {
      height: 230px;
    }
  }
  &__btn {
    width: 100px;
  }

  &-info {
    font-weight: bold;
    padding: 12px 15px;
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
    box-shadow: 0px -16px 32px 19px var(--color-dark);
    overflow: hidden;
    @include mobile {
      font-size: 15px;
      padding: 7px;
    }
  }
}

.mini-text {
  font-size: 12px;
}
.mini-img {
  height: 200px;
}
</style>
