import React, { Component } from 'react';
import ButtonBack from './ButtonBack';
const Store = require('../Store');
const animatedLetters = require('../utils/animatedLetters.js');
const ANIMATION_CLASS = 'fadeInUp';

class ContainerTabs extends Component {

  	constructor( props ) {
  		super( props );

        this.data = props.data.payload;

        this.state = {
            activeTab: Store.active_tab,
        };

        this._clickedBack = this._clickedBack.bind( this );
  	}

    componentDidMount() {
        this._deleteAnimationClass = this._deleteAnimationClass.bind( this );
        this.refs.div.addEventListener('animationend', this._deleteAnimationClass );
    }

    componentWillUnmount() {
        this.refs.div.removeEventListener('animationend', this._deleteAnimationClass );
    }

    componentDidUpdate() {
        this.refs.div.classList.add( ANIMATION_CLASS );
    }

    _deleteAnimationClass() {
        this.refs.div.classList.remove( ANIMATION_CLASS );
    }

    _clickedTab( index ) {
        this.setState({activeTab: index});
    }

    _isActive( index ) {
        if( index === this.state.activeTab ) return 'itemTab activeTab';
        else return 'itemTab';
    }

    _clickedBack() {
        this.props.history.goBack();
    }

  	render() {

        return (
            <section className="containerTabs">
                <ButtonBack clickedHandler={this._clickedBack} />
                <nav className="containerNavBar" >
                    <ul className="listTabs">
                    {
                        this.data.map( ( item, index ) => {
                            return(
                                <li key={index} className={this._isActive( index )}
                                    onClick={( item ) => this._clickedTab( index )}>
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
                                <div className="blockTabs" >
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