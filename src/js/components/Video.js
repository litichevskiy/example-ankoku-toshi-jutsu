import React, { Component } from 'react';
const Store = require('../Store');
const pubsub = new ( require('../utils/PubSub.js') );

class Video extends Component {

    constructor( props ) {
        super( props )

        this.is_subscribe_canplay = false;

        this.state = {
            is_desktop: Store.is_desktop,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({is_desktop: Store.is_desktop});
        if( this.state.is_desktop && Store.is_open_menu ) this.refs.video.pause();
          else
            if( this.state.is_desktop && !Store.is_open_menu ) this.refs.video.play();
    }

  	render() {

        if( this.state.is_desktop ) {
            let data = this.props.data;

            return (
                <div className="containerVideo">
                    <video
                        ref="video"
                        className="video"
                        preload="auto"
                        loop="true"
                        autoPlay="autoplay" >
                        {
                            data.source.map( ( item, index ) => {
                                return <source key={index} src={item.src} type={item.type} />
                            })
                        }
                    </video>
                </div>
            );
        }

        else{
            return ( <div className="containerVideo"></div> )
        }
  	}
}

export default Video;