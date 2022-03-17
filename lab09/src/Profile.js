import React from 'react';
import {getHeaders} from './utils';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
        this.state = {username: '', prof_pic: ''};
        this.fetchProfile = this.fetchProfile.bind(this);
    }

    componentDidMount() {
        // fetch posts
        this.fetchProfile();
        console.log('Profile component mounted');
    }

    fetchProfile() {
        fetch(`/api/profile/`, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState(
                {username: data.username, prof_pic: data.thumb_url}
            );
            console.log(data);
        });
    }

    render () {
        return (
            <header>
                <div className="user-profile">
                    <img src={this.state.prof_pic} />
                    <p className= "username">{this.state.username}</p>
                </div>
            </header>  
        );
    }
}

export default Profile;