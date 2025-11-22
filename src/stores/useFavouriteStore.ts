import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavouriteStore = defineStore('cards', () => {
    const favourites = ref(getFavouritesImmediately());

    function addToFavourite(id:number){
        if (favourites.value.find((value:number) => value == id)){
            favourites.value = favourites.value.filter((value:number) => value != id);
        } else{
            favourites.value.push(id);
        }

        saveFavourites();
    }

    function saveFavourites(){
        localStorage.setItem('favourites', JSON.stringify(favourites.value));
    }

    function getFavouritesImmediately(){
        return JSON.parse(localStorage.getItem('favourites') || '[]');
    }

    function isFavouriteCard(id:number){
        return favourites.value.includes(id);
    }

    return {
        addToFavourite,
        isFavouriteCard
    }
});