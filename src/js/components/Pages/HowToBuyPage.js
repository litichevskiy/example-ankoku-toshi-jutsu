import React, { Component } from 'react';
import AnimatedText from '../AnimatedText'
import ButtonBack from '../ButtonBack';

class HowToBuyPage extends Component {

	constructor( props ) {
		super( props )

		this.history = props.history;
		this._clickedBack = this._clickedBack.bind( this );
	}

	_clickedBack() {
		this.history.goBack()
	}

  	render() {

	    return (
	    	<div className="HowToBuyPage">
	    		<div className="wrapperContentPage">
	    			<ButtonBack clickedHandler={this._clickedBack} />
	    			<div className="mainHeader">
	    				<AnimatedText contents={['How to buy']}/>
	    			</div>
	    			<div className="row">
	    				<div className="cell animated zoomIn">
	    					<p className="smallContent">TGWO release</p>
	    					<div className="separator"></div>
	    					<p className="largeContent">16 — 09 — 17</p>
	    					<div className="separator"></div>
	    					<p className="smallerContent">
	    						In a contemporary homage to the covert agents of feudal Japan, the adidas Consortium x The Good Will Out MO CS1 Ankoku Toshi Jut, arrives in fulPon stealth mode.
	    					</p>
	    					<p className="smallContent">— The Art of Seeing through Darkness </p>
	    				</div>
	    				<div className="cell animated zoomIn">
	    					<p className="smallContent">worldwide release</p>
	    					<div className="separator"></div>
	    					<p className="largeContent">23 — 09 — 17</p>
	    				</div>
	    				<div className="cell animated zoomIn">
	    					<p className="smallContent">Article ID:</p>
	    					<div className="separator"></div>
	    					<p className="smallContent black">BB5994</p>
	    					<p className="smallContent black">Black</p>
	    					<p className="smallContent black">US 4.5-13.0</p>
	    					<p className="smallContent black">unisex</p>
	    					<p className="smallContent black">Retail price: 220,-€</p>
	    				</div>
	    				<div className="cell animated zoomIn">
	    					<p className="largeContent">
	    						The adidas Consortium x The Good Will Out NMD CS1 ,Ankoku Toshi Jutsu' is available at selected adidas consortium stores worldwide.
	    					</p>
	    					<div className="containerButtonViewStoreList">
	    						<div className="buttonViewStoreList">View store list</div>
	    					</div>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    );
  	}
}

export default HowToBuyPage;