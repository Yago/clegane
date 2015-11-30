<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}Clegane{% endblock %}</title>
    <meta name="viewport" content="width=device-width">
    <link href="/css/vendors.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <script src="https://use.typekit.net/sgl6zav.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
    <!--[if lt IE 9]>
      <script src="/js/polyfills.min.js"></script>
    <![endif]-->
</head>
<body ng-app="CleganeApp">

  <div class="main-wrapper{% if not isAuthenticated %} main-wrapper-visitor{% endif %}" ng-controller="MobileCtrl as mobile" ng-swipe-left="mobile.closeMenu();">

    {% if isAuthenticated %}
      {% include "./components/organisms/mobile-header.html.swig" %}
      {% include "./components/organisms/sidebar.html.swig" %}
    {% endif %}

    <div class="content-wrapper" >
      <div class="{% block wrapper-class %}container-fluid{% endblock %}">
        {% if flashes %}
          <div class="messages">
            {% if flashes.error %}
              <div class="alert alert-danger" role="alert">{{ flashes.error }} {{ flashes.truc }}</div>
            {% endif %}
            {% if flashes.success %}
              <div class="alert alert-success" role="alert">{{ flashes.success }}</div>
            {% endif %}
            {% if flashes.info %}
              <div class="alert alert-info" role="alert">{{ flashes.info }}</div>
            {% endif %}
          </div>
        {% endif %}
        {% block content %}{% endblock %}
      </div>
      <div class="spacer spacer-sm"></div>
    </div>

  </div>

  {% if isAuthenticated %}
    <script type="text/ng-template" id="modal-search">
      <div class="modal-body modal-search">
        <button class="btn btn-primary btn-corner" ng-click="search.close()">
          <i class="cleganicon cleganicon-close"></i>
        </button>
        <h2>Search</h2>
        {% include "./components/molecules/search.html.swig" %}
      </div>
    </script>
  {% endif %}

  {% block scripts %}
    <script src="/js/vendors.min.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/angular-vendors.min.js"></script>
    <script src="/js/angular-app.js"></script>
  {% endblock %}
</body>
</html>
