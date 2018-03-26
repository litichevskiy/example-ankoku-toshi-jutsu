import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
import SvgButton from '../SvgButton';
const appData = require('../../../appData');
const actionsApp = require('../../actionsApp');

class ItemsPage extends Component {

	constructor( props ) {
		super( props )
	}

	_clikedLink( index ) {
		actionsApp.setActiveTab( index );
	}

  	render() {
  		let buttonKimoto = appData.itemsPage.svgButtonKimoto;
  		let buttonLongsleeve = appData.itemsPage.svgButtonLongsleeve;
  		let buttonMobile = appData.itemsPage.svgButtonMobile;

	    return (
	    	<div className="itemsPage">
	    		<div className="wrapperContentPage">
	    			<div className="blockLeftTop">
	    				<div className="animated fadeInDown">
	    					<div className="contentTopSmall white">Essential apparel items</div>
	    					<div className="contentTopSmall grey">accompany the release</div>
	    				</div>
	    				<div className="headerLarge">
	    					<AnimatedText contents={['_items']}/>
	    				</div>
	    			</div>
	    			<div className="blockLeftBottom animated fadeInUp" onClick={() => this._clikedLink(0)}>
	    				<Link to="/items_detail" className="link">
			    			<SvgButton
			    				width={'50px'}
			    				height={'146px'}
			    				path={buttonKimoto.path}
			   					title={buttonKimoto.title}
		    					content={buttonKimoto.content} />
		   				</Link>
	    			</div>
	    			<div className="blockRightTop animated fadeInDown" onClick={() => this._clikedLink(1)}>
	    				<Link to="/items_detail" className="link">
			    			<SvgButton
			    				width={'175px'}
			    				height={'50px'}
			    				path={buttonLongsleeve.path}
			   					title={buttonLongsleeve.title}
		    					content={buttonLongsleeve.content} />
		   				</Link>
	    			</div>
	    			<div className="blockRightBottom animated fadeInUp">
	    				<div className="contentMedium">
	    					Limited - <br />
	    					Only available at <br />
	    					The Good Will Out.
	    				</div>
	    			</div>
	    			<div className="blockMobileButton animated fadeInUp">
	    				<Link to="/items_detail" className="link">
			    			<SvgButton
			    				width={'120px'}
			    				height={'50px'}
			    				path={buttonMobile.path}
			   					title={buttonMobile.title}
		    					content={buttonMobile.content} />
		   				</Link>
	    			</div>
	    		</div>
	    	</div>
	    );
  	}
}

export default ItemsPage;