import React, { Component } from 'react';

class ButtonClose extends Component {

	constructor( props ) {
		super( props )
	}

	closePage() {
		this.props.handler();
	}

  	render() {

    	return (
    		<div className="containerClose" onClick={() => this.closePage()}>
    			<svg width="17px" height="17px" version="1.1" x="0px" y="0px" viewBox="0 0 371.23 371.23" >
					<polygon fill="#000" points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23   185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "/>
				</svg>
	    	</div>
    	);
  	}
}

export default ButtonClose;