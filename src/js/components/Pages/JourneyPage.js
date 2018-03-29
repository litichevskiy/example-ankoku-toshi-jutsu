import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../AnimatedText'
import SvgButton from '../SvgButton';
import Video from './../Video';
const appData = require('../../../appData');
const actionsApp = require('../../actionsApp');

class JourneyPage extends Component {

	constructor( props ) {
		super( props )
	}

	_clikedLink( index ) {
		actionsApp.setActiveTab( index );
	}

  	render() {
  		let buttonExplore = appData.journeyPaje.svgButtonExplore;

	    return (
	    	<div className="journeyPage">
	    		<Video src={'src/videos/journey_page.mp4'} />
	    		<div className="wrapperContentPage">
	    			<div className="blockTopLeft animated fadeInDown">
	    				<div className="topContentSmall white">Trained in being deprived</div>
	    				<div className="topContentSmall grey">of one of your senses</div>
	    			</div>
	    			<div className="headerLarge">
	    				<AnimatedText contents={['the']}/>
	    				<AnimatedText contents={['journey_']}/>
	    			</div>
	    			<div className="blockBottomLeft white animated fadeInUp">
	    				Once upon a time there was an old <br />
	    				village called Nyōkō. It was surrounded <br />
	    				by six beautiful mountains, which were <br />
	    				entirely covered into warm, glistening <br />
	    				sunlight during daytime. None of the <br />
	    				citizens ever experienced the world <br />
	    				behind the mountains...
	    			</div>
	    			<div className="blockBottomRight animated fadeInUp" onClick={() => this._clikedLink(0)}>
	    				<Link to="/journey_details" className="link">
			    			<SvgButton
			    				width={'175px'}
			    				height={'50px'}
			    				path={buttonExplore.path}
			   					title={buttonExplore.title}
		    					content={buttonExplore.content} />
		   				</Link>
	    			</div>
	    		</div>
	    	</div>
	    );
  	}
}

export default JourneyPage;