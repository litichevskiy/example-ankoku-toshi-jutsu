import React, { Component } from 'react';
const Store = require('../Store');
const pubsub = new ( require('../utils/PubSub.js') );

class Video extends Component {

    constructor( props ) {
        super( props )

        // this.is_play = Store.is_play_video;
        // this.updateState = this.updateState.bind( this );
        // pubsub.subscribe('change', this.updateState );
    }

    // componentWillUnmount() {
    //     pubsub.unSubscribe('change', this.updateState );
    // }

    // updateState() {
    //     this.is_play = Store.is_play_video;

    //     if( Store.is_play_video && this.is_play ) return;
    //         else if( !Store.is_play_video && !this.is_play ) return;
    //             else{
    //                 if( Store.is_play_video ) this.refs.video.play();
    //                 else this.refs.video.pause();
    //             }
    // }

  	render() {
    	return (
    		<div className="containerVideo">
    			<video
                    ref="video"
    				className="video"
    			 	preload="auto"
    			 	loop="true"
    			 	controls=""
    			 	muted=""
    			 	playsInline=""
    			 	autoPlay="autoplay" >
            		<source src={this.props.src} type="video/mp4" />
        		</video>
            </div>
    	);
  	}
}

export default Video;