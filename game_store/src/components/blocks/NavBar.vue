<template lang="">
  <nav class="nav">
    <ul class="nav__list" :class="{ drawer: drawer }">
      <li class="catalog-btn">
        <default-btn color="white" black @click="$router.push('/catalog')"
          >Каталог</default-btn
        >
      </li>
      <li class="nav__item">
        <default-btn color="white" @click="$router.push('/')"
          >В начало</default-btn
        >
      </li>
      <li class="nav__item">
        <default-btn color="white" @click="$router.push('/reviews')"
          >Отзывы</default-btn
        >
      </li>
      <li class="nav__item">
        <default-btn color="white" @click="$router.push('/guarantees')"
          >Гарантии</default-btn
        >
      </li>
      <li class="nav__item">
        <default-btn color="white">Как купить</default-btn>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",

  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  max-width: 1100px;
  width: 100%;
  height: auto;
  padding-block: 10px;
  margin: 0 auto;

  &__list {
    display: flex;
    justify-content: space-around;
    color: var(--color-light);
    font-size: 20px;
    padding: 0;
  }
}
.nav__item {
  position: relative;
  padding: 5px;
  color: var(--color-accent);
}
.nav__item::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 100%;
  translate: -50%;
  width: 0;
  height: 2px;
  border-radius: 5px;
  background-color: var(--color-accent);
  transition: width 0.3s ease, left 0.3s ease;
  transform: translate(-50%, -50%);
}

.nav__item:hover::before {
  width: 100%;
}

.catalog-btn {
  box-shadow: 0px 0px 0px 2px var(--color-accent);
  border-radius: var(--border-radius);
  padding: 5px;
  color: var(--color-accent);
  @include hover {
    background-color: var(--color-accent-alt);
    color: var(--color-dark);
  }
}

.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  padding-inline: 20px;
  font-size: 23px;
}
</style>
