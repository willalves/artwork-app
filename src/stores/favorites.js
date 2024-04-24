import { defineStore } from "pinia";

export const useFavoritesStore = defineStore({
  id: "favorites",
  state: () => ({
    favorites: []
  }),
  actions: {
    addToFavorites(item) {
      this.favorites.push(item);
      this.persistFavorites();
    },
    removeFromFavorites(item) {
      this.favorites = this.favorites.filter((fav) => fav.objectNumber !== item.objectNumber);
      this.persistFavorites();
    },
    persistFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    loadFavorites() {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    }
  }
});
