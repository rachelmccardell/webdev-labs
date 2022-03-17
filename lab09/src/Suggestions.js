import React from 'react';
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        // constructor logic
        this.state = { suggestions: [] };
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        console.log('Suggestions component created');
    }

    componentDidMount() {
        // fetch 
        this.fetchSuggestions();
        console.log('Suggestions component mounted');
    }

    fetchSuggestions() {
        fetch('/api/suggestions/', {
                // authentication headers added using 
                // getHeaders() function from src/utils.js
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ suggestions: data });
                console.log(data);
            })
    }

    render () {
        console.log(this.state.suggestions);
        return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>

                {
                    this.state.suggestions.map(suggestion => {
                        return (
                            <Suggestion model={suggestion} key={'suggestion-' + suggestion.id} />
                            /* <section class="suggestion">
                                <img src={suggestion.thumb_url} />
                                <div>
                                    <p class = "username">{suggestion.username}</p>
                                    <p class="suggestion-text">suggested for you</p>
                                </div>
                                <div>
                                    <button 
                                    class="follow" 
                                    aria-checked="false"
                                    aria-label="Follow"
                                    data-user-id={suggestion.id}  
                                    //</div>onclick="toggleFollow(event)"
                                    >follow</button>
                                </div>
                            </section> */
                        )
                    })
                }
            </div>
        )     
    }
}

export default Suggestions;