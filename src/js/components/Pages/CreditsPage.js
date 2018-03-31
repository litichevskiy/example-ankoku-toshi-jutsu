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
        //animated zoomIn
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
                        <div className="row">
                            <p className="left">Client</p>
                            <p className="right">The Good Will Out, adidas</p>
                        </div>
                        <div className="row">
                            <p className="left">Agency</p>
                            <p className="right">dayy</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Project Owner TGWO</p>
                            <p className="right">Alex Imiela</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Creative Direction</p>
                            <p className="right">Oliver Ecker, Robin Gurski</p>
                        </div>
                        <div className="row">
                            <p className="left">Producer</p>
                            <p className="right">Konstantinos Sampanis</p>
                        </div>
                        <div className="row">
                            <p className="left">Executive Producer</p>
                            <p className="right">Oliver Ecker, Robin Gurski</p>
                        </div>
                        <div className="row">
                            <p className="left">Art Director</p>
                            <p className="right">René Martens</p>
                        </div>
                        <div className="row">
                            <p className="left">Project Manager</p>
                            <p className="right">Astrid Spiering</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Actor</p>
                            <p className="right">Masatoshi Ueno</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Director</p>
                            <p className="right">Konstantinos Sampanis</p>
                        </div>
                        <div className="row">
                            <p className="left">Assistant Director</p>
                            <p className="right">Sina Burmester</p>
                        </div>
                        <div className="row">
                            <p className="left">Cameraman/DoP</p>
                            <p className="right">Leif Thomas</p>
                        </div>
                        <div className="row">
                            <p className="left">Drone Camera Operator</p>
                            <p className="right">Sascha Neeße</p>
                        </div>
                        <div className="row">
                            <p className="left">1st Assistant Cameraman</p>
                            <p className="right">Javier Palicio</p>
                        </div>
                        <div className="row">
                            <p className="left">2nd Assistant Cameraman</p>
                            <p className="right">Christina Chalkidou</p>
                        </div>
                        <div className="row">
                            <p className="left">Editor</p>
                            <p className="right">Konstantinos Sampanis</p>
                        </div>
                        <div className="row">
                            <p className="left">Assistant Editor</p>
                            <p className="right">Sina Burmester</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Gaffer</p>
                            <p className="right">Andy Stein</p>
                        </div>
                        <div className="row">
                            <p className="left">Make-up Artist</p>
                            <p className="right">Julia Alexandra Glaser</p>
                        </div>
                        <div className="row">
                            <p className="left">Special Effects Supervisor</p>
                            <p className="right">Eike von Schlichting</p>
                        </div>
                        <div className="row">
                            <p className="left">Sound Editor</p>
                            <p className="right">Simon Hüging</p>
                        </div>
                        <div className="row">
                            <p className="left">Location Scout</p>
                            <p className="right">Árni Tómasson</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Developer</p>
                            <p className="right">Christian Ehrhart, Christian Potthast</p>
                        </div>
                        <div className="row">
                            <p className="left">Music & Sounddesign Web</p>
                            <p className="right">Jonas Wüllner</p>
                        </div>
                        <div className="row">
                            <p className="left">Drums Web</p>
                            <p className="right">Jakob Wüllner</p>
                        </div>
                        <div className="row">
                            <p className="left">Mastering Web</p>
                            <p className="right">Plätlin Mastering</p>
                        </div>
                        <div className="separator"></div>
                        <div className="row">
                            <p className="left">Production Company</p>
                            <p className="right">dayy, Moodboard</p>
                        </div>
                        <div className="row">
                            <p className="left">Costumes</p>
                            <p className="right">FTA Film- und Theaterausstattung GmbH</p>
                        </div>
                        <div className="row">
                            <p className="left">Special Effects</p>
                            <p className="right">CFX Spezialeffekte GbR.</p>
                        </div>
                        <div className="row">
                            <p className="left">Camera Equipment</p>
                            <p className="right">well done</p>
                        </div>
                        <div className="row">
                            <p className="left">Light Equipment</p>
                            <p className="right">Amp-light Film&TV Service GmbH</p>
                        </div>
                        <div className="row">
                            <p className="left">Light installation</p>
                            <p className="right">Robin Gurski, Ioannis Mihailidis, Rene Martens, Jens Heinen</p>
                        </div>
                        <div className="row">
                            <p className="left">Sound (Post Production)</p>
                            <p className="right">Defacto Sound</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CreditsPage;