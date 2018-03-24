import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class Indicator extends Component {

	constructor( props ) {
		super( props )

		this.total_pages = Store.total_pages;
		this.total_pages = getArray( this.total_pages );

		this.state = {
			currentPage : Store.index_current_page,
			showIndicator: Store.index_current_page,
		}

		this.updateState = this.updateState.bind( this );
		pubsub.subscribe('change', this.updateState );
	}

	componentWillUnmount() {
		pubsub.unSubscribe('change', this.updateState );
	}

	updateState() {
		let isHow = ( Store.name_current_page === '/howtobuy' ||
					  Store.name_current_page === '/howtobuy/detail' ) ? false : true;
		this.setState({
			currentPage: Store.index_current_page,
			showIndicator: isHow,
		});
	}

  	render() {
  		let className = ( this.state.showIndicator ) ? 'containerIndicator' : 'hide';
  		let currentPage = this.state.currentPage -1;
  		let segmentClass;
    	return (
    		<div className={className} >
    			<ul className="listSegments">
    				{this.total_pages.map(( item, index ) => {
    					segmentClass = ( currentPage  === index ) ? 'segment active' : 'segment';
    					return <li className={segmentClass} key={index}></li>
    				})}
    			</ul>
    		</div>
    	);
  	}
}

function getArray( num ) {
	let result = [];
	for( let i = 0; i < num; i++ ) result.push(i);
	return result;
}

export default Indicator;