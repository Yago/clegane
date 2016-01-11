{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  {% if data.total_pages <= 1000 %}
    {% set max = data.total_pages %}
  {% else %}
    {% set max = 1000 %}
  {% endif %}

  <div class="results-heading">
    {% if type !== 'peoples' %}
      <div class="row">
        <div class="col-sm-6">
    {% endif %}
        <h4>
          {{data.total_results}} Results - {{data.page}}/<span ng-if="page.data.data.total_pages <= 1000">{{page.data.data.total_pages}}</span><span ng-if="page.data.data.total_pages > 1000">1000</span>
        </h4>
        <h1>
          {{query|beautify}} {% if type === 'tvs' %}TV Shows{% else %}{{type}}{% endif %}
        </h1>
    {% if type !== 'peoples' %}
      </div>
      <div class="col-sm-6">
        <div class="btn-group pull-right">
          {% for list in lists %}
            <a href="/{{type}}/{{list}}/1" class="btn btn-default{% if list === query %} active{% endif %}">{{list|beautify}}</a>
          {% endfor %}
        </div>
      </div>
    </div>
    {% endif %}
  </div>

  <div class="results-wrapper">
    <div class="row">
      {% for result in data.results %}
        <div class="col-sm-2-4">
          {% if type === 'movies' %}
            {{ thumbnail.movie(result) }}
          {% elseif type === 'tvs' %}
            {{ thumbnail.tv(result) }}
          {% else %}
            {{ thumbnail.people(result) }}
          {% endif %}
        </div>
        {% if loop.index % 5 == 0 %}
          </div><div class="row">
        {% endif %}
      {% endfor %}
    </div>
  </div>

  {% include "./components/molecules/pagination.html.swig" %}

{% endblock %}
