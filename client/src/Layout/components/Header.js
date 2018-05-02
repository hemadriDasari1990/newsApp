/**
 * created by Hemadri Dasari on 01/05/2018
 */

import React, { PureComponent } from "react";
import Logo from '../../../public/images/cni.jpg';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row" style={{paddingBottom: 5, borderBottom: '2px solid #3333'}}>
          <div className="col-md-2 col-sm-5 col-xs-6 logo-area" style={{paddingTop: 26}}>
              <img src={Logo} alt="Conde Nast International Inc" height="68" style={{overflow: 'hidden', width: 160, paddingTop: 0}} />
          </div>

          <div className="col-md-9 col-sm-7 col-xs-12" style={{paddingTop: 46}}>
              <h2><b>{this.props.appName}</b></h2>
          </div>
        </div>
      </div>
    )
  }
}