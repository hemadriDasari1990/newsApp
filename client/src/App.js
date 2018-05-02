/**
 * created by Hemadri Dasari on 01/05/2018
 */

import React, { Component } from "react";
import NewsData from './NewsData/components/NewsData';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { white } from "material-ui/styles/colors";
import Header from './Layout/components/Header';
import Footer from './Layout/components/Footer';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from "material-ui/IconButton";
import Search from "material-ui/svg-icons/action/search";

const SERVER_URL = 'http://localhost:3000/news/data';

const buttonStyle = {
  color: "#333"
};

//const API_KEY = '94c7a47f31434c81a219b6c405ddde1c';
//material-ui muitheme common styles for card and textfield
const muiTheme = getMuiTheme({
  card: {
    titleColor: white,
    subtitleColor: white,
    fontWeight: "bold",
  },
  textField: {
    textColor: '#333',
    hintColor: '#333',
    floatingLabelColor: '#333',
    disabledTextColor: '#3333',
    errorColor: 'red',
    focusColor: '#333',
    backgroundColor: "transparent",
    borderColor: '#333'
  }
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingError: false,
      newsData: undefined,
      country: '',
      totalArticles: -1,
      countryError: ""
    };
  }

  componentDidMount(){
    
  };

  componentWillUnMount(){
    // this.setState({
    //   loading: false,
    //   loadingError: false,
    //   newsData: undefined,
    //   country: '',
    //   totalArticles: 0,
    //   countryError: ""
    // })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  changeCountry = (event) => {
    this.setState({
      country: event.target.value
    });
  }

  handleSearch = () => {
    this.setState({
      newsData: undefined,
      totalArticles: 0,
      loading: true,
      loadingError: false,
      countryError: ''
    }) ;
    if(this.state.country != ""){
      this.setState({
        loading: true,
        loadingError: false,
        countryError: '',
        noData: ""
      });
      fetch(
        `${SERVER_URL}?country=${this.state.country}&category=business`
      ).then(response => {
          return response.json();
        }).then(data => {
          //console.log("Data...", JSON.stringify(data, undefined, 2));
          if(data.data.totalResults == 0){
            this.setState({
              noData: "No data found. Please try with different country",
              loading: false,
              loadingError: false,
              totalArticles: 0
            });
          }else{
            this.setState({
              loading: false,
              loadingError: false,
              newsData: data.data.articles,
              totalArticles: data.data.totalResults,
              noData: ""
            });
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
            loadingError: true,
            noData: ""
          });
        });
      }else{
        this.setState({
            loading: false,
            loadingError: false,
            newsData: undefined,
            totalArticles: 0,
            countryError: 'Country name is required',
            noData: ''
          });
      }
  }

  renderHeader = () => {
    return (
      <header>
        <Header appName="Conde Nast International News (Sample App)"/>
      </header>
    )
  }

  renderFooter = () => {
    return (
       <footer>
          <Footer />
        </footer>
    )
  }

  renderElements = () => {
    return (
       <div className="row" style={{textAlign: 'center'}}>
          <TextField
            errorText={this.state.countryError}
            floatingLabelText="Search with country"
            hintText="Type country name"
            value={this.state.country}
            onChange={this.changeCountry}
            name="country"
            errorStyle={{display:'table'}}
         />
          <IconButton
            tooltip="Search"
            tooltipPosition="bottom-center"
            iconStyle={buttonStyle}
            onClick={this.handleSearch}
          >
            <Search />
          </IconButton>
      </div>
    )
  }

  renderStatus = () => {
    return (
      <div className="container" id="body-content">
          <h3>Search with country name below for latest news</h3>
          {this.state.country != "" && (
            <h3>
              News Data for country {this.state.country}.
            </h3>
          )}
          {this.renderElements()}
          {this.state.loadingError && (
            <h2>Error while loading news data. Please try again.</h2>
          )}
          
          {this.state.loading && (
            <div style={{marginLeft: '50%'}}>
              <CircularProgress color='red'/>
            </div>
          )}

          {this.state.totalArticles > 0 && (<h3>Total articles found: <b>{this.state.totalArticles}</b> </h3>)}
          {this.state.newsData !== undefined && 
            <NewsData newsData = {this.state.newsData} /> 
          }

          {this.state.totalArticles == 0 && <h2>{this.state.noData}</h2>}
      </div>
    )
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          {this.renderHeader()}
          {this.renderStatus()}  
          {this.renderFooter()}
        </div>
      </MuiThemeProvider>
    );
  }
}
