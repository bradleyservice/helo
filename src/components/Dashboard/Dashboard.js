import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Post from '../Post/Post';

class Dashboard extends Component {
    constructor(props){
        super(props);

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
            })
            .catch(err => console.log(err))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getAllPosts()
    }

    deletePost = (postid) => {
        // const {postid} = this.props.match.params;
        console.log(postid)
        try {
            axios.delete(`/api/post/${postid}`)
            this.props.history.push('/dashboard')
        } catch(err){
            console.log(err)
        }
    }

    render() {
        const {posts} = this.state;
        const mappedPosts = posts.map((post) => {
            return( 
                <Link to={{
                    pathname: `/post/${post.id}`,
                    state: {deletePost: this.deletePost}
                    }} key={post.id} >
                    <ul>
                        <li style={{listStyle: 'none'}}>
                            {/* render Post component here, wrap it in link and then bring this props post info into post! */}
                            {post.title} <br/>
                            {post.username} <br/>
                            <img src={post.profile_pic} alt='profile' />
                        </li>
                    </ul>
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