import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const pubsub = new ( require('../utils/PubSub.js') );
const Store = require('../Store');
const linksColors = ['/howtobuy','/howtobuy/detail','/credits'];
const linksShow = ['/credits','imprint','/product_detail','/items_detail','/journey_details'];

class FixedLink extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            color: 'white',
            isShow: true,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        let index = linksColors.indexOf( Store.name_current_page );
        if( index > -1 ) this.setState({color:'black'});
        else this.setState({color:'white'});

        index = linksShow.indexOf( Store.name_current_page );
        if( index > -1 ) this.setState({isShow: false});
        else this.setState({isShow: true});
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
