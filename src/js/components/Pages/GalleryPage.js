import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
const appData = require('../../../appData');
const actionsApp = require('../../actionsApp');

class GalleryPage extends Component {

	constructor( props ) {
		super( props )
	}

	_clikedLink( index ) {
		actionsApp.setActiveTab( index );
	}

  	render() {

	    return (
	    	<div className="galleryPage">
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
	    	</div>
	    );
  	}
}

export default GalleryPage;