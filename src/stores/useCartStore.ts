import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CardType } from '../types';

export const useCartStore = defineStore('cart', () => {
    const minPrice = ref<string>();
    const maxPrice = ref<string>();
    const size = ref<string>('all');

    const cardsCountArr = ref<CardType[]>(getCartImmediately());
    
    const cartCount = computed<number>(() => {
        let result:number = 0;
        if(cardsCountArr.value.length){
            for(const card of cardsCountArr.value){
                result += card.count!;
            }
        }
        return result;
    });

    function total(){
        let result:number = 0;
        
        if (cardsCountArr.value.length){
            for(const card of cardsCountArr.value){
                result += card.total!;
            }
        }

        return result;
    }

    function getCartImmediately(){
        return JSON.parse(localStorage.getItem('cardsCountArr') || '[]');
    }

    function saveCart(){
        localStorage.setItem('cardsCountArr', JSON.stringify(cardsCountArr.value));
    }

    function isCardInCart(id:number){
        if (cardsCountArr.value.find((value) => value.id == id)){
            return true;
        }else{
            return false;
        }
    }

    function addToCart(id:number, count:number, title:string, price:string, image:string){
        if (cardsCountArr.value.find((value) => value.id == id)){
            cardsCountArr.value = cardsCountArr.value.filter((value) => value.id != id);
        } else{
            cardsCountArr.value.push(
                {
                    id,
                    count,
                    title,
                    price,
                    image,
                    total: count * +price
                }
            );
        }

        saveCart();
    }

    function removeToCart(id:number){
        cardsCountArr.value = cardsCountArr.value.filter((value) => value.id != id);

        saveCart();
    }

    const discount = ref<number>(0);
    const discountInput = ref<number>(0);

    const discountFixed = computed(() => {
        if(discount.value || discount.value === 0){
            return discount.value.toFixed(2);
        } else{
            return discount.value = 0;
        }
    });

    const disabled = ref<boolean>(false); //блок инпута discount
    const applyText = ref<string>('Incorrect value');
    const display = ref<string>('none');
    const color = ref<string>('');

    function apply(){   //фнукция блока
        if (discountInput.value <= 0){
            color.value = '#f00';
            display.value = 'block';
            return;
        }
        disabled.value = true;
        applyText.value = "Coupon is accepted";
        color.value = '#46A358';
        display.value = 'block';
        discount.value = discountInput.value;
    }

    const totalPrice = ref(0);

    const finalPrice = computed(() => {
        if ((total() - discount.value) < 0 || null || undefined){
            return totalPrice.value = 0;
        } else{
            return totalPrice.value = total() - discount.value || 0;
        }
    });

    function changeCount(id:number, value:number){
        const card = cardsCountArr.value.find((value) => value.id == id);
        card!.count = value;
        card!.total = +card!.price * value;

        saveCart();
    }


    const cards = ref<CardType[]>([]);

    async function getCards() {
        const response = await fetch('../../Plants.json');
        const data:CardType[] = await response.json();
        cards.value = data;
    }

    return {
        addToCart,
        isCardInCart,
        total,
        changeCount,
        removeToCart,
        getCards,
        apply,
        cartCount,
        cardsCountArr,
        discount,
        discountInput,
        discountFixed,
        finalPrice,
        cards,
        disabled,
        applyText,
        display,
        color,
        minPrice,
        maxPrice,
        size,
    }
});