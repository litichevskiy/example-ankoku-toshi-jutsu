import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Video from './Video';
import ButtonClose from './ButtonClose.js';
const dataApp = require('../../appData/index.js');
const Store = require('../Store');
const actionsApp = require('../actionsApp');
const pubsub = new ( require('../utils/PubSub.js') );
const ANIMATION_TIME = 300; // ms
const PRESS_ESC = 27; // keyCode

class Menu extends Component {

	constructor( props ) {
		super( props )

		this.listMenu = dataApp.pageMenu.listMenu;
		this.state = {
			showMenu: Store.is_open_menu,
			activeItem: Store.active_item_menu,
		}

		this.updateState = this.updateState.bind( this );
		this._replaceStateMenu = this._replaceStateMenu.bind( this );
		this._isCloseMenu = this._isCloseMenu.bind( this );
		pubsub.subscribe('change', this.updateState );
		pubsub.subscribe('keydown', this._isCloseMenu );
	}

	componentWillUnmount() {
		pubsub.unSubscribe('change', this.updateState );
		pubsub.unSubscribe('keydown', this._isCloseMenu );
	}

	_isCloseMenu( event ) {
		if( this.state.showMenu && event.keyCode === PRESS_ESC ) this._replaceStateMenu();
	}

	updateState() {
		if( !Store.is_open_menu ) this.refs.container.style.opacity = '0';
		else this.refs.container.style.opacity = '1';
		setTimeout(() => {
			this.setState({
				showMenu: Store.is_open_menu,
				activeItem: Store.active_item_menu
			});
		}, ANIMATION_TIME );
	}

	_replaceStateMenu() {
		actionsApp.setStateMenu( false );
	}

  	render() {

    return (
    	<section className={( this.state.showMenu ) ? 'containerMenu' : 'hide'}>
    		<div className="backgroundLayer"></div>
	    	<ButtonClose handler={this._replaceStateMenu} />
    		<div ref="container" className="containerContentMenu">
    			<Video data={dataApp.pageMenu.video} />
	    		<nav className="blockMenu">
	    			<ul className="listMenu" >
	    				{this.listMenu.map( ( item, index ) => {
	    					return createdItemMenu.call( this, item, index )
	    				})}
	    			</ul>
	    		</nav>
	    		<div className="containerHowtobuy">
		    		<div className="blockHowtobuy animated fadeInUp">
		    			<div className="headerLarge">
		    				The adidas Consortium x The Good Will Out – NMD CS1 PK “Ankoku Toshi Jutsu“ will be available on September 16th.
		    			</div>
		    			<div className="headerSmall">
		    				In store first, remaining stock online.
		    			</div>
		    			<Link to='howtobuy' className="containerLink">
		    				<img src={'src/images/shop-icon.gif'} alt="" />
		    				<span className="descriptionLink">How to buy</span>
		    			</Link>
		    		</div>
	    		</div>
	    		<nav className="bottomNavigation">
	    			<ul>
	    				<li className="itemBottomNavigation">
	    					<Link to='credits' className="linkBottomNavigation">Credits</Link>
	    				</li>
	    				<li className="itemBottomNavigation">
	    					<Link to='imprint' className="linkBottomNavigation">Imprint</Link>
	    				</li>
	    			</ul>
	    		</nav>
    		</div>
    	</section>
    );
  }
}

function createdItemMenu( item, index ) {
	let list = item.content.split('\n');
	return (
    	<li className={this.state.activeItem === index ? 'itemMenu active' : 'itemMenu'} key={index}>
    		<Link to={item.link} className="link">
				<span className="counterItemMenu">.0{index + 1}</span>
				<div className="containerContentItemMenu">
					{list.map(( item, index ) => {
						return (
							<span key={index}>
								<span className="contentItemMenu">{item}</span>
								<br />
							</span>
						)
					})}
				</div>
    		</Link>
    	</li>
    )
}

export default Menu;