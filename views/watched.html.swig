{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  <div ng-controller="GridCtrl as grid" ng-init="grid.record('{{user.key}}', 'descending');">

    <div class="results-heading">
      <div class="row">
        <div class="col-sm-5">
          <h4>
            {{watched.movies|length + watched.tvs|length}} Results
          </h4>
          <h1>Watched</h1>
        </div>
        <div class="col-sm-7">
          <div class="btn-group pull-right" uib-dropdown>
            <span role="button" id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">
              Sort <span class="caret"></span>
            </span>
            <ul ng-cloak class="uib-dropdown-menu" role="menu" aria-labelledby="single-button">
              <li role="menuitem" ng-class="grid.sortActive === 'name' ? 'active' : ''"><a href="#" ng-click="grid.sort('name');">Sort by name</a></li>
              <li role="menuitem" ng-class="grid.sortActive === 'date' ? 'active' : ''"><a href="#" ng-click="grid.sort('date');">Sort by watched date</a></li>
            </ul>
          </div>

          <div class="btn-group pull-right">
            <span role="button" class="btn btn-default" ng-class="grid.filterActive === '*' || grid.filterActive === '' ? 'active' : ''" ng-click="grid.filter('*');">All</span>
            <span role="button" class="btn btn-default" ng-class="grid.filterActive === '.movie' ? 'active' : ''" ng-click="grid.filter('.movie');">Movies</span>
            <span role="button" class="btn btn-default" ng-class="grid.filterActive === '.tv' ? 'active' : ''" ng-click="grid.filter('.tv');">TVs</span>
          </div>
        </div>
      </div>
    </div>

    {% if watched.movies|length > 0 or watched.tvs|length > 0 %}
      <div class="results-wrapper">
        <div class="row grid">
          {% for item in watched.movies %}
            <div class="col-sm-2-4 grid-item movie" data-name="{{item.name}}" data-date="{{item.watched_on|date('Y-m-d_H:i')}}">
              {{ thumbnail.watched(item, 'movie') }}
            </div>
          {% endfor %}
          {% for item in watched.tvs %}
            <div class="col-sm-2-4 grid-item tv" data-name="{{item.name}}" data-date="{{item.last_view|date('Y-m-d_H:i')}}">
              {{ thumbnail.watched(item, 'tv') }}
            </div>
          {% endfor %}
        </div>
      </div>
    {% else %}
      <div class="content-container">
        <div class="spacer spacer-xl"></div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <div class="bubble-wrapper">
              <img class="logo" src="/svg/popcorn.svg" onerror="this.onerror=null; this.src='/img/popcorn.png'" alt="Popcorn by Smashicons" />
              <div class="bubble bubble-left">
                Take a seat and watch some <a href="/movies/popular/1">movies</a> or <a href="/tvs/popular/1">TV shows</a> !
              </div>
            </div>
          </div>
        </div>
      </div>
    {% endif %}

  </div>
{% endblock %}
