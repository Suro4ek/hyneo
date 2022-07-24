import {atom} from "recoil";

export const Image = atom({
    key: 'image',
    default: false,
});

export const Tlauncher = atom({
    key: 'tlauncher',
    default: false,
});

export const Buy = atom({
    key: 'buy',
    default: false,
});

export const BuyItem = atom({
    key: 'buyItem',
    default: {},
})

export const PromoCode = atom({
    key: 'promoCode',
    default: '',
})