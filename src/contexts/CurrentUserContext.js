import React from "react";

export const CurrentUserContext = React.createContext();

export const defaultCurrentUser = {
    name: 'Виталий',
    email: 'abc@ya.ru',
    _id: ''
}