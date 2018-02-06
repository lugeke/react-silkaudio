import React, { Component } from 'react';
import { Dimmer } from 'semantic-ui-react';

const DimmerPage = ComposedComponent => class extends Component {
  state = {
    active: true,
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  componentWillReceiveProps(nextProps) {
    this.setState({ active: this.props.active });
  }

  render() {
    const { active } = this.state;
    return (
      <Dimmer
        active={active}
        onClickOutside={this.handleClose}
        page
      >
        <ComposedComponent {...this.props} />
      </Dimmer>
    );
  }
};

export default DimmerPage;
