import React from 'react';
import {getHeaders} from './utils';

class CommentButton extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {commentText: ''};
        this.handleChange = this.handleChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }
 
    handleChange(event) {
        this.setState({commentText: event.target.value});
    }


    postComment() {
        const postData = {
            "post_id": this.props.postId,
            "text": this.state.commentText
        };
        fetch(`/api/comments/`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.fetchPost();
        })
    }

    showMostRecentComment() {
        const numComments = this.props.postModel.comments.length;
        if (numComments > 0) {
            const recentComment = this.props.postModel.comments[numComments-1];
            return <section>
                        <strong>{recentComment.user.username}: </strong>
                        {recentComment.text}
                    </section>
        }
        else {
            return <div>No comments.</div>
        }
    }


    render () {
        return (
            <div>
                {this.showMostRecentComment()}
                <div className="add-comment">
                    <input type="text" 
                            value={this.state.commentText}
                            placeholder="Add comment..."
                            onChange={this.handleChange}/>
                    <button 
                        className="post" 
                        onClick={this.postComment}>
                        Post
                    </button>
                </div>
            </div>
            
        );
    }
}

export default CommentButton;