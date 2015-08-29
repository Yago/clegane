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
      }
      done(res.body);
    });
};
