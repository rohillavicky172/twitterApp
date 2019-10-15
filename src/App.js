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
      data: undefined
    };
  }

  tick() {
    setInterval(
      () =>
        this.setState({
          seconds: this.state.seconds + 1
        }),
      1000
    );
  }

  intervalFunc = () => {
    this.tick();
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
  };

  getDataFromAPI = async key => {
    await axios
      .get(`https://aravindtwitter.herokuapp.com/twittersearch?key=` + key)
      .then(result => {
        setTimeout(this.setState({ data: result.data }), 2000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getData = () => {
    this.setState({
      seconds: 0,
      data:undefined
    });
    const key = getUrlParam("key", undefined);
    this.getDataFromAPI(key);
  };

  handleSearch = e => {
    window.history.pushState(null, "Search", "?key=" + this.state.search);
    this.getData();
    this.intervalFunc();
  };

  render() {
    return (
      <div className={"container"}>
        <div
          style={{
            borderBottom: "2px solid #1DA1F2",
            marginBottom: "5px",
            padding: "5px"
          }}
        >
          <span style={{ color: "#1DA1F2" }}>Search @ Twitter </span>
          <span style={{ float: "right", color: "#1DA1F2" }}>
            Auto refresh in {this.state.seconds} seconds
          </span>
        </div>

        <SearchComponent
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />

        {this.state.search === "" ? (
          <img src={Search} style={{ height: "600px" }} alt="Search" />
        ) : this.state.data !== undefined ? (
          this.state.data.statuses ? (
            this.state.data.statuses.map((status, key) => (
              <MediaObject data={status} key={key} />
            ))
          ) : (
            <MediaObject noResult />
          )
        ) : (
          <Loader />
        )}   
      </div>
    );
  }
}

export default App;
