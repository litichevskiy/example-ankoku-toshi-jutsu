import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
import Slider from './../Slider.js';
const appData = require('../../../appData');
const actionsApp = require('../../actionsApp');

class GalleryPage extends Component {

	constructor( props ) {
		super( props )

		this._replaseClassName = this._replaseClassName.bind( this );
	}

	_clikedLink( index ) {
		actionsApp.setActiveTab( index );
	}

	_replaseClassName( bol ) {
		if( bol ) this.refs.container.classList.add('fullscreen');
		else this.refs.container.classList.remove('fullscreen');
	}

  	render() {

	    return (
	    	<div ref="container" className="galleryPage">
	    		<div className="wrapperContentPage">
	    			<div className="blockTopLeft animated fadeInDown">
	    				<div className="topContentSmall white">TGWO x adidas</div>
	    				<div className="topContentSmall grey">Consortium</div>
	    			</div>
		    		<div className="headerLarge">
		    			<AnimatedText contents={['g-llerey']}/>
		    		</div>
		    		<div className="blockBottomLeft animated fadeInUp">
	    				<div className="contentLarge white">NMD_CS1 PK</div>
	    				<div className="contentSmall grey">
	    					A striking execution of an already <br />
	    					iconic sillhouette.
	    				</div>
	    			</div>
	    		</div>
	    		<Slider list={appData.gallery} handler={this._replaseClassName} />
	    	</div>
	    );
  	}
}

export default GalleryPage;