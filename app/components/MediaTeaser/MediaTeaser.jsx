/*
  MediaTeaser
*/

import React from 'react';

import Image from '../Image';

class MediaTeaser extends React.Component {
  constructor() {
    super();
  }

  render() {
    const media = this.props.media;

    // console.log(media);

    return (
      <div className="media-teaser">
        <Image
          src={media.poster_path}
          size="1"
          ratio="0.66"
          class="coucou"
          alt={media.title} />
        <h3>{media.title}</h3>
        <p><em>{media.release_date}</em></p>
      </div>
    );
  }
}

export default MediaTeaser;
