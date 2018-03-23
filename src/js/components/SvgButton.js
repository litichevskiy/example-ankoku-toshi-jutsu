import React, { Component } from 'react';

class SvgButton extends Component {

	constructor( props ) {
		super( props )
	}

    // style={{position:'absolute', zIndex: 2, top: '10px', left: this.props.left }}
                // className="containerSvgButton animated fadeInUp"
  	render() {

    	return (
    		<div className="containerSvgButton">
    			<div className="wrapperSvgButton" style={{width: this.props.width, height: this.props.height}}>
    				<div className="animationLayer"></div>
	    			<svg className="svg" width={this.props.width} height={this.props.height}  version="1.1">
	                    <rect width="400" height="400" />
	                    	{
	                    	this.props.path.map( ( item, index ) => {
	                  			return  <path key={index} className={index == 0 ? "svgContent" : ''} fill={item.fill || null} d={item.d} />
	                    	})
	                    	}
	                </svg>
    			</div>
    			<div className="btnText white">{this.props.title}</div>
    			<div>
    				{
    					this.props.content.map(( item, index ) => {
    						return <div className="contentSmall grey" key={index}>{item}</div>
    					})
    				}
    			</div>
    		</div>
    	);
  	}
}

export default SvgButton;