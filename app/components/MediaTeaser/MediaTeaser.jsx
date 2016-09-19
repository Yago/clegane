/*
  MediaTeaser
*/

import React from 'react';
import { Link } from 'react-router';
import Moment from 'moment';

import Image from '../Image';

class MediaTeaser extends React.Component {
  constructor() {
    super();
  }

  render() {
    const media = this.props.media,
          title = media.title ? media.title : media.name;

    return (
      <Link to={`movie/${media.id}`} className="media-teaser">
        <Image
          src={media.poster_path ? media.poster_path : media.profile_path}
          size="1"
          ratio="0.66"
          class="img-responsive"
          alt={title} />
        <div className="media-teaser-inner">
          <h3>{title}</h3>
          {(() => {
            if (!media.profile_path) {
              return (<h5>{Moment(media.release_date).format('Y')}</h5>);
            }
          })()}
        </div>
        <div className="chevron chevron-right visible-mobile"></div>
      </Link>
    );
  }
}

export default MediaTeaser;
