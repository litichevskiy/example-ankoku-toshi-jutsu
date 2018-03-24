import React, { Component } from 'react';
import AnimatedText from '../AnimatedText'
import ButtonBack from '../ButtonBack';
const appData = require('../../../appData');

class HowtobuyDetail extends Component {

	constructor( props ) {
		super( props )

		this.history = props.history;
		this._clickedBack = this._clickedBack.bind( this );
	}

	_clickedBack() {
		this.history.goBack();
	}

  	render() {
  		let data = appData.HowtobuyDetailPage
    	return (
    		<div className="howtobuyDetailPage" >
    			<div className="wrapperContent">
    				<ButtonBack clickedHandler={this._clickedBack} />
    				<div className="mainHeader">
    					<AnimatedText contents={['adidas']}/>
    					<AnimatedText contents={['consortium stores']}/>
    				</div>
    				<div className="containerLists">
    					{
    						data.map(( item, index ) => {
    							return(
    								<div className="wrapperContainerLists" key={index}>
    									<h3 className="headerMiddle">{item.title}</h3>
				    					<ul className="listCountries">
				    						{
				    							item.list.map(( item, index ) => {
				    								let lastWord = item.match( /\w+$/gi );
				    								let string = item.replace( lastWord[0], '' );
				    								return(
				    									<li key={index} className="itemListCountries">
							    							{string}
							    							<span className="grey">{lastWord[0]}</span>
							    						</li>
				    								)
				    							})
				    						}
				    					</ul>
			    					</div>
    							)
    						})
    					}
    				</div>
    				<hr />
    			</div>
    		</div>
    	);
  	}
}

export default HowtobuyDetail;