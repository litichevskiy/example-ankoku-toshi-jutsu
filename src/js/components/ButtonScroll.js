import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class ButtonScroll extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            showButton: Store.show_button_scroll,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({showButton:Store.show_button_scroll});
    }

	goNextPage() {
        this.props.clikedHandler();
	}

  	render() {
        let className = ( this.state.showButton ) ? 'buttonScroll' : 'hide';

    	return (
                <div className={className} onClick={() => this.goNextPage()}>
                    <span className="content">scroll</span>
                </div>
    	);
  	}
}

export default ButtonScroll;