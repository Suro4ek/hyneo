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
    key: 'byt',
    default: false,
});

export const Items = atom({
    key: 'items',
    default: []
})

export const Methods = atom({
    key: 'methods',
    default: []
})

export const State = atom({
    key: 'state',
    default: {}
})
