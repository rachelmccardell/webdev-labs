import React from 'react';
import {getHeaders} from './utils';
import FollowButton from './FollowButton';

class Suggestion extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.model
        }
        this.fetchSuggestion = this.fetchSuggestion.bind(this);
    }

    fetchSuggestion() {
        fetch(`/api/users/${this.state.suggestion.id}`, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState(
                {suggestion: data}
            );
            console.log("SUGGESTION: " + data);
        });
    }
    
    render () {
        const suggestion = this.state.suggestion;
        if (!suggestion) {
            return (
                <div></div>  
            );
        }
        console.log("suggestion id is : " + suggestion.id);
        return (
            <section className="suggestion">
                <img src= {suggestion.thumb_url} />
                <div>
                    <p className= "username">{suggestion.username}</p>
                    <p className= "suggestion-text">suggested for you</p>
                </div>
                <div>
                    {/* <button 
                        className="follow" 
                        aria-checked="false"
                        aria-label="Follow"
                        //data-user-id= {this.state.suggestion.id}
                        //onclick="toggleFollow(event)"
                        > follow</button> */}
                    <FollowButton
                        userId = {suggestion.id}
                        fetchSuggestion={this.fetchSuggestion}/>
                </div>
            </section>
        );     
    }
}

export default Suggestion;