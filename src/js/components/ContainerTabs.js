import React, { Component } from 'react';
import ButtonBack from './ButtonBack';
import Video from './Video';
const Store = require('../Store');
const pubsub = new ( require('../utils/PubSub.js') );
const ANIMATION_CLASS = 'fadeInUp';

class ContainerTabs extends Component {

  	constructor( props ) {
  		super( props );

        this.data = props.data.payload;

        this.state = {
            bg_class: Store.name_current_page.replace('/', ''),
            activeTab: Store.active_tab,
        };

        this._goBack = this._goBack.bind( this );
        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
  	}

    componentDidMount() {
        this._deleteAnimationClass = this._deleteAnimationClass.bind( this );
        this.refs.div.addEventListener('animationend', this._deleteAnimationClass );
    }

    componentWillUnmount() {
        this.refs.div.removeEventListener('animationend', this._deleteAnimationClass );
        pubsub.unSubscribe('change', this.updateState );
    }

    componentDidUpdate() {
        this.refs.div.classList.add( ANIMATION_CLASS );
    }

    updateState() {
        let key = Store.name_current_page.replace('/', '');
        this.setState({bg_class: key});
    }

    _deleteAnimationClass() {
        this.refs.div.classList.remove( ANIMATION_CLASS );
    }

    _replaceSelectedTab( index ) {
        this.setState({activeTab: index});
    }

    _isActiveClass( index ) {
        if( index === this.state.activeTab ) return 'itemTab activeTab';
        else return 'itemTab';
    }

    _goBack() {
        this.props.history.goBack();
    }

  	render() {
        let className = ( this.state.bg_class ) ? 'containerTabs ' + this.state.bg_class : 'containerTabs';

        return (
            <section className={className}>
                <Video data={this.props.data.video} />
                <ButtonBack clickedHandler={this._goBack} />
                <nav className="containerNavBar" >
                    <ul className="listTabs">
                    {
                        this.data.map( ( item, index ) => {
                            return(
                                <li key={index} className={this._isActiveClass( index )}
                                    onClick={( item ) => this._replaceSelectedTab( index )}>
                                    {item.tabName}
                                </li>
                            )
                        })
                    }
                    </ul>
                </nav>
                <div className={( this.state.activeTab > -1 ) ?  'containerTabContent' : 'hidden'} >
                    <div ref="div" className={`descriptionTab animated ${ANIMATION_CLASS}`}>
                        {
                            this.data[this.state.activeTab].content.map( ( item, index ) => {
                                return <p key={index} className="paragraph">{item}</p>
                            })
                        }
                    </div>
                </div>
                <div className="containerContentMobile">
                    {
                        this.data.map( ( item, index ) => {
                            return(
                                <div className="blockTabs" key={index} >
                                    <h1 className="header" key={index}>{item.tabName}</h1>
                                    {
                                        item.content.map( ( item, index ) => {
                                            return <p className="content" key={index}>{item}</p>
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
    		</section>
    	);
  	}
}

export default ContainerTabs;