import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Video from './Video.jsx';
import ButtonClose from './ButtonClose.js';
const dataApp = require('../../appData/index.js');
const Store = require('../Store');
const actionsApp = require('../actionsApp');
const pubsub = new ( require('../utils/PubSub.js') );
const ANIMATION_TIME = 300; // ms

class Menu extends Component {

	constructor( props ) {
		super( props )

		this.listMenu = dataApp.pageMenu;
		this.state = {
			showMenu: Store.is_open_menu,
			activeItem: Store.active_item_menu,
		}

		this.updateState = this.updateState.bind( this );
		this._clikedCloseMenu = this._clikedCloseMenu.bind( this );
		pubsub.subscribe('change', this.updateState );
	}

	componentWillUnmount() {
		pubsub.unSubscribe('change', this.updateState );
	}

	updateState() {
		this.setState({
			showMenu: Store.is_open_menu,
			activeItem: Store.active_item_menu
		});
	}

	closeMenu() {
		this.refs.container.style.opacity = '0';
		setTimeout(() => {
			this.setState({showMenu: false});
		}, ANIMATION_TIME );
	}

	_clikedCloseMenu() {
		actionsApp.setStateMenu( false );
	}

  	render() {

    return (
    	<section className={( this.state.showMenu ) ? 'containerMenu' : 'hide'}>
    		<div className="backgroundLayer"></div>
	    	<ButtonClose handler={this._clikedCloseMenu} />
    		<div ref="container" className="containerContentMenu">
    			<Video src={'src/videos/flag_black.mp4'} />
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