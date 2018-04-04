import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');
const actionsApp = require('../actionsApp');

class ButtonSound extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            sound: Store.sound,
            showButton: Store.show_button_sound,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({ showButton:Store.show_button_sound, sound: Store.sound });
    }

	updateStateSound() {
        actionsApp.replaceStateSound({sound: this.state.sound});
	}

  	render() {
        let className = ( this.state.showButton ) ? 'containerSound' : 'hide';
        let is_on = ( this.state.sound ) ? "on" : "off";
        let classes = `sound ${is_on}`;

        if( Store.is_desktop ) {
            return(
                <div className={className}>
                    <img
                        src={"src/images/sine.png"}
                        alt={""}
                        className={classes}
                        onClick={() => this.updateStateSound()} />
                    <audio
                        ref="audio"
                        src="src/audio/bg.mp3"
                        autoPlay
                        loop="true"
                        muted={!this.state.sound} >
                    </audio>
                </div>
            )
        }

        else{

            return(
                <div className={className}>
                    <img
                        src={"src/images/sine.png"}
                        alt={""}
                        className={classes}
                        onClick={() => this.updateStateSound()} />
                </div>
            )
        }
  	}
}

export default ButtonSound;