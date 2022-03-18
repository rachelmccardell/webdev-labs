import React from 'react';
import {getHeaders} from './utils';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import CommentButton from './CommentButton';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { 
            post: this.props.model,
            commentText: ''
        }
        this.fetchPost = this.fetchPost.bind(this);
        this.setComment = this.setComment.bind(this);
    }

    fetchPost() {
        fetch(`/api/posts/${this.state.post.id}`, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState(
                {post: data}
            );
        });
    }

    setComment() {
        console.log("curr text: " + document.getElementById(`userComment${this.state.post.id}`).value);
        this.setState({commentText: document.getElementById(`userComment${this.state.post.id}`).value});
    }
    
    render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div id="buttons">
                        <LikeButton
                            postId={post.id}
                            likeId={post.current_user_like_id}
                            fetchPost={this.fetchPost}/>
                        <BookmarkButton
                            postId={post.id}
                            bookmarkId={post.current_user_bookmark_id}
                            fetchPost={this.fetchPost}/>
                    </div>
                    <p>{ post.caption }</p>
                </div>
                <div className="comments">
                    <CommentButton 
                        postModel={post}
                        postId = {post.id}
                        fetchPost = {this.fetchPost}
                    />
                </div>
            </section> 
        );     
    }
}

export default Post;