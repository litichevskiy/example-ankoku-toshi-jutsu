import React, { Component } from 'react';
import ButtonClose from './ButtonClose.js';
const actionsApp = require('../actionsApp');
const pubsub = new ( require('../utils/PubSub.js') );
const PRESS_FULLSCREEN = 70; // keyCode
const PRESS_ESC = 27; // keyCode
const PRESS_LEFT = 37; // keyCode
const PRESS_RIGHT = 39; // keyCode
const ANIMATION_SPEED = 350; //ms
const TIME_HIDE_PRELOAD = 500; //ms

class Slider extends Component {

	constructor( props ) {
		super( props )

		this.swiper;
		this.counterImg = 0;
		this.lengthListImg = this.props.list.length;
		this.closeSlider = this.closeSlider.bind( this );
		this._checkKeyCode = this._checkKeyCode.bind( this );
		pubsub.subscribe('keydown', this._checkKeyCode );
	}

	componentDidMount() {
  		this.swiper = new Swiper('.swiper-container', {
  			direction: 'horizontal',
  			speed: ANIMATION_SPEED,
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

	_imgLoaded() {
		this.counterImg += 1;
		if( this.counterImg === this.lengthListImg ) {
			this.refs.preloader.style.opacity = 0;
			this.refs.swiperWrapper.style.opacity = 1;

			setTimeout(() => {
				this.refs.preloader.style.display = 'none';
			}, TIME_HIDE_PRELOAD );
		}
	}

	_imgNotLoaded( index ) {
		this.lengthListImg -= 1;
		this.swiper.removeSlide( index );
	}

  	render() {

    	return (
    			<div ref="container" className="containerSlider animated fadeInRight">
    				<ButtonClose handler={this.closeSlider} />
	    			<div className="swiper-container" onClick={( event ) => this._isOpenSlider( event )}>
	    				<div ref="preloader" className="preloader">
	    					<img className="loading" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGcgaWQ9IlNWR0NsZWFuZXJJZF8wIj4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTYsNDE4LjM0Yy03LjkxOSwwLTE0LjM0Miw2LjQyMS0xNC4zNDIsMTQuMzQydjY0Ljk3N2MwLDcuOTIxLDYuNDIyLDE0LjM0MiwxNC4zNDIsMTQuMzQyczE0LjM0Mi02LjQyMSwxNC4zNDItMTQuMzQyICAgIHYtNjQuOTc3QzI3MC4zNDIsNDI0Ljc2MSwyNjMuOTE5LDQxOC4zNCwyNTYsNDE4LjM0eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnIGlkPSJTVkdDbGVhbmVySWRfMSI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDBjLTcuOTE5LDAtMTQuMzQyLDYuNDIxLTE0LjM0MiwxNC4zNDJ2NjQuOTc3YzAsNy45MjEsNi40MjIsMTQuMzQyLDE0LjM0MiwxNC4zNDJzMTQuMzQyLTYuNDIxLDE0LjM0Mi0xNC4zNDIgICAgVjE0LjM0MkMyNzAuMzQyLDYuNDIxLDI2My45MTksMCwyNTYsMHoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xNzQuODMsMzk2LjU5MmMtNi44NjMtMy45Ni0xNS42My0xLjYxMS0xOS41OTEsNS4yNDlsLTMyLjQ4OCw1Ni4yNzFjLTMuOTYxLDYuODYtMS42MTEsMTUuNjMxLDUuMjQ5LDE5LjU5MSAgICBjMi4yNTksMS4zMDQsNC43MjQsMS45MjMsNy4xNTcsMS45MjNjNC45NTYsMCw5Ljc3OC0yLjU3MywxMi40MzQtNy4xNzJsMzIuNDg4LTU2LjI3MSAgICBDMTg0LjA0LDQwOS4zMjMsMTgxLjY5LDQwMC41NTIsMTc0LjgzLDM5Ni41OTJ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzg0LDM0LjNjLTYuODYyLTMuOTYxLTE1LjYzLTEuNjExLTE5LjU5MSw1LjI0OUwzMzEuOTIxLDk1LjgyYy0zLjk2MSw2Ljg2LTEuNjExLDE1LjYzMSw1LjI0OSwxOS41OTEgICAgYzIuMjU5LDEuMzA0LDQuNzI0LDEuOTIzLDcuMTU3LDEuOTIzYzQuOTU2LDAsOS43NzctMi41NzMsMTIuNDM0LTcuMTcybDMyLjQ4OC01Ni4yNzFDMzkzLjIxLDQ3LjAzMSwzOTAuODYsMzguMjU5LDM4NCwzNC4zeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExNS40MDgsMzM3LjE3Yy0zLjk2LTYuODU4LTEyLjczMS05LjIxLTE5LjU5MS01LjI0OWwtNTYuMjcxLDMyLjQ4OGMtNi44NiwzLjk2LTkuMjEsMTIuNzMxLTUuMjQ5LDE5LjU5MSAgICBjMi42NTgsNC42MDEsNy40NzYsNy4xNzIsMTIuNDM0LDcuMTcyYzIuNDMyLDAsNC44OTktMC42Miw3LjE1Ni0xLjkyM2w1Ni4yNzEtMzIuNDg4ICAgIEMxMTcuMDE5LDM1Mi44MDEsMTE5LjM2OSwzNDQuMDMsMTE1LjQwOCwzMzcuMTd6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDc3LjcwMiwxMjhjLTMuOTYxLTYuODU4LTEyLjczMS05LjIwOS0xOS41OTEtNS4yNDlsLTU2LjI3MSwzMi40ODhjLTYuODYsMy45Ni05LjIxLDEyLjczMS01LjI0OSwxOS41OTEgICAgYzIuNjU4LDQuNjAxLDcuNDc2LDcuMTcyLDEyLjQzNCw3LjE3MmMyLjQzNCwwLDQuODk5LTAuNjIsNy4xNTYtMS45MjNsNTYuMjcxLTMyLjQ4OEM0NzkuMzEyLDE0My42MzEsNDgxLjY2MywxMzQuODYsNDc3LjcwMiwxMjggICAgeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTc5LjMxOCwyNDEuNjU4SDE0LjM0MkM2LjQyMiwyNDEuNjU4LDAsMjQ4LjA3OSwwLDI1NmMwLDcuOTIxLDYuNDIyLDE0LjM0MiwxNC4zNDIsMTQuMzQyaDY0Ljk3NyAgICBjNy45MTksMCwxNC4zNDItNi40MjEsMTQuMzQyLTE0LjM0MkM5My42NiwyNDguMDc5LDg3LjIzOCwyNDEuNjU4LDc5LjMxOCwyNDEuNjU4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ5Ny42NTgsMjQxLjY1OGgtNjQuOTc3Yy03LjkxOSwwLTE0LjM0Miw2LjQyMS0xNC4zNDIsMTQuMzQyYzAsNy45MjEsNi40MjIsMTQuMzQyLDE0LjM0MiwxNC4zNDJoNjQuOTc3ICAgIGM3LjkxOSwwLDE0LjM0Mi02LjQyMSwxNC4zNDItMTQuMzQyQzUxMiwyNDguMDc5LDUwNS41NzgsMjQxLjY1OCw0OTcuNjU4LDI0MS42NTh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTEwLjE1OSwxNTUuMjM5bC01Ni4yNzEtMzIuNDg4Yy02Ljg2MS0zLjk2MS0xNS42MzEtMS42MTEtMTkuNTkxLDUuMjQ5Yy0zLjk2MSw2Ljg2LTEuNjExLDE1LjYzMSw1LjI0OSwxOS41OTEgICAgbDU2LjI3MywzMi40ODhjMi4yNTksMS4zMDQsNC43MjQsMS45MjMsNy4xNTYsMS45MjNjNC45NTcsMCw5Ljc3OC0yLjU3MSwxMi40MzMtNy4xNzIgICAgQzExOS4zNjksMTY3Ljk3LDExNy4wMTksMTU5LjE5OSwxMTAuMTU5LDE1NS4yMzl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDcyLjQ1NCwzNjQuNDA5bC01Ni4yNzEtMzIuNDg4Yy02Ljg2Mi0zLjk2MS0xNS42MzEtMS42MDktMTkuNTkxLDUuMjQ5Yy0zLjk2MSw2Ljg2LTEuNjExLDE1LjYzMSw1LjI0OSwxOS41OTEgICAgbDU2LjI3MSwzMi40ODhjMi4yNTksMS4zMDQsNC43MjQsMS45MjMsNy4xNTYsMS45MjNjNC45NTcsMCw5Ljc3OC0yLjU3MSwxMi40MzQtNy4xNzIgICAgQzQ4MS42NjQsMzc3LjE0LDQ3OS4zMTQsMzY4LjM2OSw0NzIuNDU0LDM2NC40MDl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTgwLjA3OSw5NS44MTlsLTMyLjQ4OC01Ni4yNzFjLTMuOTYxLTYuODYtMTIuNzMxLTkuMjEtMTkuNTkxLTUuMjQ5Yy02Ljg2LDMuOTYtOS4yMSwxMi43MzEtNS4yNDksMTkuNTkxbDMyLjQ4OCw1Ni4yNzMgICAgYzIuNjU4LDQuNjAxLDcuNDc2LDcuMTcyLDEyLjQzNCw3LjE3MmMyLjQzMiwwLDQuODk5LTAuNjIxLDcuMTU3LTEuOTI1QzE4MS42OSwxMTEuNDUsMTg0LjA0LDEwMi42NzgsMTgwLjA3OSw5NS44MTl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzg5LjI0OSw0NTguMTEybC0zMi40ODgtNTYuMjcxYy0zLjk2MS02Ljg1OC0xMi43My05LjIxLTE5LjU5MS01LjI0OWMtNi44NiwzLjk2LTkuMjEsMTIuNzMxLTUuMjQ5LDE5LjU5MSAgICBsMzIuNDg4LDU2LjI3MWMyLjY1Nyw0LjYwMSw3LjQ3Niw3LjE3MiwxMi40MzQsNy4xNzJjMi40MzIsMCw0Ljg5OS0wLjYyLDcuMTU3LTEuOTIzICAgIEMzOTAuODYsNDczLjc0MywzOTMuMjEsNDY0Ljk3MiwzODkuMjQ5LDQ1OC4xMTJ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDBjLTcuOTE5LDAtMTQuMzQyLDYuNDIxLTE0LjM0MiwxNC4zNDJ2NjQuOTc3YzAsNy45MjEsNi40MjIsMTQuMzQyLDE0LjM0MiwxNC4zNDJzMTQuMzQyLTYuNDIxLDE0LjM0Mi0xNC4zNDIgICAgVjE0LjM0MkMyNzAuMzQyLDYuNDIxLDI2My45MTksMCwyNTYsMHoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTYsNDE4LjM0Yy03LjkxOSwwLTE0LjM0Miw2LjQyMS0xNC4zNDIsMTQuMzQydjY0Ljk3N2MwLDcuOTIxLDYuNDIyLDE0LjM0MiwxNC4zNDIsMTQuMzQyczE0LjM0Mi02LjQyMSwxNC4zNDItMTQuMzQyICAgIHYtNjQuOTc3QzI3MC4zNDIsNDI0Ljc2MSwyNjMuOTE5LDQxOC4zNCwyNTYsNDE4LjM0eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
	    				</div>
					    <div ref="swiperWrapper" className="swiper-wrapper">
					    	{
					    		this.props.list.map( ( item, index ) => {
	    							return(
	    								<div className="swiper-slide" key={index}>
	    									<img
	    										src={item}
	    										className="img"
	    										alt=""
	    										onLoad={() => this._imgLoaded()}
	    										onError={this._imgNotLoaded.bind( this, index )}/>
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