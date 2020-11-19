import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/reducer';


class Auth extends Component {
    constructor(){
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    registerUser = async (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        try {
            const user = await axios.post('/api/auth/register', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log(err)
        }
    }

    login = async (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        try {
            const user = await axios.post('/api/auth/login', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log(err)
        }
    }
    
    render() {
        const {username, password} = this.state;
        return (
            <div>
                <form>
                    <input name='username' type='text' placeholder='Username' value={username} onChange={e => this.changeHandler(e)} />
                    <input name='password' type='password' placeholder='Password' value={password} onChange={e => this.changeHandler(e)} />
                    <button onClick={e => this.login(e)}>Login</button>
                    <button onClick={e => this.registerUser(e)} >Register</button>
                </form>
            </div>
        )
    }
}


export default connect(null, {loginUser})(Auth)