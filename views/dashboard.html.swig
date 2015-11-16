{% extends 'layout.html.swig' %}
{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block wrapper-class %}dashboard{% endblock %}

{% block content %}

  {% set picksItem = picks.items[picks.items|length - 1] %}

  <div class="cover">
    <div class="cover-image">
      <a href="/movie/{{picksItem.id}}">
        {{picture.default(picksItem.backdrop_path, 5, 2.38, 'center', 'img-responsive img-full', movie.title)}}
        <div class="cover-content">
          <div class="content-container">
            <h3>Clegane's weekly picks</h3>
            <h1>{{picksItem.title}}</h1>
            <div class="spacer spacer-sm"></div>
          </div>
        </div>
      </a>
    </div>
  </div>

  <div class="content-container">
    <div class="row">
      <div class="col-sm-8">
        <h3 class="text-inverse">Movies recently watched</h3>
        <div class="row">
          {% set i = 1 %}
          {% for movie in user.movies|sortWatchDate %}
            {% if movie.watched and i <= 3 %}
              {% set i = i + 1 %}
              <div class="col-sm-4">
                {{ thumbnail.watched(movie, 'movie') }}
              </div>
            {% endif %}
          {% endfor %}
        </div>
      </div>
      <div class="col-sm-4">
        <h3 class="text-inverse">Your lists</h3>
        <div class="btn-list">
          {% for list in user.lists|sortNames %}
            <a class="btn btn-default" href="/list/{{list.id}}">{{list.name}}</a>
          {% endfor %}
        </div>
      </div>
    </div>

    <h3 class="text-inverse">Last episode watched</h3>
    <div class="row">
      {% set j = 1 %}
      {% for tv in user.tvs|sortLastViewDate %}
        {% if tv.episodes|length > 0 and j <= 5 %}
          {% set j = j + 1 %}
          <div class="col-sm-2-4">
            {{ thumbnail.episode(tv, tv.name) }}
          </div>
        {% endif %}
      {% endfor %}
    </div>

  </div>

  <div class="spacer"></div>

{% endblock %}
