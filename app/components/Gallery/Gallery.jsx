/*
  Gallery
*/

import React from 'react';
import PhotoSwipe from '../../../node_modules/photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from '../../../node_modules/photoswipe/dist/photoswipe-ui-default';
import config from '../../config/config.json';

import Image from '../Image';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    let galleryContainer = [];

    if (props.items && props.items.length > 0) {
      galleryContainer = props.items.reduce((acc, value) => {
        acc.push({
          src: `${config.tmdb.images}original${value.file_path}`,
          w: value.width,
          h: value.height
        });
        return acc;
      }, []);
    }

    this.state = {
      galleryContainer
    };
  }

  handleOpenLarge(item) {
    const pswp = document.querySelectorAll('.pswp')[0],
          options = {
            index: item,
            bgOpacity: 0.85,
            showHideOpacity: true
          };

    const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, this.state.galleryContainer, options);
    gallery.init();
  }

  renderItems() {
    if (this.props.items && this.props.items.length > 0) {
      return this.props.items.map((item, key) => {
        if (key <= 8) {
          return (
            <figure
              key={key}
              itemProp="associatedMedia"
              itemScope
              itemType="http://schema.org/ImageObject">
              <div onClick={this.handleOpenLarge.bind(this, key)} itemProp="contentUrl">
                <Image
                  src={item.file_path}
                  size="1"
                  class="img-responsive" />
              </div>
            </figure>
          );
        }
      });
    }
  }

  render() {
    return (
      <div className="gallery-wrapper">
        <div className="gallery">
          {this.renderItems()}
        </div>

        <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="pswp__bg"></div>
          <div className="pswp__scroll-wrap">
            <div className="pswp__container">
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
              <div className="pswp__item"></div>
            </div>
            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                <div className="pswp__counter"></div>
                <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button className="pswp__button pswp__button--share" title="Share"></button>
                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip"></div>
              </div>
              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
              <div className="pswp__caption">
                <div className="pswp__caption__center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
