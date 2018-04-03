import React, { Component } from 'react';
const Store = require('../Store');
const pubsub = new ( require('../utils/PubSub.js') );

class Video extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            video_ready: false,
            device: Store.device,
        }

        this._videoReady = this._videoReady.bind( this );
        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentDidMount() {
        if( this.refs.video ) {
            this.refs.video.addEventListener('canplay', this._videoReady );
        }
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({device: Store.device});
    }

    _videoReady() {
        if( this.refs.video ) {
            this.refs.video.removeEventListener('canplay', this._videoReady );
        }
        this.setState({video_ready: true});
    }

  	render() {

        if( this.state.device === 'desktop' ) {
            let data = this.props.data;
            let className = ( this.state.video_ready ) ? 'video ready' : 'video';

            return (
                <div className="containerVideo">
                    <video
                        ref="video"
                        className={className}
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