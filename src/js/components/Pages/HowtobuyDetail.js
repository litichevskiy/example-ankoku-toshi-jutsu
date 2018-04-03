import React, { Component } from 'react';
import AnimatedText from '../AnimatedText'
import ButtonBack from '../ButtonBack';
import Video from './../Video';
const appData = require('../../../appData');

class HowtobuyDetail extends Component {

	constructor( props ) {
		super( props )

		this.history = props.history;
		this._clickedBack = this._clickedBack.bind( this );
	}

	_clickedBack() {
		this.history.goBack();
	}

    render() {
        let list = appData.howtobuyDetail.list;
        return (
            <div className="howtobuyDetailPage" >
                <Video data={appData.howtobuyDetail.video} />
                <div className="wrapperContent">
                    <ButtonBack clickedHandler={this._clickedBack} />
                    <div className="mainHeader">
                        <AnimatedText contents={['adidas']}/>
                        <AnimatedText contents={['consortium stores']}/>
                    </div>
                    <div className="containerLists">
                        {
                            list.map( ( item, index ) => {
                                return createList( item, index );
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}

function createList( data, index ) {
    let countries = Object.keys( data );
    return(
        <div className="wrapperContainerLists" key={index}>
            {
                countries.map( ( country, index ) => {
                    return (
                        <div key={index}>
                            <h3 className="headerMiddle" key={index}>{country}</h3>
                            <ul className="listCountries" key={index + 1}>
                                {
                                    data[country].map( ( item, index ) => {
                                        let key = ( item.match( /\w+$/ig ) )[0];
                                        item = item.replace( key, '' );
                                        return (
                                            <li className="itemListCountries" key={index}>
                                                {item}
                                                <span className="grey">{key}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HowtobuyDetail;