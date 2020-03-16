import React, { Component } from "react";
import NewCaseForm from "./NewCaseForm";

class AddCase extends Component {
  state = {
    active: false
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    return (
      <React.Fragment>
        <div className="addCase" onClick={this.handleClick}>
          Add a new unconfirmed case
        </div>
        {this.state.active ? <NewCaseForm /> : null}
      </React.Fragment>
    );
  }
}

export default AddCase;
