import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class ButtonSound extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            sound: true,
            showButton: true,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        let name = Store.name_current_page;
        if( name === '/howtobuy' || name === '/howtobuy/detail' ) this.setState({showButton:false});
        else this.setState({showButton:true});
    }

	_clickedButton() {
        this.setState({sound: !this.state.sound})
	}

  	render() {
        let className = ( this.state.showButton ) ? 'containerSound' : 'hide';
        let is_one = ( this.state.sound ) ? "on" : "off";
        let classes = `sound ${is_one}`;

    	return (
    		<div className={className}>
                <img
                    src={"src/images/sine.png"}
                    alt={""}
                    className={classes}
                    onClick={() => this._clickedButton()} />
            </div>
    	);
  	}
}

export default ButtonSound;