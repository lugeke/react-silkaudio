import React from 'react';
import { Dimmer } from 'semantic-ui-react';

const DimmerPage = WrappedComponent => class extends React.Component {
  state = {
    active: false,
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => {
    this.setState({ active: false });
    this.props.close();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });
  }

  render() {
    const { active } = this.state;
    return (
      <Dimmer
        active={active}
        onClickOutside={this.handleClose}
        page
      >
        <WrappedComponent {...this.props} />
      </Dimmer>
    );
  }
};

export default DimmerPage;
