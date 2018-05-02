/**
 * created by Hemadri Dasari on 02/05/2018
 */

import React, { PureComponent } from "react";
import Paper from 'material-ui/Paper';
import Timer from "material-ui/svg-icons/image/timer";
import Description from "material-ui/svg-icons/action/description";
import Link from "material-ui/svg-icons/content/link";
import Title from "material-ui/svg-icons/action/view-headline";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class NewsData extends PureComponent {
  render() {
    let rows = [];
    const { newsData } = this.props;
    const style = {
      margin: 10,
      padding:15,
      display: 'inline-block',
      width: '100%'
    };
    const iconStyle = {
      marginBottom: -7,
      marginRight: 3
    }
    if(newsData){
      newsData.map((data, i) =>{
        let articleName = data.source.name;
        let title = data.title;
        let description = data.description;
        let url = data.url;
        let publishedAt = data.publishedAt;
        rows.push(
          <Paper key={i} style={style} zDepth={5}>
            <Title style={iconStyle} color="red"/><span><b>Article Name:</b> {articleName}</span>
            <br/>
            <Description style={iconStyle} color="red"/><span><b>Description:</b> {description}</span>
            <br/>
            <Link style={iconStyle} color="red"/><span><b>Article Link: </b></span><a href={url} target="_blank">{articleName}</a>
            <br/>
             <Timer style={iconStyle} color="red"/><span><b>Article Published At: </b>{publishedAt}</span>
          </Paper>
          )
      })
    }
    return (
      <MuiThemeProvider>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {rows}
        </div>
      </MuiThemeProvider>
    )
  }
}