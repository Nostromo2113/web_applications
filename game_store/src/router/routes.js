const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/reviews", component: () => import("pages/TheReviews.vue") },
      { path: "/catalog", component: () => import("pages/TheCatalog.vue") },
      {
        path: "/guarantees",
        component: () => import("src/pages/TheGuarantees.vue"),
      },
      {
        path: "/game/:id",
        name: "dynamicGame",
        component: () => import("src/pages/GamePage.vue"),
      },
    ],
  },
  {
    path: "/catalog",
    component: () => import("src/pages/TheCatalog.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
