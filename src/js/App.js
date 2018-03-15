import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Items from './components/Items';
import Home from './components/Home';
import Journey from './components/Journey';
import NotFound from './components/NotFound';

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

class App extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			sound: true
		}
	}

	isSound() {
		this.setState({sound: !this.state.sound});
	}
				// <span><Link to="/items">Items</Link></span>
		    	// <span><Link to="/journey">Journey</Link></span>

  	render() {

      	let is_one = ( this.state.sound ) ? "on" : "off";
      	let classes = `sound ${is_one}`;

	    return (
	    	<main className="containerApp">
		    	<HashRouter getUserConfirmation={getConfirmation}>
				    <div>
				    	<div className="containerTgwoLogo">
				    		<a href="#/">
				    			<img src={"src/images/tgwo-logo.png"} alt={""} />
				    		</a>
				    	</div>
				    	<div className="containerAdidasLogo">
				    		<a href="#/">
				    			<img src={"src/images/adidas-logo.png"} alt={""} />
				    		</a>
				    	</div>
				    	<div className="containerShop">
				    		<a href="#/" className="link">
				    			<span className="contentLink">How to buy</span>
				    			<div className="bg_icon">
				    				<img src={"src/images/shop-icon.gif"} alt={""} />
				    			</div>
				    		</a>
				    	</div>
				    	<div className="containerSound">
				    		<img
				    			src={"src/images/sine.png"}
				    			alt={""}
				    			className={classes}
				    			onClick={() => this.isSound()} />
				    	</div>
				      	<Switch>
				     		<Route exact path="/" component={Home}/>
				      		<Route path="/journey" component={Journey}/>
				      		<Route path="/items" component={Items}/>
				      		<Route component={NotFound}/>
				      	</Switch>
				    </div>
			  	</HashRouter>
	    	</main>
	    );
  	}
}

export default App;