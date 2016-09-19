/*
  Image
*/

import React from 'react';

import config from '../../config/config.json';

class Image extends React.Component {
  constructor() {
    super();

    this.state = {
      defaultSize: 'w780',
      sizes: [
        {
          id: 5,
          width: 1200,
          standard: 'original',
          retina: 'original'
        },
        {
          id: 4,
          width: 980,
          standard: 'w1280',
          retina: 'original'
        },
        {
          id: 3,
          width: 770,
          standard: 'w1280',
          retina: 'original'
        },
        {
          id: 2,
          width: 401,
          standard: 'w780',
          retina: 'w1280'
        },
        {
          id: 1,
          width: 400,
          standard: 'w500',
          retina: 'w780'
        }
      ]
    };
  }

  getImageSize(image, width) {
    return image ? `${config.tmdb.images}${width}${image}` : '';
  }

  renderSources(src, currentSize) {
    return this.state.sizes.map((size, key) => {
      if (currentSize >= size.id) {
        return (
          <source
            key={key}
            media={`(min-width: ${size.width}px)`}
            srcSet={`${this.getImageSize(src, size.standard)} 1x, ${this.getImageSize(src, size.retina)} 2x`} />
        );
      }
    });
  }

  render() {
    const src = this.props.src,
          size = this.props.size,
          className = this.props.class,
          alt = this.props.alt;

    return (
      <div className="picture-wrapper">
        <picture className={!src ? 'placeholder' : ''}>
          {this.renderSources(src, size)}
          <img src={this.getImageSize(src, this.state.defaultSize)} alt={alt} className={className} />
        </picture>

        {(() => {
          if (!src) {
            return (<div className="placeholder"></div>);
          }
        })()}
      </div>
    );
  }
}

export default Image;
