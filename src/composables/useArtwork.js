import { ref } from "vue";
import axios from "axios";

export function useArtwork(artWorkId) {
  const artWorks = ref([]);
  const currentPage = ref(1);
  const isLoading = ref(false);
  const loadingMore = ref(false);
  const isEmpty = ref(false);
  const artWorkSingle = ref(null);

  const fetchArtwork = async () => {
    isLoading.value = artWorks.value.length ? false : true;
    loadingMore.value = true;
    try {
      const response = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=xTQEfbFE&ps=12&p=${currentPage.value}`
      );
      artWorks.value = [...artWorks.value, ...response.data.artObjects];
    } catch (error) {
      console.log("Error fetching artworks: ", error);
    } finally {
      isLoading.value = false;
      loadingMore.value = false;
    }
  };

  const fetchArtworkById = async () => {
    try {
      const response = await axios.get(
        `https://www.rijksmuseum.nl/api/nl/collection/${artWorkId}?key=xTQEfbFE`
      );
      artWorkSingle.value = response.data.artObject;
    } catch (error) {
      console.log("Error fetching data:", error);
      return null;
    }
  };

  const searchArtwork = async (searchInput) => {
    isLoading.value = true;
    isEmpty.value = false;
    try {
      const response = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=xTQEfbFE&ps=12&p=${currentPage.value}&q=${searchInput.value}`
      );
      artWorks.value = response.data.artObjects;

      if (!artWorks.value.length) {
        isEmpty.value = true;
      }
    } catch (error) {
      console.log("Error searching artworks: ", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchArtwork,
    fetchArtworkById,
    searchArtwork,
    artWorkSingle,
    artWorks,
    currentPage,
    isLoading,
    loadingMore,
    isEmpty
  };
}
