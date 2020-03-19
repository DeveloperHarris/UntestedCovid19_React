import React, { Component } from "react";
import NewCaseForm from "./NewCaseForm";
import addCaseImage from "../addCaseButton.png";
import { withTranslation } from 'react-i18next';

class AddCase extends Component {
  state = {
    active: false
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="addCase" onClick={this.handleClick}>
          <img src={addCaseImage} height="60px"></img>
          <p className="selfReport">{t('selfReport')}</p>
        </div>
        {this.state.active ? <NewCaseForm /> : null}
      </React.Fragment>
    );
  }
}

export default withTranslation("AddCase")(AddCase);
