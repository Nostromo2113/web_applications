<template lang="">
  <div class="header container">
    <nav-bar v-if="shouldRenderComponent" />
    <div class="header__inner">
      <div class="header__top">
        <the-logo @click="$router.push('/')" />
        <q-btn
          v-if="!shouldRenderComponent"
          flat
          @click="$emit('openDrawer')"
          round
          size="20px"
          icon="menu"
        ></q-btn>
      </div>
      <div class="header__control">
        <div style="width: 100%">
          <main-search-input :placeholderText="'Искать игры'" />
          <q-menu
            fit
            max-height="800px"
            bordered
            anchor="top middle"
            self="top middle"
            class="text-light rounded-borders no-box-shadow"
          >
            <q-list class="bg-dark-alt text-light rounded-borders search-menu">
              <q-input
                v-model="searchInput"
                @update:model-value="getSearchProducts(searchInput)"
                dark
                :dense="innerWidth < 768"
                autofocus
                placeholder="Искать игры"
                color="accent"
                style="padding: 10px 25px; font-size: 18px"
              >
                <template v-slot:prepend>
                  <q-icon name="search" color="light"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    class="cursor-pointer"
                    color="light"
                  ></q-icon>
                </template>
              </q-input>
              <q-card-section color="teal rounded-borders">
                <TransitionGroup
                  class="header__control__input-result"
                  name="list"
                  tag="ul"
                >
                  <product-line
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    @click="
                      $router.push({
                        name: 'dynamicGame',
                        params: {
                          id: product.id,
                        },
                      })
                    "
                    class="header__control__input-result__product-line"
                  />
                </TransitionGroup>
              </q-card-section>
            </q-list>
          </q-menu>
        </div>
        <div class="header__icon-box">
          <q-icon
            name="favorite_border"
            class="header__icon"
            size="26px"
          ></q-icon>
          <q-icon
            name="shopping_cart"
            class="header__icon"
            size="26px"
          ></q-icon>
          <p v-if="innerWidth > 1000">Nickname</p>
          <q-avatar v-if="innerWidth > 1000">
            <img
              src="https://sun9-1.userapi.com/s/v1/if2/7u3KuqJjS2NR6b6yIS9cq9JENPSBeNbxaXBFVkl8grdKgeSLsNw43XrUhiJHNd_4xIIUi0V2KFa_x1XQ6mu5DBk-.jpg?quality=96&crop=213,0,405,405&as=50x50,100x100,200x200,400x400&ava=1&u=dGdJeRP2n4qqL48wUgcvtG8kasqJFhAOZPtbpq2DIho&cs=200x200"
            />
          </q-avatar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { UseInterfaceStore } from "src/stores/interface";
import { UseProductsStore } from "src/stores/products";
export default {
  props: {
    shouldRenderComponent: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    const innerWidth = ref(computed(() => UseInterfaceStore().innerWidth));
    const productsStore = UseProductsStore();
    const products = ref(productsStore.productsFiltred());
    const searchInput = ref("");

    const getSearchProducts = (value) => {
      if (searchInput.value == "") {
        products.value = [];
      }
      products.value = productsStore.productsFiltred(value);
    };
    return {
      label2: ref("Also click me"),
      searchList: ref(false),
      innerWidth,
      products,
      searchInput,
      getSearchProducts,
    };
  },
};
</script>

<style scoped lang="scss">
//$
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-dark);
  padding-block: 10px;
  border-bottom: 1px solid var(--color-accent-alt);

  &__top {
    display: flex;
    justify-content: space-between;
    @include tablet {
      width: 100%;
    }
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
    width: 100%;
    padding-block: 20px;
    @include tablet {
      flex-direction: column;
      row-gap: 20px;
    }
  }

  &__nav-bar {
    margin: 0 auto;
  }

  &__control {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    column-gap: 30px;
    @include tablet {
      column-gap: 15px;
    }

    &__input-result {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 822px;
      padding: 0;
      overflow-x: hidden;
      padding-top: 2px;
      &__product-line {
        padding: 15px 10px;

        &:not(:last-child) {
          border-bottom: 1px solid var(--color-gray);
        }
        cursor: pointer;
        @include hover {
          background-color: var(--color-accent-alt);
          border-radius: var(--border-radius);
        }
      }
    }
  }

  &__icon-box {
    display: flex;
    align-items: center;
    column-gap: 25px;

    @include tablet {
      width: auto;
    }
  }

  &__icon {
    transition-duration: var(--transition-duration);
    cursor: pointer;

    @include hover {
      color: var(--color-accent);
    }
  }
}

.search-menu {
  width: inherit;

  @include mobile {
    width: 100vw;
  }
}
</style>
