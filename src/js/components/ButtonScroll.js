import React, { Component } from 'react';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');
const links = ['/howtobuy','/howtobuy/detail','/credits','/imprint','/product_detail','/items_detail','/journey_details'];

class ButtonScroll extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            showButton: true,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        let index = links.indexOf(Store.name_current_page);

        if( Store.total_pages === Store.index_current_page ) this.setState({showButton:false});
        else this.setState({showButton:true});

        if( index > -1 ) this.setState({showButton:false});
        else this.setState({showButton:true});
    }

	_clickedButton() {
        this.props.clikedHandler();
	}

  	render() {
        let className = ( this.state.showButton ) ? 'buttonScroll' : 'hide';

    	return (
                <div className={className} onClick={() => this._clickedButton()}>
                    <span className="content">scroll</span>
                </div>
    	);
  	}
}

export default ButtonScroll;