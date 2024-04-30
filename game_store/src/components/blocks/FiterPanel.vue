<template lang="">
  <div class="filter-panel" :class="{ dialog: filterDialog }">
    <div class="filter-panel__header">
      <p>Каталог</p>
      <default-btn v-if="filterDialog" @click="$emit('closeFilterDialog')"
        >Закрыть</default-btn
      >
    </div>
    <q-input
      v-model="filterInput"
      standout="bg-accent-alt text-white"
      bg-color="dark-alt"
      label-color="light"
      label="Ищем"
      style="width: 100%"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="filterInput = ''"
          class="cursor-pointer"
        ></q-icon> </template
    ></q-input>
    <div class="filter-panel__range">
      <div class="filter-panel__range__price">
        <p class="filter-panel__section-title">
          Цена (₽): от <strong>{{ standard.min }}</strong> до
          <strong>{{ standard.max }}</strong>
        </p>
      </div>
      <q-range
        @change="console.log('range')"
        v-model="standard"
        :min="0"
        :max="10000"
        color="accent"
        track-color="dark-alt"
      ></q-range>
    </div>

    <div class="filter-panel__checkboxes">
      <p class="filter-panel__section-title">Жанр</p>
      <q-checkbox
        dark
        color="accent"
        label="Шутер"
        v-model="checkbox.shooter.boolean"
      />
      <q-checkbox
        dark
        label="Приключение"
        v-model="checkbox.adventure.boolean"
        color="accent"
      />
      <q-checkbox
        dark
        label="Стратегия"
        v-model="checkbox.strategy.boolean"
        color="accent"
      />
      <q-checkbox
        dark
        label="Спорт"
        v-model="checkbox.sport.boolean"
        color="accent"
      />
      <q-checkbox
        dark
        v-model="checkbox.online.boolean"
        label="Онлайн"
        color="accent"
      />
    </div>
    <div class="filter-panel__toggle-box">
      <q-toggle
        @update:model-value="console.log('toggle', toggle.discounts)"
        v-model="toggle.discounts"
        color="accent"
        label="Только скидки"
      ></q-toggle>

      <q-toggle
        v-model="toggle.novelty"
        color="accent"
        label="Новинки"
      ></q-toggle>

      <q-toggle
        v-model="toggle.popular"
        color="accent"
        label="Популярные"
      ></q-toggle>
    </div>
    <div class="filter-panel__buttons">
      <q-btn
        outline
        rounded
        color="accent"
        label="Сбросить"
        @click="resetFilter"
      ></q-btn>
      <q-btn
        @click="
          $emit('getFilteredProducts', filterInput, standard, checkbox),
            $emit('closeFilterDialog')
        "
        outline
        rounded
        color="accent"
        label="Искать"
      ></q-btn>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    filterDialog: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const filterInput = ref("");

    const checkbox = ref({
      shooter: {
        boolean: false,
        genre: "shooter",
      },
      adventure: {
        boolean: false,
        genre: "adventure",
      },
      strategy: {
        boolean: false,
        genre: "strategy",
      },
      online: {
        boolean: false,
        genre: "online",
      },
      sport: {
        boolean: false,
        genre: "sport",
      },
    });
    const standard = ref({
      min: 0,
      max: 10000,
    });
    const toggle = ref({
      discounts: false,
      novelty: false,
      popular: false,
    });

    const resetFilter = () => {
      filterInput.value = "";

      toggle.value.discounts = false;
      toggle.value.novelty = false;
      toggle.value.popular = false;

      standard.value.min = 0;
      standard.value.max = 10000;

      checkbox.value.shooter.boolean = false;
      checkbox.value.adventure.boolean = false;
      checkbox.value.strategy.boolean = false;
      checkbox.value.online.boolean = false;
      checkbox.value.sport.boolean = false;
    };

    return {
      filterInput,
      checkbox,
      standard,
      toggle,
      options: ["Популярные", "Новинки", "Дешевле", "Дороже"],
      select: ref(null),
      resetFilter,
    };
  },
};
</script>
<style scoped lang="scss">
.filter-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  background-color: var(--color-dark);
  padding: 15px;
  @include tablet {
    width: 100vw;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__range {
    width: 100%;
    &__price {
      display: flex;
      column-gap: 5px;
    }
  }
  &__checkboxes {
    display: grid;
  }

  &__toggle-box {
    display: flex;
    flex-direction: column;
  }

  &__buttons {
    display: flex;
    column-gap: 10px;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
