<template>
  <q-page>
    <title-carousel :sliderCards="sliderCards" class="section-first" />
    <the-advantages class="section container" />
    <p class="designation h3 container">ТОП 4</p>
    <top-games
      class="top-games section container"
      :topGames="topGames"
    ></top-games>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { UseProductsStore } from "src/stores/products";
export default {
  setup() {
    const productsStore = UseProductsStore();
    const sliderCards = [
      {
        id: 1,
        cards: [
          {
            url: "/SliderImages/1.jpg",
            title: "PlayerUnknown's Battlegrounds",
            discription:
              "Шутер жанра «Королевская битва», в котором 100 игроков сражаются друг с другом. Стань последним уцелевшим игроком",
            price: 2600,
          },
          {
            url: "/SliderImages/2.jpg",
            title: "Star Wars: Knights of the Old Republic",
            discription:
              "Легендарная игра, полюбившаяся многим людям, а для некоторых она стала эталоном жанра.",
            price: 300,
          },
        ],
      },
      {
        id: 2,
        cards: [
          {
            url: "/SliderImages/3.jpg",
            title: "Battlefield 2042",
            discription:
              "Шутер от первого лица, в котором серия возвращается к легендарным масштабным сражениям.",
            price: 3500,
          },
          {
            url: "/SliderImages/4.jpg",
            title: "Mad Max",
            discription:
              "Захватывающее приключение, где игроки борются за выживание в постапокалиптическом мире, управляя транспортными средствами и сражаясь с врагами.",
            price: 1900,
          },
        ],
      },
      {
        id: 3,
        cards: [
          {
            url: "/SliderImages/5.jpg",
            title: "Night Ninja",
            discription:
              "Древний орден ниндзя в смятении, а мир ниндзя жаждет настоящего лидера, шиноби, который сможет объединить разрозненные кланы.",
            price: 900,
          },
          {
            url: "/SliderImages/6.jpg",
            title: "Daiblo 4",
            discription:
              "Познакомьтесь с новой угрозой, погребенной под толщей песков Кеджистана: инструмент, созданный с благими намерениями, попал в руки демонического зла.",
            price: 4900,
          },
        ],
      },
      {
        id: 4,
        cards: [
          {
            url: "/SliderImages/7.jpg",
            title: "Horizon 2",
            discription:
              "Мир на краю гибели. Свирепые бури и смертельные болезни обрушились на разрозненные остатки человеческих племен, а новые устрашающие машины бродят по границам их земель.",
            price: 3800,
          },
          {
            url: "/SliderImages/8.jpg",
            title: "Mass Effect Saga",
            discription:
              "Фантастическая сага снова ждет вас. Легендарное издание The Mass Effect™ содержит весь контент и около 40 загружаемых материалов из ставших классикой игр Mass Effect.",
            price: 2490,
          },
        ],
      },
    ];
    const topGames = ref(computed(() => productsStore.productsTop()));
    console.log(topGames.value);
    return {
      sliderCards,
      topGames,
    };
  },
};
</script>

<style scoped lang="scss">
.section {
  --margin: 90px;
  @include tablet {
    --margin: 60px;
  }
  @include mobile {
    --margin: 35px;
  }
  margin-bottom: var(--margin);
}
.section-first {
  margin-top: var(--margin);
}

.top-games {
  padding-top: 20px;
  border-top: 1px solid var(--color-gray);
}

.designation {
  color: var(--color-accent);
  font-weight: bold;
}
</style>
