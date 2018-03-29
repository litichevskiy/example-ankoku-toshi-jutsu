import React, { Component } from 'react';
import ButtonClose from './ButtonClose.js';
const actionsApp = require('../actionsApp');
const Swiper = require('./../../lib/swiper.js');
const TIME_SET_FULLSCREEN = 350; //ms

class Slider extends Component {

	constructor( props ) {
		super( props )

		this.swiper;
		this.key_width;
		this.isChangeImg = false;
		this.min_width = 1000; // px
		this._windowResize = this._windowResize.bind( this );
		this.closeSlider = this.closeSlider.bind( this );
		window.addEventListener( 'resize', this._windowResize );
	}

	componentDidMount() {

  		this.swiper = new Swiper('.swiper-container', {
  			direction: 'horizontal',
  			speed: 400,
      		navigation: {
        		nextEl: '.swiper-button-next',
        		prevEl: '.swiper-button-prev',
      		},
  		});

  		_initSlideChange = _initSlideChange.bind( this );
		this.swiper.on('slideChange', _initSlideChange );
	}

	componentWillUnmount() {
		this.swiper.destroy( true, true );
		window.removeEventListener( 'resize', this._windowResize );
	}

	_resize() {
		setTimeout(() => {
			this.swiper.resize.resizeHandler()
		}, TIME_SET_FULLSCREEN );
	}

	_changeSizeSlider( event ) {
		let targetName = event.target.tagName;

		if( targetName === 'IMG' ) {
			actionsApp.sliderFullScreen({fullScreen:true});
			this.swiper.params.slidesPerView = 1;
			this.refs.container.classList.add('fullScreen');
			this.props.handler( true );
			this._resize();
		}
	}

	closeSlider() {
		actionsApp.sliderFullScreen({fullScreen:false});
		this.refs.container.classList.remove('fullScreen');
		this.props.handler( false );
		this._resize();
		this._windowResize();
	}

	_windowResize() {
		if( !this.isChangeImg ) return;

		let window_width = document.body.clientWidth;

		if( window_width < this.min_width ) {
			if( this.key_width != 'min' ) {
				this.key_width = 'min';
				this.swiper.params.slidesPerView = 1;
			}
		}
		else
			if( window_width > this.min_width ) {
				if( this.key_width != 'max' ) {
					this.key_width = 'max';
					this.swiper.params.slidesPerView = 2;
				}
			}
	}

  	render() {

    	return (
    			<div ref="container" className="containerSlider animated fadeInRight">
    				<ButtonClose handler={this.closeSlider} />
	    			<div className="swiper-container" onClick={( event ) => this._changeSizeSlider( event )}>
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

function _initSlideChange() {
	this.refs.container.classList.add('active');
	this.swiper.off('slideChange', _initSlideChange );
	this.swiper.params.slidesPerView = 2;
	this.isChangeImg = true;
};

export default Slider;