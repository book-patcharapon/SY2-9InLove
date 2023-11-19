import {defineStore} from 'pinia';
import {useLocalStorage} from '@vueuse/core';

export const useTokenStore = defineStore('token', () => {
    const accessToken = useLocalStorage('accessToken', '');
    const refreshToken = useLocalStorage('refreshToken', '');

    const setAccessToken = (token) => {
        accessToken.value = token;
    };

    const setRefreshToken = (token) => {
        refreshToken.value = token;
    };

    return {accessToken, refreshToken, setAccessToken, setRefreshToken}
})