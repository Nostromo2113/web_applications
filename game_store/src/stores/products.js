import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const UseProductsStore = defineStore("productsStore", () => {
  const products = [
    {
      id: 1,
      discount: true,
      genre: "shooter online",
      cards: {
        url: "/SliderImages/1.jpg",
        title: "PlayerUnknown's Battlegrounds",
        discription:
          "Шутер жанра «Королевская битва», в котором 100 игроков сражаются друг с другом. Стань последним уцелевшим игроком",
        price: 2600,
      },
    },
    {
      id: 2,
      discount: false,
      genre: "adventure",
      cards: {
        url: "/SliderImages/2.jpg",
        title: "Star Wars: Knights of the Old Republic",
        discription:
          "Легендарная игра, полюбившаяся многим людям, а для некоторых она стала эталоном жанра.",
        price: 300,
      },
    },
    {
      id: 22,
      discount: false,
      genre: "adventure",
      cards: {
        url: "/SliderImages/2.jpg",
        title: "Star Wars: Knights of the Old Republic",
        discription:
          "Легендарная игра, полюбившаяся многим людям, а для некоторых она стала эталоном жанра.",
        price: 3000,
      },
    },
    {
      id: 3,
      discount: false,
      genre: "shooter online",
      cards: {
        url: "/SliderImages/3.jpg",
        title: "Battlefield 2042",
        discription:
          "Шутер от первого лица, в котором серия возвращается к легендарным масштабным сражениям.",
        price: 3500,
      },
    },
    {
      id: 4,
      discount: true,
      genre: "shooter",
      cards: {
        url: "/SliderImages/4.jpg",
        title: "Mad Max",
        discription:
          "Захватывающее приключение, где игроки борются за выживание в постапокалиптическом мире, управляя транспортными средствами и сражаясь с врагами.",
        price: 1900,
      },
    },
    {
      id: 5,
      discount: true,
      genre: "adventure",
      cards: {
        url: "/SliderImages/5.jpg",
        title: "Night Ninja",
        discription:
          "Древний орден ниндзя в смятении, а мир ниндзя жаждет настоящего лидера, шиноби, который сможет объединить разрозненные кланы.",
        price: 900,
      },
    },
    {
      id: 6,
      discount: true,
      genre: "online",
      cards: {
        url: "/SliderImages/6.jpg",
        title: "Daiblo 4",
        discription:
          "Познакомьтесь с новой угрозой, погребенной под толщей песков Кеджистана: инструмент, созданный с благими намерениями, попал в руки демонического зла.",
        price: 4900,
      },
    },
    {
      id: 7,
      discount: false,
      genre: "adventure",
      cards: {
        url: "/SliderImages/7.jpg",
        title: "Horizon 2",
        discription:
          "Мир на краю гибели. Свирепые бури и смертельные болезни обрушились на разрозненные остатки человеческих племен, а новые устрашающие машины бродят по границам их земель.",
        price: 3800,
      },
    },
    {
      id: 8,
      discount: true,
      genre: "adventure shooter",
      cards: {
        url: "/SliderImages/8.jpg",
        title: "Mass Effect Saga",
        discription:
          "Фантастическая сага снова ждет вас. Легендарное издание The Mass Effect™ содержит весь контент и около 40 загружаемых материалов из ставших классикой игр Mass Effect.",
        price: 2490,
      },
    },
  ];

  const productsFiltred = (input, range, checkbox, toggle) => {
    let filteredProducts = ref(products);
    if (input) {
      filteredProducts.value = products.filter((product) =>
        product.cards.title.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (range) {
      filteredProducts.value = filteredProducts.value.filter(
        (product) =>
          product.cards.price >= range.min && product.cards.price <= range.max
      );
    }

    if (checkbox) {
      let allFalse = Object.values(checkbox).every(
        (element) => element.boolean === false
      );
      if (!allFalse) {
        const genresToFilter = [];
        for (let el in checkbox) {
          if (checkbox[el].boolean) {
            genresToFilter.push(checkbox[el].genre.toLowerCase());
          }
        }

        filteredProducts.value = filteredProducts.value.filter((product) => {
          return genresToFilter.some((genre) =>
            product.genre.toLowerCase().includes(genre)
          );
        });

        console.log(filteredProducts.value);
      }
    }
    return filteredProducts.value;
  };

  const productsSearch = () => {
    console.log("productsSearch");
  };

  const productsTop = () => {
    return products.filter((product) => product.id >= 4).slice(-4);
  };

  onMounted(() => {
    productsTop();
    productsFiltred();
    console.log(productsTop());
  });
  return {
    products,
    productsFiltred,
    productsSearch,
    productsTop,
  };
});
