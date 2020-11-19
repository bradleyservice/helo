// import axios from 'axios';

const initialState = {
    username: '',
    userid: 0,
    profile: ''
}

const LOGIN_USER = "LOGIN_USER";

export function loginUser (user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}


export default function reducer (state = initialState, action){
    console.log(action.payload)
    switch(action.type){
        case LOGIN_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}