import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardsStore = defineStore('cards', () => {
    const favourites = ref(getFavouritesImmediately());

    function addToFavourite(id){
        if (favourites.value.find((value) => value == id)){
            favourites.value = favourites.value.filter((value) => value != id);
        } else{
            favourites.value.push(id);
        }

        saveFavourites();
    }

    function saveFavourites(){
        localStorage.setItem('favourites', JSON.stringify(favourites.value));
    }

    function getFavouritesImmediately(){
        return JSON.parse(localStorage.getItem('favourites')) || [];
    }

    function isFavouriteCard(id){
        return favourites.value.includes(id);
    }

    return {
        addToFavourite,
        isFavouriteCard
    }
});