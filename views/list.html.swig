{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  <div ng-controller="GridCtrl as grid" ng-init="grid.init('{{user.key}}');">

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
            <button class="btn btn-primary" ng-class="grid.filterActive === '*' || grid.filterActive === '' ? 'active' : ''" ng-click="grid.filter('*');">All</button>
            <button class="btn btn-primary" ng-class="grid.filterActive === '.movie' ? 'active' : ''" ng-click="grid.filter('.movie');">Movie</button>
            <button class="btn btn-primary" ng-class="grid.filterActive === '.tv' ? 'active' : ''" ng-click="grid.filter('.tv');">TV</button>
          </div>
        </div>
      </div>
    </div>

    <div class="results-wrapper">
      <div class="row grid">
        {% for item in list.items %}
          <div class="col-sm-2-4 grid-item {{item.type}}" data-name="{{item.data.name}}" data-date="{{item.add_on|date('Y-m-d')}}">
            {{ thumbnail.watched(item.data, item.type) }}
          </div>
        {% endfor %}
      </div>
    </div>

  </div>
{% endblock %}
