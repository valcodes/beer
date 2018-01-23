import React, { Component } from "react";
import axios from "axios";
import Favorite from "./Favorite";

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: []
    };
  }
  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }

  render() {
    return (
      <div>
        <div>
          <Favorite />
        </div>
      </div>
    );
  }
}
