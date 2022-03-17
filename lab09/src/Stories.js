import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = { stories: [] };
        this.fetchStories = this.fetchStories.bind(this);
        console.log('Stories component created');
    }

    componentDidMount() {
        this.fetchStories();
        console.log('Stories component mounted');
    }

    fetchStories() {
        fetch('/api/stories', {
                // authentication headers added using 
                // getHeaders() function from src/utils.js
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ stories: data });
            })
    }

    render () {
        return (
            <div className="stories">
                {
                    this.state.stories.map(story => {
                        return (
                            <div className="story" key={'story-' + story.id}>
                                <img className="pic" src={story.user.image_url}></img>
                                <p>{story.user.username}</p>
                            </div>
                        )
                    })
                }
            </div> 

        );
    }
}

export default Stories;