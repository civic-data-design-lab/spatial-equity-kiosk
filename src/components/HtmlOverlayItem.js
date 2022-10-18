import * as React from 'react';

export default class HtmlOverlayItem extends React.Component {
  render() {
    const { x, y, children, style, coordinates, ...props } = this.props;
    const { zIndex = 'auto', ...remainingStyle } = style || {};

    return (
      // Using transform translate to position overlay items will result in a smooth zooming
      // effect, whereas using the top/left css properties will cause overlay items to
      // jiggle when zooming
      <div style={{ transform: `translate(${x}px, ${y}px)`, position: 'absolute', zIndex }}>
        <div style={{ userSelect: 'none', ...remainingStyle }} {...props}>
          {children}
        </div>
      </div>
    );
  }
}