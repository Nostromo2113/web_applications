<template>
  <div class="card">
    <div
      class="card__item"
      v-for="card in cards.cards"
      :key="card.url"
      :style="{ backgroundImage: 'url(' + card.url + ')' }"
    >
      <div class="card__content">
        <p class="h3 card__content__title">{{ card.title }}</p>
        <p v-if="innerWidth > 1000" class="h5 card__content__discription">
          {{ card.discription }}
        </p>
        <div class="card__content__price">
          <p class="h3">{{ card.price }} ₽</p>
          <q-btn class="top-games__item__btn" color="accent-alt">
            <q-icon size="25px" name="shopping_cart"></q-icon>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { UseInterfaceStore } from "src/stores/interface";
import { ref, computed } from "vue";
export default {
  name: "slider-card",
  props: {
    cards: {
      type: Object,
    },
  },
  setup() {
    return {
      innerWidth: ref(computed(() => UseInterfaceStore().innerWidth)),
    };
  },
};
</script>
<style scoped lang="scss">
.card {
  width: 100%;
  display: flex;
  column-gap: 10px;
  &__item {
    display: flex;
    align-items: flex-end;
    width: 50%;
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: var(--color-light);
    text-align: center;

    @include tablet {
      padding: 10px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    height: 180px;
    user-select: none;

    @include tablet {
      height: auto;
      width: 100%;
    }
    &__title {
      color: var(--color-light);
      box-shadow: 0px 0px 1px 2px var(--color-accent);
      display: flex;
      text-align: center;
      padding: 10px 15px;
      border-radius: var(--border-radius-small);
      font-weight: bold;
      cursor: pointer;
      @include tablet {
        padding: 8px;
      }
      @include mobile {
        padding: 5px;
      }
      @include hover {
        background-color: var(--color-accent-alt);
      }
      transition-duration: var(--transition-duration);
    }
    &__discription {
      text-align: left;
    }
    &__price {
      display: flex;
      align-items: center;
      column-gap: 30px;
      padding-top: 10px;
      @include mobile {
        width: 100%;
        justify-content: space-between;
        padding-top: 0;
      }
    }
  }
}
</style>
