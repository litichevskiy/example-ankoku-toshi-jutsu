import React, { Component } from 'react';
const anime = require('../../lib/anime.min.js');

let animationLetters = {

	animated( key ) {

		setTimeout(() => {
			anime.timeline({loop: false})
		    .add({
		      	targets: key + ' .letter',
		      	opacity: [0,1],
		      	easing: "easeInOutQuad",
		      	duration: 650,
		      	delay: function(el, i) {
		        	return 75 * (i+1)
		      	}
		    }).add({
		      	targets: key,
		    });
		}, 0)
	},

	wrapLetters( list ) {
		list = list || [];

		let result = list.map(( item, index ) => {
			return <span key={index} className="letter">{item}</span>;
		});

		return result;
	}
};

module.exports = animationLetters;