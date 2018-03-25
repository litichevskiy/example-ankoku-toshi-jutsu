import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonBack extends Component {

    constructor( props ) {
        super( props )
    }

    _clickedButton() {
        this.props.clickedHandler();
    }

  	render() {

        return(
            <div className="containerButtonBack" onClick={() => this._clickedButton()}>
                <div className="wrapperSvg">
                    <svg x="0px" y="0px" viewBox="0 0 31.494 31.494" className="svgBack" >
                        <path fill="#1E201D" d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
                    </svg>
                </div>
            </div>
        )
    }
}

export default ButtonBack;