import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');

class FixedButton extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            showButton: Store.show_fixed_button,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({ showButton: Store.show_fixed_button });
    }

  	render() {
        let className = ( this.state.showButton ) ? this.props.classNameContainer : 'hide';
        return(
            <div className={className}>
                <Link to={this.props.href} className={this.props.classNameLink}>
                    <span className={this.props.classNameContent}>{this.props.content}</span>
                    <span className="mobileContent">Get it</span>
                    <div className={this.props.classNameContainerImg}>
                        <img src={this.props.srcImg} alt={this.props.alt || ""} />
                    </div>
                </Link>
            </div>
        );
    }
}

export default FixedButton;