import React, { Component } from 'react';
import {connect} from 'react-redux';
// import Post from '../Post/Post';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            search: '',
            boxCheck: true,
            posts: []
        }
    }

    componentDidMount(){
        this.getAllPosts()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    toggleCheck = () => {
        this.setState(prevState => ({
            boxCheck: !prevState.boxCheck
        }))
    }

    getAllPosts = () => {
        const {userid} = this.props;
        const {boxCheck, search} = this.state;
        axios.get(`/api/posts/?userposts=${boxCheck}&userid=${userid}&search=${search}`)
            .then(res => {
                this.setState({posts: res.data, search: ''})
                // console.log(res.data)
            })
            .catch(err => console.log(err))
        // } else {
        //     axios.get(`/api/posts/${userid}`, {params: {search: search, userposts: false}})
        //     .then(res => {
        //         this.setState({posts: res.data, search: ''})
        //     })
        // }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getAllPosts()
    }

    render() {
        const {posts} = this.state;
        const mappedPosts = posts.map((post) => {
            return (
                <Link to={`/post/${post.id}`} >
                    <li>
                        {post.title} 
                        {post.username} 
                        {post.profile_pic}
                    </li>
                </Link>
        )})
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' name='search' placeholder='Search...' 
                    value={this.state.search} onChange={e => this.handleChange(e)} />
                    <button type='submit'>Search</button>
                    <button onClick={e => this.handleSubmit(e)} >Reset</button><br/>
                    My Posts: <input type='checkbox' onChange={e => this.toggleCheck(e)} checked={this.state.boxCheck || false} />
                    {mappedPosts}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userid} = state
    return {userid};
}


export default connect(mapStateToProps)(Dashboard)