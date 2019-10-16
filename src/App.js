import React, { Component } from "react";
import Loader from "./components/Loader/Loader.jsx";
import MediaObject from "./components/MediaObject.jsx";
import SearchComponent from "./components/SerachComponent.jsx";
import { getUrlParam } from "./utils/getUrlParams.js";
import Search from "./img/Search.png";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      seconds: 0,
      data: undefined,
      serachClicked: false
    };
  }

  intervalFunc = () => {
    this.counter = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      });
    }, 1000);

    this.interval = setInterval(() => {
      this.getData();
    }, 30000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    clearInterval(this.counter);
    clearInterval(this.interval);
    this.setState({
      seconds: 0,
      data: undefined,
      serachClicked: false
    });
  };

  getDataFromAPI = async key => {
    await axios
      .get(`https://aravindtwitter.herokuapp.com/twittersearch?key=` + key)
      .then(result => {
        setTimeout(this.setState({ data: result.data }), 2000);
        this.intervalFunc();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getData = () => {
    clearInterval(this.counter);
    clearInterval(this.interval);
    this.setState({
      seconds: 0,
      data: undefined
    });
    const key = getUrlParam("key", undefined);
    this.getDataFromAPI(key);
  };

  handleSearch = e => {
    this.setState({ serachClicked: true });
    window.history.pushState(null, "Search", "?key=" + this.state.search);
    this.getData();
  };

  render() {
    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-12"}>
            <div
              style={{
                borderBottom: "2px solid #1DA1F2",
                marginBottom: "5px",
                padding: "5px",
                width: "100%"
              }}
            >
              <span style={{ color: "#1DA1F2" }}>Search @ Twitter </span>
              <span style={{ float: "right", color: "#1DA1F2" }}>
                Auto refresh in {this.state.seconds} seconds
              </span>
            </div>
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-12"}>
            <SearchComponent
              handleChange={this.handleChange}
              handleSearch={this.handleSearch}
            />
          </div>
        </div>

        {this.state.serachClicked === true && this.state.search !== "" ? (
          this.state.data === undefined ? (
            <Loader />
          ) : (
            ""
          )
        ) : (
          <div>
            <img src={Search} style={{ maxHeight: "750px" }} alt="Search" />
          </div>
        )}

        {this.state.data !== undefined ? (
          this.state.data.statuses.length !== 0 ? (
            this.state.data.statuses.map((status, key) => (
              <MediaObject data={status} key={key} />
            ))
          ) : (
            <MediaObject noResult />
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
