export default {
    admin: 5,
    user: 10
}

export type UserData = {
    id: number,
    name: string,
    email: string,
    password_raw: string,
    role: number,
};

export type A_masterData = {
    id: number,
    name: string,
    price: number,
};

export type B_masterData = {
    id: number,
    name: string,
    tel: string,
};
