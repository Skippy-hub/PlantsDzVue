import { defineStore } from 'pinia';
import { ref } from 'vue';

export const cardsToCart = defineStore('cart', () => {
    const cardsCountArr = ref(getCartImmediately());
    const cartCount = ref(allCount());
    
    function allCount(){
        let result = 0;
        if(cardsCountArr.value.length){
            for(const card of cardsCountArr.value){
                result += card.count;
            }
        }
        return result;
    };

    function getCartImmediately(){
        return JSON.parse(localStorage.getItem('cardsCountArr')) || [];
    }

    function saveCart(){
        localStorage.setItem('cardsCountArr', JSON.stringify(cardsCountArr.value));
    }

    function isCardInCart(id){
        if (cardsCountArr.value.find((value) => value.id == id)){
            return true;
        }else{
            return false;
        }
    }

    function addToCart(id, count, title, price, image){
        if (cardsCountArr.value.find((value) => value.id == id)){
            const fullCount = cardsCountArr.value.find((value) => value.id == id);
            cartCount.value -= fullCount.count;
            cardsCountArr.value = cardsCountArr.value.filter((value) => value.id != id);
        } else{
            cardsCountArr.value.push(
                {
                    id,
                    count,
                    title,
                    price,
                    image
                }
            );
            cartCount.value += count;
        }

        saveCart();
    }

    return {
        addToCart,
        isCardInCart,
        cartCount,
        cardsCountArr
    }
});