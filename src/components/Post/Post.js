import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Post extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }


    componentDidMount(){
        this.getPost();
    }


    getPost = () => {
        console.log(this.props.match.params.postid)
        axios.get(`/api/post/${this.props.match.params.postid}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                title: res.data.title,
                img: res.data.img,
                content: res.data.content,
                author: res.data.username,
                authorPicture: res.data.profile_pic
            })
        })
        .catch(err => console.log(err))
    }
    
    render() {
        const {title, img, content, author, authorPicture} = this.state;
        return (
            <div>
                <h3>{author}</h3> <br/>
                <img src={authorPicture} alt='profile' /><br/>
                <p>{title}</p><br/>
                <img src={img} alt='post' /><br/>
                <p>{content}</p><br/>
            </div>
        )
    }
}


export default withRouter(Post)
