import React from 'react';

import Rimage from '../elements/rimage';
import GridCell from '../elements/grid-cell';

export default class Grid extends React.Component {
  render() {
    return (
      <section className={`grid ${this.props.className}`}>
        <Rimage className="video" wrap="div" sizes={this.props.images} backgroundOnly={true}>
          {this.renderVideo()}
        </Rimage>
        <ul className="grid-list">
          {this.props.cells.map(cell => <GridCell cell={cell} />)}
        </ul>
      </section>
    );
  }
  renderVideo = () => {
    let video;
    if(this.props.video && this.props.video.length) {
      video = <iframe src={`https://player.vimeo.com/video/${this.props.video}?title=0&byline=0&portrait=0`} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>;
    }
    return video;
  }
}
