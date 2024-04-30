<template>
  <q-layout view="hHr lpR fFr">
    <q-header elevated style="position: static">
      <the-header
        @openDrawer="drawerRight = !drawerRight"
        :shouldRenderComponent="shouldRenderComponent"
      />
      <q-drawer
        side="right"
        :width="drawerWidth"
        overlay
        v-model="drawerRight"
        color="dark"
        class="drawer bg-dark-alt"
      >
        <div class="drawer__close">
          <q-icon
            class="drawer__close-icon"
            name="close"
            size="40px"
            @click="drawerRight = !drawerRight"
          ></q-icon>
        </div>
        <div class="drawer__logo"><the-logo @click="$router.push('/')" /></div>
        <nav-bar drawer />
      </q-drawer>
    </q-header>

    <q-page-container style="padding: 0">
      <router-view />
    </q-page-container>
    <q-footer class="footer" elevated bordered>
      <q-toolbar>
        <the-footer />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { UseInterfaceStore } from "src/stores/interface";
import TheHeader from "./TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  name: "MainLayout",

  setup() {
    const shouldRenderComponent = ref(window.innerWidth > 1000);
    const drawerWidth = ref(window.innerWidth * 0.7);
    const interfaceStore = UseInterfaceStore();
    const handleResize = () => {
      shouldRenderComponent.value = window.innerWidth > 1000;
      drawerWidth.value = Math.floor(window.innerWidth * 0.85);
      interfaceStore.updateInnerWidth(window.innerWidth);
    };

    onMounted(() => {
      window.addEventListener("resize", handleResize);
      interfaceStore.updateInnerWidth(window.innerWidth);
      console.log(window.innerWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      drawerRight: ref(false),

      shouldRenderComponent,
      drawerWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  &__close {
    width: 100%;
    display: flex;
    padding-block: 25px;
    cursor: pointer;
    &-icon {
      margin: 0 auto;
      @include hover {
        color: var(--color-accent);
      }
    }
  }
  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 25px;
  }
}

.footer {
  position: relative;
  background-color: var(--color-dark);
}
</style>
