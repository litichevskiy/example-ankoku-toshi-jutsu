import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
const MIN_TIME_TO_NEXT_SCROLL = 500; // ms
const pubsub = new ( require('./utils/PubSub.js') );
const actionsApp = require('./actionsApp');
const dataApp = require('../appData/index.js');
const Store = require('./Store');
	  Store.init();
// pages
import HomePage from './components/Pages/HomePage';
import ProductPage from './components/Pages/ProductPage';
import ItemsPage from './components/Pages/ItemsPage';
import JourneyPage from './components/Pages/JourneyPage';
import GalleryPage from './components/Pages/GalleryPage';
import ImprintPage from './components/Pages/ImprintPage';
import CreditsPage from './components/Pages/CreditsPage';
import HowToBuyPage from './components/Pages/HowToBuyPage';
import HowtobuyDetail from './components/Pages/HowtobuyDetail';
import NotFoundPage from './components/Pages/NotFoundPage';
//components
import BlockSocialLinks from './components/BlockSocialLinks';
import Indicator from './components/Indicator';
import ButtonScroll from './components/ButtonScroll';
import ButtonMenu from './components/ButtonMenu';
import ButtonSound from './components/ButtonSound';
import FixedLink from './components/FixedLink';
import FixedButton from './components/FixedButton';
import ContainerTabs from './components/ContainerTabs';
import Menu from './components/Menu';

const getConfirmation = (message, callback) => {
  	const allowTransition = window.confirm( message );
  	callback( allowTransition );
}

class App extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			load: false,
		};
		this.storage_last_time_scroll = [Date.now()];
		this.index_current_page;
		this.total_pages = Store.total_pages;
		this.changeLocation = this.changeLocation.bind( this );

		window.addEventListener('load', () => {
			let loader = document.querySelector('.containerLoading');
			setTimeout(() => {loader.style.opacity = '0';}, 100);
			this.refs.container.style.display = 'block';
      setTimeout(() => {
        document.body.removeChild(loader)
			}, 1000);
		});

		this.updateState = this.updateState.bind( this );
		this.scrollHandler = this.scrollHandler.bind( this );
		pubsub.subscribe('change', this.updateState );
	}

	componentDidMount() {
		actionsApp.changeLocation( this.refs._ROUTER.history.location.pathname );
   		this.refs._ROUTER.history.listen( this.changeLocation );
		this.refs.container.addEventListener("wheel", this.scrollHandler );

		let hammer = new Hammer.Manager(this.refs.container);
		let swipe = new Hammer.Swipe();

		hammer.add(swipe);
		hammer.on('swipeup', () => this.nextStep() );
		hammer.on('swipedown', () => this.previousStep());
	}

	componentWillUnmount() {
		pubsub.unSubscribe('change', this.updateState );
		this.refs.container.removeEventListener("wheel", this.scrollHandler );
	}

	updateState() {
		this.index_current_page = Store.index_current_page;
	}

	changeLocation( location ) {
		actionsApp.changeLocation( location.pathname );
	}

	clickedButtonScroll() {
		actionsApp.historyStepForward({history: this.refs._ROUTER.history});
	}

	nextStep() {
		if( this.index_current_page < this.total_pages ) {
		    actionsApp.historyStepForward({history: this.refs._ROUTER.history});
		}
	}

	previousStep() {
		if( this.index_current_page > 0 ) {
			actionsApp.historyStepBack({history: this.refs._ROUTER.history});
		}
	}

	scrollHandler( event ) {
	    let currentTime = Date.now();
	    let time = this.storage_last_time_scroll.pop();
	    this.storage_last_time_scroll.push( currentTime );

	    if( (currentTime - time) > MIN_TIME_TO_NEXT_SCROLL ) {
	    	if( event.deltaY > 0 ) this.nextStep();
		    else this.previousStep();
	    }
	}

  	render() {

	    return (
	    	<section ref="container" className="containerApp" >
		    	<HashRouter ref="_ROUTER" getUserConfirmation={getConfirmation}>
				    <div>
				    	<Menu />
				    	<Indicator />
				    	<FixedLink
				    		classNameContainer={'containerTgwoLogo'}
				    		href={''}
				    		src={{white: 'src/images/tgwo-logo.png', black: 'src/images/tgwo-logo-black.png' }} />
				    	<FixedLink
				    		classNameContainer={'containerAdidasLogo'}
				    		href={''}
				    		src={{white: 'src/images/adidas-logo.png', black: 'src/images/adidas-logo-black.png' }} />
				    	<FixedButton
				    		classNameContainer={'containerShop'}
				    		href={'howtobuy'}
				    		srcImg={'src/images/shop-icon.gif'}
				    		classNameLink={'link'}
				    		classNameContent={'contentLink'}
				    		content={'How to buy'}
				    		classNameContainerImg={'bg_icon'}
				    		srcImg={'src/images/shop-icon.gif'} />
				    	<ButtonSound />
				    	<BlockSocialLinks />
				    	<ButtonScroll clikedHandler={this.clickedButtonScroll.bind( this )} />
				    	<ButtonMenu />
				      	<Switch>
				     		<Route exact path="/" component={HomePage}/>
				     		<Route exact path="/product" component={ProductPage}/>
				      		<Route exact path="/items" component={ItemsPage}/>
				      		<Route exact path="/journey" component={JourneyPage}/>
				      		<Route exact path="/gallery" component={GalleryPage}/>
				      		<Route exact path="/howtobuy" component={HowToBuyPage}/>
				      		<Route exact path="/imprint" component={ImprintPage}/>
				      		<Route exact path="/credits" component={CreditsPage}/>
				      		<Route exact path="/howtobuy/detail" component={HowtobuyDetail}/>

							<Route exact path='/product_detail' render={(props) => (
  								<ContainerTabs {...props} data={dataApp.productDetailPage}/>
							)}/>
							<Route exact path='/items_detail' render={(props) => (
  								<ContainerTabs {...props} data={dataApp.itemsDetailPage}/>
							)}/>
							<Route exact path='/journey_details' render={(props) => (
  								<ContainerTabs {...props} data={dataApp.journeyDetailsPage}/>
							)}/>
				      		<Route component={NotFoundPage}/>
				      	</Switch>
				    	<div className="messageUser">
				    		<div className="mobile">
				    			<img src='src/images/rotate_icon.png' alt="" />
				    			<p className="content">Please rotate your device...</p>
				    		</div>
				    		<div className="desktop">
				    			<img src='src/images/fullScreen.png' alt="" />
				    			<p className="content">please expand the viewport...</p>
				    		</div>
				    	</div>
				    </div>
			  	</HashRouter>
	    	</section>
	    );
  	}
}

export default App;