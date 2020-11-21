import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.createPost()
    }

    createPost = () => {
        const {title, img, content} = this.state;
        axios.post(`/api/post`, {title, img, content})
        .then(() => {
            this.setState({title: '', img: '', content: ''})
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    render() {
        const {title, img, content} = this.state;
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' placeholder='Title' value={title}
                    name='title' onChange={e => this.handleChange(e)} ></input>
                    <input type='text' placeholder='Image URL' value={img}
                    name='img' onChange={e => this.handleChange(e)} ></input>
                    <input type='text' placeholder='Content' value={content}
                    name='content' onChange={e => this.handleChange(e)} ></input> <br/>
                    <button onClick={e => this.handleSubmit(e)}>Post</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userid} = state
    return {userid};
}

export default connect(mapStateToProps)(Form)
