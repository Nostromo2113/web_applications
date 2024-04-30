import { boot } from "quasar/wrappers";
import NavBar from "../components/blocks/NavBar.vue";
import MainSearchInpit from "../components/UI/MainSearchInput.vue";
import DefaultBtn from "../components/UI/DefaultBtn.vue";
import SliderCard from "src/components/blocks/SliderCard.vue";
import TopGames from "../components/blocks/TopGames.vue";
import Advantages from "src/components/blocks/Advantages.vue";
import TheFooter from "src/components/blocks/TheFooter.vue";
import TitleCarousel from "src/components/blocks/TitleCarousel.vue";
import ProductCard from "src/components/blocks/ProductCard.vue";
import FilterPanel from "src/components/blocks/FiterPanel.vue";
import TheLogo from "src/components/blocks/TheLogo.vue";
import ProductLine from "src/components/blocks/ProductLine.vue";
import GamePage from "src/pages/GamePage.vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component("nav-bar", NavBar);
  app.component("main-search-input", MainSearchInpit);
  app.component("default-btn", DefaultBtn);
  app.component("slider-card", SliderCard);
  app.component("top-games", TopGames);
  app.component("the-advantages", Advantages);
  app.component("the-footer", TheFooter);
  app.component("title-carousel", TitleCarousel);
  app.component("product-card", ProductCard);
  app.component("filter-panel", FilterPanel);
  app.component("the-logo", TheLogo);
  app.component("product-line", ProductLine);
  app.component("game-page", GamePage);
});
