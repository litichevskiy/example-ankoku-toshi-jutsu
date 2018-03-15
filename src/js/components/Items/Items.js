import React, { Component } from 'react';
const anime = require('../../../lib/anime.min.js')

class Items extends Component {

	constructor( props ) {
		super( props )

		this.state = {counter: 0};
	}

	componentWillUnmount() {
		// debugger
		// this.refs.div.style.background = 'pink';
	}

	componentDidMount() {
		// console.log('LOG--------------')
		this.func()
	}

	func() {
		setTimeout(() => {
			anime.timeline({loop: false})
		    .add({
		      targets: '.ml3 .letter',
		      opacity: [0,1],
		      easing: "easeInOutQuad",
		      duration: 650,
		      delay: function(el, i) {
		        return 125 * (i+1)
		      }
		    }).add({
		      targets: '.ml3',
		    });
		}, 0)
	}

	clicked() {

		this.setState({counter:this.state.counter + 1})
	}

  	render() {
  		// this.func()
		let content = ['D','o','m','i','n','o',' D','r','e','a','m','s'];

	    return (
	    	<div className="Items">
	      		<div className="animated bounce">Items page :)</div>
	    		<h1 className="ml3">{
	    			content.map(( item, index ) => {
	    				return <span key={index} className="letter">{item}</span>
	    			})
	    		}</h1>
	    		<h2 onClick={() => this.clicked() }>{this.state.counter}</h2>
	    	</div>
	    );
  	}
}

export default Items;