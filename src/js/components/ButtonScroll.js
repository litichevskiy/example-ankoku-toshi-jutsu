import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class ButtonScroll extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            showButton: true,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {

        if( Store.name_current_page === '/howtobuy' ) this.setState({showButton:false});
        else this.setState({showButton:true});

        if( Store.total_pages === Store.index_current_page ) this.setState({showButton:false});
        else this.setState({showButton:true});
    }

	_clickedButton() {
        this.props.clikedHandler();
	}

  	render() {
        let className = ( this.state.showButton ) ? 'buttonScroll' : 'hide';
    	return (
                <div className={className} onClick={() => this._clickedButton()}>
                    <span className="content">scroll</span>
                </div>
    	);
  	}
}

export default ButtonScroll;