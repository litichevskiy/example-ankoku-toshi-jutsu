import React, { Component } from 'react';
import ButtonClose from './ButtonClose.js';
const actionsApp = require('../actionsApp');
const Swiper = require('./../../lib/swiper.js');
const pubsub = new ( require('../utils/PubSub.js') );
const PRESS_FULLSCREEN = 70; // keyCode
const PRESS_ESC = 27; // keyCode
const PRESS_LEFT = 37; // keyCode
const PRESS_RIGHT = 39; // keyCode

class Slider extends Component {

	constructor( props ) {
		super( props )

		this.swiper;
		this.closeSlider = this.closeSlider.bind( this );
		this._checkKeyCode = this._checkKeyCode.bind( this );
		pubsub.subscribe('keydown', this._checkKeyCode );
	}

	componentDidMount() {
  		this.swiper = new Swiper('.swiper-container', {
  			direction: 'horizontal',
  			speed: 600,
  			slidesPerView: 1,
      		navigation: {
        		nextEl: '.swiper-button-next',
        		prevEl: '.swiper-button-prev',
      		},
  		});
	}

	componentWillUnmount() {
		this.swiper.destroy( true, true );
		pubsub.unSubscribe('keydown', this._checkKeyCode );
	}

	_checkKeyCode( event ) {
		let code = event.keyCode;
		if( code === PRESS_ESC ) this.closeSlider();
		  else
		    if( code === PRESS_LEFT ) this.swiper.slidePrev();
		  	else
		        if( code === PRESS_RIGHT ) this.swiper.slideNext();
		  		else
		  		  if( code === PRESS_FULLSCREEN ) this.openSlider();

	}

	_resize() {
		this.swiper.resize.resizeHandler();
	}

	_isOpenSlider( event ) {
		let targetName = event.target.tagName;
		if( targetName === 'IMG' ) this.openSlider();
	}

	closeSlider() {
		actionsApp.sliderFullScreen({fullScreen:false});
		this.refs.container.classList.remove('fullScreen');
		this.props.handler( false );
		this._resize();
	}

	openSlider() {
		actionsApp.sliderFullScreen({fullScreen:true});
		this.refs.container.classList.add('fullScreen');
		this.props.handler( true );
		this._resize();
	}

  	render() {

    	return (
    			<div ref="container" className="containerSlider animated fadeInRight">
    				<ButtonClose handler={this.closeSlider} />
	    			<div className="swiper-container" onClick={( event ) => this._isOpenSlider( event )}>
					    <div className="swiper-wrapper">
					    	{
					    		this.props.list.map( ( item, index ) => {
	    							return(
	    								<div className="swiper-slide" key={index}>
	    									<img src={item} className="img" alt="" />
	    								</div>
	    							)
	    						})
					    	}
					    </div>
					    <div className="swiper-button-prev swiperButton">
					    	<span className="content">prev</span>
					    </div>
					    <div className="swiper-button-next swiperButton">
					    	<span className="content">next</span>
					    </div>
					</div>
    			</div>
    	);
  	}
}

export default Slider;