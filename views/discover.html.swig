{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}

  <div class="results-heading">
    <div class="row">
      <div class="col-sm-6">
        <h4>
          {{data.total_results}} Results - {{data.page}}/{{data.total_pages}}
        </h4>
        <h1>
          {{query|beautify}} {{type}}
        </h1>
      </div>
      <div class="col-sm-6">
        <div class="btn-group pull-right" uib-dropdown>
          {% for list in lists %}
            <a href="/{{type}}/{{list}}/1" class="btn btn-default{% if list === query %} active{% endif %}">{{list|beautify}}</a>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>

  <div class="results-wrapper">
    <div class="row">
      {% for result in data.results %}
        <div class="col-sm-2-4">
          {{ thumbnail.movie(result) }}
        </div>
        {% if loop.index % 5 == 0 %}
          </div><div class="row">
        {% endif %}
      {% endfor %}
    </div>
  </div>

  {% include "./components/molecules/pagination.html.swig" %}

{% endblock %}
