<template lang="">
  <div class="catalog container">
    <filter-panel
      v-if="width > 1000"
      class="catalog__filter-panel"
      @getFilteredProducts="getFilteredProducts"
    />
    <q-dialog
      v-model="dialogFilter"
      :position="positionFilter"
      :backdrop-filter="'blur(4px)'"
      maximized
    >
      <filter-panel
        @closeFilterDialog="dialogFilter = false"
        filterDialog
        @getFilteredProducts="getFilteredProducts"
      />
    </q-dialog>
    <div class="search-result">
      <div class="search-result__buttons-box">
        <q-btn
          v-if="width < 1000"
          icon="filter_alt"
          color="dark-alt"
          @click="dialogFilter = !dialogFilter"
        ></q-btn>
        <q-select
          standout="bg-accent-alt text-dark"
          bg-color="dark-alt"
          dense
          dark
          v-model="select"
          :options="options"
          label="С чего начать?"
          style="width: 200px"
          :popup-content-style="{
            background: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'var(--color-accent-alt)',
            boxShadow: 'none',
            color: 'var(--color-accent)',
          }"
        >
          <template v-slot:append>
            <q-icon
              v-if="select !== null"
              class="cursor-pointer"
              name="clear"
              @click.stop.prevent="select = null"
            ></q-icon>
          </template>
        </q-select>
      </div>
      <TransitionGroup class="search-result__square" name="list" tag="ul">
        <product-card
          v-for="product in productsFiltred"
          :key="product.id"
          :product="product"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { UseProductsStore } from "src/stores/products";
import { UseInterfaceStore } from "src/stores/interface";
export default {
  setup() {
    const width = computed(() => UseInterfaceStore().innerWidth);
    const dialogFilter = ref(false);
    const positionFilter = ref("left");

    const productsStore = UseProductsStore();
    const productsFiltred = ref([]);

    const getFilteredProducts = (searchInput, standard, checkbox) => {
      productsFiltred.value = productsStore.productsFiltred(
        searchInput,
        standard,
        checkbox
      );
    };
    getFilteredProducts();

    return {
      width,
      dialogFilter,
      positionFilter,
      options: ["Популярные", "Новинки", "Дешевле", "Дороже"],
      select: ref(null),
      productsFiltred,
      getFilteredProducts,
    };
  },
};
</script>
<style scoped lang="scss">
.catalog {
  display: flex;
  column-gap: 20px;
  margin-bottom: 50px;
  padding-top: 40px;
  &__filter-panel {
    padding-right: 20px;

    border-right: 1px solid var(--color-gray);
  }
}

.search-result {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 20px;
  width: 100%;
  ul {
    list-style-type: none;
    padding: 0;
  }
  &__square {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 100%;
    @include desktop {
      grid-gap: 15px;
    }
    @include tablet {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 12px;
    }
    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  }

  &__buttons-box {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    @include tablet {
      justify-content: space-between;
    }
  }
}
</style>

<!-- transition-group -->

