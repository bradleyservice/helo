import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from '../Post/Post';

class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            inputValue: '',
            boxCheck: true,
            posts: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    render() {
        

        const mappedPosts = this.state.posts.map(post => {
            return <Post key={post.id} posts={post} />
        })
        return (
            <div>
                <form>
                    <input type='text' name='inputValue' placeholder='Search...' 
                    value={this.state.inputValue} onChange={e => this.handleChange(e)} />
                    <button>Search</button>
                    <button>Reset</button><br/>
                    My Posts: <input type='checkbox' placeholder='My Posts' /> <br/>
                    {mappedPosts}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Dashboard)