import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  const getDisplayName = (ComponentToName) => {
    return ComponentToName.displayName || ComponentToName.name || 'Component';
  };

  const name = getDisplayName(WrappedComponent);

  class WithLoggingComponent extends Component {
    componentDidMount() {
      console.log(`Component ${name} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${name})`;

  return WithLoggingComponent;
};

export default WithLogging;
