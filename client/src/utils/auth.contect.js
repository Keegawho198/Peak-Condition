import React, {createContext} from 'react';


export default createContext({
    token: null,
    userId: null,
    master:false,
    login: (token, userId, tokenExpiration, master) => {},
    logout: (token, userId, tokenExpiration) =>{},
});