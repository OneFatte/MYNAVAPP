import { create } from 'apisauce';
import CryptoJS from 'crypto-js';

const publicKey = '55d026505815e0608b3a63c27e83cd21';
const privateKey = '0847fc753e2fedf435edea6ab51ecb841efba503';
const baseURL = 'https://gateway.marvel.com/v1/public/';

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);

const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

export const getHeroes = async ( offset = 0, limit = 20) => {
    const response = await api.get('characters', {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
    });
    
    if (response.ok) {
        return {
            results: response.data.data.results,
            total: response.data.data.total,
        };
    } else {
        console.error('Error fetching heroes:', response.problem);
        return { results: [], total: 0 };
    }
};

export const getOneHero = async (heroId, offset = 0, limit = 20) => {
    const response = await api.get(`characters/${heroId}/comics`, {
        ts,
        apikey: publicKey,
        hash,
        limit,
        offset,
    });

    if (response.ok) {
        return {
            results: response.data.data.results,
            total: response.data.data.total,
        };
    } else {
        console.error('Error fetching comics for hero:', response.problem);
        return { results: [], total: 0 };
    }
};
