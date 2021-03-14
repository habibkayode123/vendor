import Spinner from "react-spinner-material";
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <Spinner size={120} color="#20c997" spinnerWidth={2} visible={true} />
      </div>
    );
  }
}
