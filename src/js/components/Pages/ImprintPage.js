import React, { Component } from 'react';

class ImprintPage extends Component {

    constructor( props ) {
        super( props )
    }

  	render() {

        return(
            <section className="imprintPage">
                <div className="containerContent">
                    <h3 className="header">Imprint</h3>
                    <p className="content">
                        The Good Will Out <br />
                        Burmann & Imiela GmbH  <br />
                        District court Köln HRB83370  <br />
                        Registered Office: Köln  <br />
                        Managing Directors: Alexander Imiela, Oliver Burmann  <br />
                        Händelstr. 41  <br />
                        50674 Köln  <br />
                        Germany  <br />
                        <br />
                        Phone: 0221 993 907 22 / 10:00-16:30 Uhr (10 am - 4:30 pm)<br />
                        <span style={{display: 'inline-flex'}}>
                            Email:
                            <a className="link" href="mailto:info@thegoodwillout.com"> info@thegoodwillout.com</a>
                        </span>
                        <br />
                        <br />
                        VAT number: DE 298 464 986
                        <br />
                        <br />
                        Production, Design and Development:
                        <br />
                        <br />
                        <a className="link" href="http://www.dayy.de" target="_blank">www.dayy.de</a>
                        <br />
                        <a className="link" href="mailto:hi@dayy.de">hi@dayy.de</a>
                    </p>
                </div>
            </section>
        );
    }
}

export default ImprintPage;