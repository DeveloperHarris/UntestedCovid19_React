import React, { Component } from "react";

class NewCaseForm extends Component {
  state = {
    short_of_breath: false,
    fever: false,
    headache: false,
    runny_nose: false,
    diarrhea: false,
    cough: false,
    body_aches: false,
    congestion: false,
    sore_throat: false,
    phone: "",
    code: "",
    timestamp: 0,
    zipcode: "84604"
  };

  //todo implement zipcode

  handleChange = value => {
    this.setState({ [value]: !this.state[value] });
  };

  sendPhoneCode = () => {
    if (!this.state.phone) return false;

    let data = new URLSearchParams();
    data.append("phone", this.state.phone);

    fetch(
      "https://us-central1-untestedcoronaheatmap.cloudfunctions.net/express/sendVerificationCode",
      {
        method: "POST",
        body: data
      }
    );
  };

  submit = () => {
    if (!this.state.phone) return false;

    this.setState({ timestamp: Date.now() }); // doesn't do it in time because of async update TODO: fix

    let data = new URLSearchParams();
    for (let property in this.state) {
      data.append(property, this.state[property]);
    }

    fetch(
      "https://us-central1-untestedcoronaheatmap.cloudfunctions.net/express/addNewCase",
      {
        method: "POST",
        body: data
      }
    );
  };

  // TODO: refactor this so we don't need to repeat so much code
  render() {
    return (
      <React.Fragment>
        <div className="newCaseForm">
          <p>Mark Your Symptoms</p>
          <label>
            <input
              type="checkbox"
              id="short_of_breath"
              value="short of breath"
              onClick={() => this.handleChange("short_of_breath")}
            />
            <p>Short of Breath</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="fever"
              value="fever"
              onClick={() => this.handleChange("fever")}
            />
            <p>Fever</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="headache"
              value="headache"
              onClick={() => this.handleChange("headache")}
            />
            <p>Headache</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="runny_nose"
              value="runny_nose"
              onClick={() => this.handleChange("runny_nose")}
            />
            <p>Runny Nose</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="diarrhea"
              value="diarrhea"
              onClick={() => this.handleChange("diarrhea")}
            />
            <p>Diarrhea</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="cough"
              value="cough"
              onClick={() => this.handleChange("cough")}
            />
            <p>Cough</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="body_aches"
              value="body_aches"
              onClick={() => this.handleChange("body_aches")}
            />
            <p>Body Aches</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="congestion"
              value="congestion"
              onClick={() => this.handleChange("congestion")}
            />
            <p>Congestion</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="sore_throat"
              value="sore_throat"
              onClick={() => this.handleChange("sore_throat")}
            />
            <p>Sore Throat</p>
          </label>
          <div className="slidecontainer">
            <p>Rate how sure you are</p>
            <input
              type="range"
              min="1"
              max="10"
              className="slider"
              id="myRange"
            />
          </div>
          <div className="phoneVerificationForm">
            <p>Phone Number (To Verify)</p>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={event => this.setState({ phone: event.target.value })}
            />
          </div>
          <input
            type="submit"
            value="Send Code"
            className="sendPhoneCode"
            onClick={this.sendPhoneCode}
          />
          <div className="phoneVerificationForm">
            <p>Verification Code</p>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={event => this.setState({ code: event.target.value })}
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="sendPhoneCode"
            onClick={this.submit}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default NewCaseForm;
