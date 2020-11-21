import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

function Nav() {

    logoutUser = () => {
        axios.post('/api/auth/logout')
    }

    return (
        <div>
            <ul style={{listStyle: 'none'}}>
                <li><Link to='/dashboard' >Home</Link></li>
                <li><Link to='/new' >New Post</Link></li>
                <li><Link to='/' >Logout</Link></li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    const {username, profile} = state
    return {username, profile}
};

export default connect(mapStateToProps)(Nav)