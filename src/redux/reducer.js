// import axios from 'axios';

const initialState = {
    username: '',
    userId: 0,
    profile: ''
}

const LOGIN_USER = "LOGIN_USER";

export function loginUser (username, profile){
    return {
        type: LOGIN_USER,
        payload: {username, profile}
    }
}


export default function reducer (state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}