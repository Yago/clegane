{% extends 'layout.html.swig' %}
{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}
{% import 'components/organisms/cast.html.swig' as cast %}

{% block wrapper-class %}{% endblock %}

{% block content %}
  {% set exist = false %}
  {% set watched = false %}

  {% for item in user.movies %}
    {% if movie.id == item.tmdb_id %}
      {% set exist = true %}
      {% if item.watched %}
        {% set watched = true %}
      {% endif %}
    {% endif %}
  {% endfor %}

  <div class="cover">
    <div class="cover-image">
      {{picture.default(movie.backdrop_path, 5, 2.38, 'center', 'img-responsive img-full', movie.title)}}
    </div>
    <div class="cover-content">
      <div class="content-container">
        <div class="row">
          <div class="col-sm-3">
            <div class="poster-wrapper">
              {{picture.default(movie.poster_path, 1, 0.66, 'none', 'img-responsive', movie.title)}}

              <ul class="list-unstyled">
                {% if movie.release_date %}
                  <li>
                    <h4>Release</h4>
                    {{movie.release_date}}
                  </li>
                {% endif %}
                {% if movie.production_countries %}
                  <li>
                    <h4>Countries</h4>
                    {% for country in movie.production_countries %}{{country.name}}{% if not loop.last %}, {% endif %}{% endfor %}
                  </li>
                {% endif %}
                {% if keywords %}
                  <li>
                    <h4>Keywords</h4>
                    {% for keyword in keywords %}
                      <a href="/tag/{{keyword.id}}/1">{{keyword.name}}</a>{% if not loop.last %},{% endif %}
                    {% endfor %}
                  </li>
                {% endif %}
                {% if movie.imdb_id %}
                  <li>
                    <h4>Links</h4>
                    <a href="http://www.imdb.com/title/{{movie.imdb_id}}" target="_blank">IMDB</a>
                  </li>
                {% endif %}
              </ul>

            </div>
          </div>
          <div class="col-sm-9">
            <h3 ng-controller="WatchCtrl as watched" ng-init="watched.init({{watched}})">
              <button ng-cloak class="btn-link btn-watch"
                      ng-click='watched.movie(
                      "{{user.key}}",
                      "{{movie.id}}",
                      "{{movie.title|quotesafe}}",
                      "{{movie.poster_path}}",
                      {% if movie.imdb_id %}"{{movie.imdb_id}}"{% else %}"null"{% endif %})'>
                <i ng-hide="watched.watched" class="cleganicon cleganicon-unwatched"></i>
                <i ng-show="watched.watched" class="cleganicon cleganicon-eye"></i>
              </button>
              Movie
            </h3>
            <h1>
              {{movie.title}}
              {% if movie.title != movie.original_title %}
                <small>({{movie.original_title}})</small>
              {% endif %}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content-container">
    <div class="row">
      <div class="col-sm-9 col-sm-offset-3">

        <div class="whity">
          <div ng-controller="ModalCtrl as modal">
            <button class="btn btn-primary btn-corner" ng-click="modal.open()">
              <i class="cleganicon cleganicon-add"></i>
            </button>
          </div>
          {% if movie.tagline %}
            <p class="lead">“{{movie.tagline}}”</p>
          {% endif %}

          <p>
            {% for genre in movie.genres %}
              <a href="/genre/{{genre.id}}/1">
                {{genre.name}}
              </a>
              {% if not loop.last %} | {% endif %}
            {% endfor %}
          </p>

          <p>{{movie.overview}}</p>
        </div>

        {% if videos %}
          {% for video in videos %}
            {% if video.site === 'YouTube' && loop.key === 0 %}
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/{{video.key}}" frameborder="0" allowfullscreen></iframe>
              </div>
            {% endif %}
          {% endfor %}
        {% endif %}

        <div class="whity">
          <h2>Cast</h2>
          {{cast.default(credits)}}
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    {% if similar.length %}
    <h2 class="text-inverse">Similar movies</h2>
    <div class="spacer spacer-xs"></div>
    <div class="row">
      {% for movie in similar %}
        {% if loop.key <= 4 %}
          <div class="col-sm-2-4">
            {{ thumbnail.movie(movie) }}
          </div>
        {% endif %}
      {% endfor %}
    </div>
    {% endif %}

  </div>

  {% include "./components/molecules/modal.html.swig" %}
{% endblock %}
