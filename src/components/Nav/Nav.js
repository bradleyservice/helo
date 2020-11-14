import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Nav() {
    return (
        <div>
            <ul>
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