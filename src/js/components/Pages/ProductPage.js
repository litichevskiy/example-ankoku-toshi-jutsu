import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
import SvgButton from '../SvgButton';
import Video from './../Video';
const appData = require('../../../appData');
const actionsApp = require('../../actionsApp');

class ProductPage extends Component {

	constructor( props ) {
		super( props )
	}

	_clikedLink( index ) {
		actionsApp.setActiveTab( index );
	}

  	render() {
  		let buttonDesign = appData.productPage.svgButtonDesign;
  		let buttonDetails = appData.productPage.svgButtonDetails;
  		let buttonMaterials = appData.productPage.svgButtonMaterials;
  		let buttonMobile  = appData.productPage.svgButtonMobile;

	    return (
	    	<div className="productPage">
	    		<Video data={appData.productPage.video} />
	    		<div className="wrapperContentPage">
	    			<div className="blockTop">
	    				<div className="animated fadeInDown">
	    					<div className="contentSmall white">23-09-17</div>
	    					<div className="contentSmall grey">Worldwide release</div>
	    				</div>
	    				<div className="header">
	    					<AnimatedText contents={['the']}/>
	    					<AnimatedText contents={['artefact_']}/>
	    				</div>
	    			</div>
	    			<div className="blockBottom animated fadeInUp">
	    				<div className="contentMedium white">
	    					The Good Will Out x <br />
	    					adidas Consortium <br />
	    					NMD_CS1 PK Ankoku <br />
	    					Toshi Jutsu.
	    				</div>
	    			</div>
	    			<div className="blockBottomRight animated fadeInUp">
	    				<div className="wrapperButtonSvg" onClick={() => this._clikedLink(0)}>
		    				<Link to="/product_detail" className="link">
			    				<SvgButton
			    					width={'50px'}
			    					height={'133px'}
			    					path={buttonDesign.path}
			    					title={buttonDesign.title}
		    						content={buttonDesign.content} />
		    				</Link>
	    				</div>
	    				<div className="wrapperButtonSvg" onClick={() => this._clikedLink(1)}>
		    				<Link to="/product_detail" className="link">
			    				<SvgButton
			    					width={'50px'}
			    					height={'84px'}
			    					path={buttonDetails.path}
			    					title={buttonDetails.title}
		    						content={buttonDetails.content} />
		    				</Link>
	    				</div>
	    				<div className="wrapperButtonSvg"onClick={() => this._clikedLink(2)}>
		    				<Link to="/product_detail" className="link">
			    				<SvgButton
			    					width={'50px'}
			    					height={'151px'}
			    					path={buttonMaterials.path}
			    					title={buttonMaterials.title}
		    						content={buttonMaterials.content} />
		    				</Link>
	    				</div>
	    			</div>
	    			<div className="containerButton animated fadeInUp">
	    				<div className="wrapperButtonSvg mobile"onClick={() => this._clikedLink(0)}>
		    				<Link to="/product_detail" className="link">
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
	    	</div>
	    );
  	}
}

export default ProductPage;