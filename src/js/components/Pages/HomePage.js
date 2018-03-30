import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
import SvgButton from '../SvgButton';
import Video from './../Video';
const appData = require('../../../appData');

class HomePage extends Component {

	constructor( props ) {
		super( props )
	}

  	render() {
  		let svgButton = appData.homePage.svgButton;

	    return (
	    	<div className="homePage">
	    		<Video data={appData.homePage.video} />
	    		<div className="wrapperContentPage">
	    			<div className="blockTop animated fadeInDown">
    					<div className="contentMedium white">暗黒透視術</div>
    					<div className="contentSmall grey">The Art Of Seeing Through Darkness</div>
    				</div>
	    			<div className="blockBottom">
	    				<AnimatedText contents={['—ankoku']}/>
	    				<AnimatedText contents={['toshi jutsu']}/>
	    				<div className="headermiddle animated fadeInUp">
	    					adidas Consortium x The Good Will Out NMD_CS1 PK
	    				</div>
	    			</div>
	    			<div className="blockBottomRight animated fadeInUp">
	    				<Link to="/product" className="link">
		    				<SvgButton
		    					width={'175px'}
		    					height={'50px'}
		    					path={svgButton.path}
		    					title={svgButton.title}
	    						content={svgButton.content} />
	    				</Link>
	    			</div>
	    		</div>
	    	</div>
	    );
  	}
}

export default HomePage;