import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UsersType } from '../types/users';

export const useAutorisation = defineStore('autorisation', () => {
    const arrUsers = ref<UsersType[]>(getUsersImmediately());

    const isAuthenticated = ref<boolean>(false);

    function getUsersImmediately(){
        return JSON.parse(localStorage.getItem('usersArr') || '[]');
    }

    function saveUsers(){
        localStorage.setItem('usersArr', JSON.stringify(arrUsers.value));
    }

    function addUser(id:number, firstName:string, lastName:string, sex:string, login:string, password:string){
        arrUsers.value.push(
            {
                id,
                firstName,
                lastName,
                sex,
                login,
                password
            }
        );

        saveUsers();
    }

    function searchUser(login:string, password:string){
        for (const user of arrUsers.value){
            if (user.login === login && user.password === password){
                isAuthenticated.value = true;
                return alert("Welcome!");
            } 
        }
        return alert('User not found.');
    }

    return {
        addUser,
        searchUser,
        arrUsers,
        isAuthenticated,
    }
});