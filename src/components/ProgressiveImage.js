/* eslint-disable no-undef */
import React from 'react';

export default class ProgressiveImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.placeholder,
      loading: true,
    };
  }

  onload = () => {
    this.setState({
      image: this.image.src,
      loading: false,
    });
  }

  onerror = (e) => {
    const { onerror } = this.props;
    console.log('onerror,', e);
    if (onerror) {
      onerror(e);
    }
  }

  loadImage = (src) => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onload;
    image.onerror = this.onerror;
    image.src = src;
  }

  componentWillReceiveProps(nextProps) {
    const { src, placeholder } = nextProps;
    if (src !== this.props.src) {
      this.setState({ image: placeholder, loading: true }, () => {
        this.loadImage(src);
      });
    }
  }

  render() {
    const { image, loading } = this.state;
    const { children } = this.props;
    if (!children || typeof children !== 'function') {
      throw new Error('ProgressiveImage requires a function as its only child');
    }
    return children(image, loading);
  }

  componentDidMount() {
    const { src } = this.props;
    this.loadImage(src);
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }
}
