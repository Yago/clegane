{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  <div ng-controller="GridCtrl as grid" ng-init="grid.init('{{user.key}}', 'ascending');">

    <div class="results-heading">
      <div class="row">
        <div class="col-sm-5">
          <h4>
            {{list.items|length}} Items
          </h4>
          <h1>{{list.name}}</h1>
        </div>
        <div class="col-sm-7">
          <div class="btn-group pull-right" uib-dropdown>
            <button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">
              Sort <span class="caret"></span>
            </button>
            <ul ng-cloak class="uib-dropdown-menu" role="menu" aria-labelledby="single-button">
              <li role="menuitem" ng-class="grid.sortActive === 'name' ? 'active' : ''"><a href="#" ng-click="grid.sort('name');">Sort by name</a></li>
              <li role="menuitem" ng-class="grid.sortActive === 'date' ? 'active' : ''"><a href="#" ng-click="grid.sort('date');">Sort by added date</a></li>
            </ul>
          </div>

          <div class="btn-group pull-right" uib-dropdown>
            <button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">
              Filter <span class="caret"></span>
            </button>
            <ul ng-cloak class="uib-dropdown-menu" role="menu" aria-labelledby="single-button">
              <li role="menuitem" ng-class="grid.filterActive === '*' || grid.filterActive === '' ? 'active' : ''"><a href="#" ng-click="grid.filter('*');">All</a></li>
              <li role="menuitem" ng-class="grid.filterActive === '.movie' ? 'active' : ''"><a href="#" ng-click="grid.filter('.movie');">Movies</a></li>
              <li role="menuitem" ng-class="grid.filterActive === '.tv' ? 'active' : ''"><a href="#" ng-click="grid.filter('.tv');">TVs</a></li>
              <li role="menuitem" ng-class="grid.filterActive === '.people' ? 'active' : ''"><a href="#" ng-click="grid.filter('.people');">Peoples</a></li>
            </ul>
          </div>

          <div class="btn-group pull-right" uib-dropdown>
            <button class="btn btn-primary" ng-class="grid.filterActive === '*' || grid.filterActive === '' ? 'active' : ''" ng-click="grid.filter('*');">All</button>
            <button class="btn btn-primary" ng-class="grid.filterActive === '.not-watched' ? 'active' : ''" ng-click="grid.filter('.not-watched');">To watch</button>
            <button class="btn btn-primary" ng-class="grid.filterActive === '.watched' ? 'active' : ''" ng-click="grid.filter('.watched');">Watched</button>
          </div>
        </div>
      </div>
    </div>

    <div class="results-wrapper">
      <div class="row grid">
        {% for item in list.items|sortAddDate %}
          <div class="col-sm-2-4 grid-item {{item.type}}{% if item.data.watched or items.data.episodes|length > 0 %} watched{% else %} not-watched{% endif %}" data-name="{{item.data.name}}" data-date="{{item.add_on|date('Y-m-d')}}">
            {{ thumbnail.watched(item.data, item.type) }}
          </div>
        {% endfor %}
      </div>
    </div>

  </div>
{% endblock %}
