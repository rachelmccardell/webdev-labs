import React from 'react';
import {getHeaders} from './utils';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
        this.state = {username: ''};
        this.fetchProfile = this.fetchProfile.bind(this);
        console.log('NavBar component created');
    }

    componentDidMount() {
        this.fetchProfile();
        console.log('NavBar component mounted');
    }

    fetchProfile() {
        fetch(`/api/profile/`, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState(
                {username: data.username}
            );
        });
    }

    render () {
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="/api">API Docs</a></li>
                    <li><span>{this.state.username}</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;