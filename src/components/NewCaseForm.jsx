import React, { Component } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { withTranslation } from 'react-i18next';

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
    timestamp: Date.now(),
    lat: 0.0,
    lng: 0.0,
    sent: false,
    submitted: false
  };

  //todo implement zipcode

  handleChange = value => {
    this.setState({ [value]: !this.state[value] });
  };

  sendPhoneCode = () => {
    if (!this.state.phone) return false;

    this.setState({ sent: true });

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
    if (!this.state.phone || !this.state.code) return false; // no verification
    if (!this.hasSymptom()) return false;
    if (!this.state.sent) return false;

    this.setState({ submitted: true });

    let data = new URLSearchParams();
    for (let property in this.state) {
      // TODO: explicity append what you need, not everything
      if (property === "sent" || property === "submitted") continue;
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

  hasSymptom = () => {
    if (
      !(
        this.state.short_of_breath ||
        this.state.fever ||
        this.state.headache ||
        this.state.runny_nose ||
        this.state.diarrhea ||
        this.state.cough ||
        this.state.body_aches ||
        this.state.congestion ||
        this.state.sore_throat
      )
    ) {
      return false;
    } else return true;
  };

  getLocation = () => {
    // TODO: get location of user using gelocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCoords);
    }
  };

  setCoords = position => {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  };

  setPhone = value => {
    this.setState({ phone: value });
  };

  // TODO: refactor this so we don't need to repeat so much code
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="newCaseForm">
          <p className="newCaseHeader">{t('symptomForm')}</p>
          <label>
            <input
              type="checkbox"
              id="short_of_breath"
              value="short of breath"
              onClick={() => this.handleChange("short_of_breath")}
            />
            <p className="inputText">{t('shortOfBreath')}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="cough"
              value="cough"
              onClick={() => this.handleChange("cough")}
            />
            <p className="inputText">{t("cough")}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="sore_throat"
              value="sore_throat"
              onClick={() => this.handleChange("sore_throat")}
            />
            <p className="inputText">{t("soreThroat")}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="runny_nose"
              value="runny_nose"
              onClick={() => this.handleChange("runny_nose")}
            />
            <p className="inputText">{t("runnyNose")}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="congestion"
              value="congestion"
              onClick={() => this.handleChange("congestion")}
            />
            <p className="inputText">{t("congestion")}</p>
          </label>

          <label>
            <input
              type="checkbox"
              id="headache"
              value="headache"
              onClick={() => this.handleChange("headache")}
            />
            <p className="inputText">{t("headhache")}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="fever"
              value="fever"
              onClick={() => this.handleChange("fever")}
            />
            <p className="inputText">{t("fever")}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="diarrhea"
              value="diarrhea"
              onClick={() => this.handleChange("diarrhea")}
            />
            <p className="inputText">{t('diarrhea')}</p>
          </label>
          <label>
            <input
              type="checkbox"
              id="body_aches"
              value="body_aches"
              onClick={() => this.handleChange("body_aches")}
            />
            <p className="inputText">{t('bodyAches')}</p>
          </label>

          <div className="spacer" />
          <div className="locationDivs">
            <p className="addLocation">{t('location')}: </p>
            <div className="active button" onClick={this.getLocation}>
              {t('autoDetect')}
            </div>
          </div>
          <div className="location">
            <p className="locationText">
              Latitude: {this.state.lat.toPrecision(4)}
            </p>
            <p className="locationText">
              Longitude: {this.state.lng.toPrecision(4)}
            </p>
          </div>

          <div className="spacer" />
          <div className="phoneVerificationForm">
            <p className="phoneNumber">{t('phoneNumber')}:</p>

            <div className="spacer" />

            <PhoneInput
              placeholder={t('phoneNumber')}
              defaultCountry="US"
              value={this.state.phone}
              onChange={this.setPhone}
              className="phoneInput"
            />
            <div className="spacer" />
            <div
              className="active button sendPhoneCode"
              onClick={this.sendPhoneCode}
            >
              {t("sendCode")}
            </div>
            <div className="response">
              <p className="responseText">{this.state.sent ? "Sent" : ""}</p>
            </div>
          </div>
          <div className="spacer" />
          <div className="phoneVerificationCheck">
            <p className="verificationCode">{t("verificationCode")}:</p>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              onChange={event => this.setState({ code: event.target.value })}
            />
            <div className="spacer" />
            {this.state.phone &&
            this.state.sent &&
            this.state.code &&
            this.hasSymptom() ? (
              <div className="active button" onClick={this.submit}>
                Submit
              </div>
            ) : (
              <div className="disabled button">{t('submit')}</div>
            )}
            <p className="responseText">
              {this.state.submitted ? "Submitted" : ""}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(NewCaseForm);
