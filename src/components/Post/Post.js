import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

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


    getPost = async () => {
        const {postid} = this.props.match.params;
        try {
            const res = await axios.get(`/api/post/${postid}`)
            console.log(res.data)
            this.setState({
                title: res.data[0].title,
                img: res.data[0].img,
                content: res.data[0].content,
                author: res.data[0].username,
                authorPicture: res.data[0].profile_pic,
                authorId: res.data[0].author_id
            })
        } catch(err){
            console.log(err)
        }
    }
    
    render() {
        const {title, img, content, author, authorPicture, authorId} = this.state;
        const {userid} = this.props;
        return (
            <div>
                <h3>{author}</h3> <br/>
                <img src={authorPicture} alt='profile' /><br/>
                <p>{title}</p><br/>
                <img src={img} alt='post' /><br/>
                <p>{content}</p><br/>
                {
                userid === authorId ?
                <button onClick={() => this.props.location.state.deletePost(this.props.match.params.postid)}>Delete Post</button>
                : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    let {userid} = state;
    return {userid};
}

export default connect(mapStateToProps)(withRouter(Post))
