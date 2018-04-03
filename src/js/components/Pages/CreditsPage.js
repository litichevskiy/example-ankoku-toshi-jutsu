import React, { Component } from 'react';
import ButtonBack from '../ButtonBack';
import Video from './../Video';
const appData = require('../../../appData');

class CreditsPage extends Component {

    constructor( props ) {
        super( props )

        this.history = props.history;
        this._clickedBack = this._clickedBack.bind( this );
    }

    _clickedBack() {
        this.history.goBack()
    }

  	render() {

        return(
            <section className="creditsPage">
                <Video data={appData.creditsPage.video} />
                <div className="contentCreditsPage">
                    <ButtonBack clickedHandler={this._clickedBack} />
                    <div className="">
                        <h1 className="header">
                            <div className="animated zoomIn">Ankokou</div>
                            <div className="animated zoomIn">Toshi Jutsu</div>
                        </h1>
                        <ul className="listLinks">
                            <li className="itemListLinks">
                                <a href={'http://www.dayy.de/'} className="link" target="_blank">
                                    <img src={'src/images/dayy-logo.png'} alt="" />
                                </a>
                            </li>
                            <li className="itemListLinks">
                                <a href={'http://www.adidas.de/'} className="link" target="_blank" >
                                    <img src={'src/images/adidas-logo.png'} alt="" />
                                </a>
                            </li>
                            <li className="itemListLinks">
                                <a href={'https://www.thegoodwillout.de/'} className="link" target="_blank">
                                    <img src={'src/images/tgwo-logo.png'} alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="containerDescription">
                        {
                            appData.creditsPage.list.map( ( item, index ) => {
                                if( item ) {
                                    item = item.split(':')
                                    return(
                                        <div className="row" key={index}>
                                            <p className="left">{item[0]}</p>
                                            <p className="right">{item[1]}</p>
                                        </div>
                                    )
                                }

                                else {
                                    return( <div className="separator" key={index}></div> )
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default CreditsPage;