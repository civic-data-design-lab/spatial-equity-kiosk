import * as React from 'react';

const styles = {
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
};

export default class HtmlOverlay extends React.Component {
  // Override this to provide your items
  getItems() {
    const { children } = this.props;
    if (children) {
      return Array.isArray(children) ? children : [children];
    }
    return [];
  }

  getCoords(coordinates) {
    const pos = this.props.viewport.project(coordinates);
    if (!pos) return [-1, -1];
    return pos;
  }

  inView([x, y]) {
    const { viewport, overflowMargin = 0 } = this.props;
    const { width, height } = viewport;
    return !(
      x < -overflowMargin ||
      y < -overflowMargin ||
      x > width + overflowMargin ||
      y > height + overflowMargin
    );
  }

  scaleWithZoom(n) {
    const { zoom } = this.props.viewport;
    return n / Math.pow(2, 20 - zoom);
  }

  breakpointWithZoom(threshold, a, b) {
    const { zoom } = this.props.viewport;
    return zoom > threshold ? a : b;
  }

  getViewport() {
    return this.props.viewport;
  }

  getZoom() {
    return this.props.viewport.zoom;
  }

  render() {
    const { zIndex = 1 } = this.props;
    const style = Object.assign({ zIndex }, styles.mainContainer);

    const renderItems = [];
    this.getItems()
      .filter(Boolean)
      .forEach((item, index) => {
        const [x, y] = this.getCoords(item.props.coordinates);
        if (this.inView([x, y])) {
          const key = item.key === null || item.key === undefined ? index : item.key;
          renderItems.push(React.cloneElement(item, { x, y, key }));
        }
      });

    return <div style={style}>{renderItems}</div>;
  }
}

// This is needed for Deck.gl 8.0+
// @ts-ignore
HtmlOverlay.deckGLViewProps = true;