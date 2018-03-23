import React, { Component } from 'react';
let animatedLetters = require('../utils/animatedLetters.js');

class AnimatedText extends Component {

  	constructor( props ) {
  		super( props );

        this.letters = props.contents.map( item => item.split(''));
  	}

  	componentDidMount() {
		animatedLetters.animated('.ml3');
		animatedLetters.animated('.ml4');
	}

  	render() {

    	return (
    		<div className="containerAnimatedText">
                <div className="contentLarge white ml3">
    				{this.letters.map( ( listLetters, index ) => {
    					return(
			    			<div key={index} className="ml4">
			    				{animatedLetters.wrapLetters( listLetters )}
			    			</div>
    					)
    				})}
                </div>
    		</div>
    	);
  	}
}

export default AnimatedText;