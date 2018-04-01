import React, { Component } from 'react';
const appData = require('../../appData');
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class BlockSocialLinks extends Component {
	constructor( props ) {
        super( props )

        this.state = {
        	showLinks: Store.show_social_link,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({showLinks:Store.show_social_link});
    }

  	render() {

		let className = ( this.state.showLinks ) ? 'blockSocialLinks' : 'hide';
    	return (
    		<ul className={className}>
				{appData.socialLinks.map( ( item, index ) => {
						return(
							<li className="itemLink" key={index} >
								<a className="link" href={item.link} target="_blank">{item.content}</a>
							</li>
						);
				})}
			</ul>
    	);
  	}
}

export default BlockSocialLinks;