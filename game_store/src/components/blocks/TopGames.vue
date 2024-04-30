<template lang="">
  <section class="top-games">
    <ul class="top-games__list">
      <li v-for="item in topGames" :key="item.id" class="top-games__item">
        <div
          class="top-games__item__img"
          :style="{ backgroundImage: 'url(' + item.cards.url + ')' }"
        >
          <q-btn class="top-games__item__btn" color="accent-alt">
            <q-icon size="25px" name="shopping_cart"></q-icon>
          </q-btn>
        </div>
        <div class="top-games__card-info">
          <default-btn
            ><p>{{ item.cards.title }}</p>
          </default-btn>
          <p>{{ item.cards.price }} ₽</p>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    topGames: {
      type: Array,
    },
  },
};
</script>
<style scoped lang="scss">
.top-games {
  display: flex;
  flex-direction: column;
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 100%;
    padding: 0;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__item {
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
      height: 450px;
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
  }
  &__card-info {
    font-weight: bold;
    padding: 12px 15px;
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
    box-shadow: 0px -16px 32px 19px var(--color-dark);
    overflow: hidden;
  }
}
</style>
