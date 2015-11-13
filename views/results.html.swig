{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}

  <div class="results-heading">
    <h4>
      {{data.total_results}} Results - {{data.page}}/{{data.total_pages}}
    </h4>
    <h1>
      {% if type === 'search' %}
        {{query}}
      {% elseif genre %}
        {{genre.name}}
      {% elseif tag %}
        {{tag.name}}
      {% endif %}
    </h1>
  </div>

  <div class="results-wrapper">
    <div class="row">
      {% for result in data.results %}
        <div class="col-sm-2-4">
          {% if result.media_type === 'movie' || genre || tag %}
            {{ thumbnail.movie(result) }}
          {% else %}
            {{ thumbnail.tv(result) }}
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
