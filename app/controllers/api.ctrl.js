'use strict';

var api         = require('./../../config/api.js'),
    request     = require('superagent');


/*
 * Used for retrieve data from tmdb api
 * apiCtrl.get(url,done(data),error(err));
 */
exports.get = function (url, done, error) {
  request
    .get(api.url+url)
    .query({
      api_key: api.key,
      language: api.lang
    })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        error(err);
        return;
      }
      done(res.body);
    });
};

/*
 * Used for retrieve data from tmdb api with page
 * apiCtrl.getpage(url,page,done(data),error(err));
 */
exports.getpage = function (url, page, done, error) {
  request
    .get(api.url+url)
    .query({
      api_key: api.key,
      language: api.lang,
      page: page
    })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        error(err);
        return;
      }
      done(res.body);
    });
};

/*
 * Used for retrieve data from search request on tmdb api
 * apiCtrl.search(type,query,page,done(data),error(err));
 */
exports.search = function (type, query, page, done, error) {
  request
    .get(api.url+'/search/'+type)
    .query({
      api_key: api.key,
      language: api.lang,
      query: query,
      page: page
    })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        error(err);
        return;
      }
      done(res.body);
    });
};

/*
 * Used for discover data from movie/tv/people request on tmdb api
 * apiCtrl.discover(type,list,page,done(data),error(err));
 */
exports.discover = function (type, list, page, done, error) {
  request
    .get(api.url+'/'+type+'/'+list)
    .query({
      api_key: api.key,
      language: api.lang,
      page: page
    })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        error(err);
        return;
      }
      done(res.body);
    });
};
