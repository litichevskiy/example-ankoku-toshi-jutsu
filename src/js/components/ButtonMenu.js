import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const actionsApp = require('../actionsApp');
const Store = require('../Store');
const links = ['/howtobuy','/howtobuy/detail','/credits','/imprint','/product_detail','/items_detail','/journey_details'];

class ButtonMenu extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			currentPage : Store.index_current_page,
			totalPage : Store.total_pages,
			showButton: Store.index_current_page,
		}

		this.updateState = this.updateState.bind( this );
		pubsub.subscribe('change', this.updateState );
	}

	componentWillUnmount() {
		pubsub.unSubscribe('change', this.updateState );
	}

	updateState() {
		let index = links.indexOf( Store.name_current_page );
		this.setState({
			currentPage: Store.index_current_page,
			showButton: ( index > -1 ) ? false : true,
		});
	}

	_clickedButton() {
		actionsApp.setStateMenu( true );
	}

  	render() {
  		let className = ( this.state.showButton ) ? 'containerButtonMenu' : 'hide';
    	return (
    		<div className={className} >
	    		<div className="page current">{this.state.currentPage}</div>
	    		<div className="page total">{this.state.totalPage}</div>
	    		<div className="buttonMenu" onClick={() => this._clickedButton()}>
	    			<div className="line one"></div>
	    			<div className="line two"></div>
	    			<div className="line three"></div>
	    		</div>
    		</div>
    	);
  	}
}

export default ButtonMenu;