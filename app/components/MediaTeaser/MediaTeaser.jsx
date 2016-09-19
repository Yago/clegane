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
          type = this.props.query.split('/')[0];

    return (
      <Link to={`/${type}/${media.id}`} className="media-teaser">
        {(() => {
          if (media.poster_path || media.profile_path) {
            return (
              <Image
                src={media.poster_path ? media.poster_path : media.profile_path}
                size="1"
                ratio="0.66"
                class="img-responsive"
                alt={media.title ? media.title : media.name} />
            );
          } else {
            return (<div className="media-teaser-placeholder"></div>);
          }
        })()}
        <div className="media-teaser-inner">
          <h3>{media.title ? media.title : media.name}</h3>
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