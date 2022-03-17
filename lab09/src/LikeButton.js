import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.fetchPost = this.props.fetchPost.bind(this);
    }
 
    toggleLike(ev) {
        if (this.props.likeId) {
            console.log('unlike');
            this.unlike();
        } else {
            console.log('like');
            this.like();
        }
    }
 
    like() {
        fetch(`/api/posts/${this.props.postId}/likes`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({post_id: this.props.postId})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.fetchPost();
        })
    }

    unlike() {
       fetch(`api/posts/${this.props.postId}/likes/${this.props.likeId}`, {
           headers: getHeaders(),
           method: 'DELETE'
       })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.fetchPost();
       })
    }

    render () { 
        const likeId = this.props.likeId;
        return (
            <button role="switch"
                className="like" 
                aria-label="Like Button" 
                aria-checked={likeId ? true : false}
                onClick={this.toggleLike}>
                <i className={likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        ) 
    }
}

export default LikeButton;