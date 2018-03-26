import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class ButtonSound extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            sound: true,
            showButton: Store.show_button_sound,
            muted: false,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({showButton:Store.show_button_sound});
    }

	_clickedButton() {
        this.setState({sound: !this.state.sound, muted: !this.state.muted})
	}

  	render() {
        let className = ( this.state.showButton ) ? 'containerSound' : 'hide';
        let is_on = ( this.state.sound ) ? "on" : "off";
        let classes = `sound ${is_on}`;

    	return (
    		<div className={className}>
                <img
                    src={"src/images/sine.png"}
                    alt={""}
                    className={classes}
                    onClick={() => this._clickedButton()} />
                <audio
                    ref="audio"
                    src="src/audio/bg.mp3"
                    autoPlay
                    loop="true"
                    muted={this.state.muted} >
                </audio>
            </div>
    	);
  	}
}

export default ButtonSound;