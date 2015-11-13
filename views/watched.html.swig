{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  <div ng-controller="GridCtrl as grid" ng-init="grid.init('{{user.key}}', 'descending');">

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
            <button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">
              Sort <span class="caret"></span>
            </button>
            <ul ng-cloak class="uib-dropdown-menu" role="menu" aria-labelledby="single-button">
              <li role="menuitem" ng-class="grid.sortActive === 'name' ? 'active' : ''"><a href="#" ng-click="grid.sort('name');">Sort by name</a></li>
              <li role="menuitem" ng-class="grid.sortActive === 'date' ? 'active' : ''"><a href="#" ng-click="grid.sort('date');">Sort by watched date</a></li>
            </ul>
          </div>

          <div class="btn-group pull-right" uib-dropdown>
            <button class="btn btn-default" ng-class="grid.filterActive === '*' || grid.filterActive === '' ? 'active' : ''" ng-click="grid.filter('*');">All</button>
            <button class="btn btn-default" ng-class="grid.filterActive === '.movie' ? 'active' : ''" ng-click="grid.filter('.movie');">Movies</button>
            <button class="btn btn-default" ng-class="grid.filterActive === '.tv' ? 'active' : ''" ng-click="grid.filter('.tv');">TVs</button>
          </div>
        </div>
      </div>
    </div>

    <div class="results-wrapper">
      <div class="row grid">
        {% for item in watched.movies %}
          <div class="col-sm-2-4 grid-item movie" data-name="{{item.name}}" data-date="{{item.watched_on|date('Y-m-d')}}">
            {{ thumbnail.watched(item, 'movie') }}
          </div>
        {% endfor %}
        {% for item in watched.tvs %}
          <div class="col-sm-2-4 grid-item tv" data-name="{{item.name}}" data-date="{{item.episodes[0].watched_on|date('Y-m-d')}}">
            {{ thumbnail.watched(item, 'tv') }}
          </div>
        {% endfor %}
      </div>
    </div>

  </div>
{% endblock %}
