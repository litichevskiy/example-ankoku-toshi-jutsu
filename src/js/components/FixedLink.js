import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class FixedLink extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            color: Store.color_fixed_link,
            isShow: Store.show_fixed_link,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({
            isShow: Store.show_fixed_link,
            color: Store.color_fixed_link
        });
    }

  	render() {
        let color = this.state.color;
        let className = ( this.state.isShow ) ? this.props.classNameContainer : 'hide';
        return (
            <div className={className}>
                <Link to={this.props.href}>
                    <img src={this.props.src[color]} alt={this.props.alt || ""} />
                </Link>
            </div>
        );
    }
}

export default FixedLink;
