import React from 'react';
import {getHeaders} from './utils';

class FollowButton extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {followingId: -1};
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }
 
    toggleFollow(ev) {
        if (this.state.followingId > 0) {
            console.log('unfollow');
            this.unfollow();
        } else {
            console.log('follow');
            this.follow();
        }
    }
 
    follow() {
        console.log("following user " + this.props.userId);
        fetch(`/api/following/`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({user_id: this.props.userId}) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({followingId: data.id});
        })
    }

    unfollow() {
       fetch(`api/following/${this.state.followingId}`, {
           headers: getHeaders(),
           method: 'DELETE'
       })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({followingId: -1});
       })
    }

    render () {
        const followingId = this.state.followingId;

        return (
            <button 
                role="switch"
                className="follow" 
                aria-checked={followingId > 0 ? true : false}
                aria-label="Follow Button"
                data-user-id={this.props.userId} 
                onClick={this.toggleFollow}>
                    {followingId > 0 ? "unfollow" : "follow"}
            </button>
        ) 
    }
}

export default FollowButton;