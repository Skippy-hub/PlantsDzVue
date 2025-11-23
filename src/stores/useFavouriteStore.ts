import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CardType } from '../types';

export const useFavouriteStore = defineStore('cards', () => {
    const favourites = ref<CardType[]>(getFavouritesImmediately());

    function addToFavourite(id:number, image:string, title:string, price:string){
        if (favourites.value.find((value) => value.id == id)){
            favourites.value = favourites.value.filter((value) => value.id != id);
        } else{
            favourites.value.push({
                id,
                image,
                title,
                price
            });
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
        if (favourites.value.find((value) => value.id == id)){
            return true;
        }else{
            return false;
        }
    }

    return {
        addToFavourite,
        isFavouriteCard,
        favourites
    }
});