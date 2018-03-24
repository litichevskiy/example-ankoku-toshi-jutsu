import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class FixedLink extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            color: 'white',
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        let name = Store.name_current_page;
        if( name === '/howtobuy' || name === '/howtobuy/detail' ) this.setState({color:'black'});
        else this.setState({color:'white'});
    }

  	render() {
        let color = this.state.color;
        return (
            <div className={this.props.classNameContainer}>
                <Link to={this.props.href}>
                    <img src={this.props.src[color]} alt={this.props.alt || ""} />
                </Link>
            </div>
        );
    }
}

export default FixedLink;
