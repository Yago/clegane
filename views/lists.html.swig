{% extends 'layout.html.swig' %}

{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block content %}
  <div>

    <div class="results-heading">
      <h4>
        {{lists|length}} lists
      </h4>
      <h1>My lists</h1>
    </div>

    {% if watched.movies|length > 0 or watched.tvs|length > 0 %}
      <div class="results-wrapper">
        <div class="row list-row">
          {% for list in lists|sortNames %}
            <div class="col-sm-4 list-col">
              <a href="/list/{{list.id}}" class="list-card">
                <div class="row">
                  {% if list.items|length > 0 %}
                    {% for item in list.items|sortAddDate %}
                      {% if loop.index <= 3 %}
                        <div class="col-xs-4">
                          {{picture.default(item.data.picture, 1, 0.66, 'none', 'img-responsive', item.data.name)}}
                        </div>
                      {% endif %}
                    {% endfor %}
                    {% if list.items|length < 2 %}
                      <div class="col-xs-8">
                        {{picture.default(nothing, 1, 1.32, 'none', 'img-responsive', item.data.name)}}
                      </div>
                    {% endif %}
                    {% if list.items|length == 2 %}
                      <div class="col-xs-4">
                        {{picture.default(nothing, 1, 0.66, 'none', 'img-responsive', item.data.name)}}
                      </div>
                    {% endif %}
                  {% else %}
                    {{picture.default(nothing, 1, 1.98, 'none', 'img-responsive', item.data.name)}}
                  {% endif %}
                </div>
                <div class="list-card-content text-center">
                  <h3>{{list.name}}</h3>
                  <p>
                    {{list.items|length}} items
                  </p>
                </div>
              </a>
            </div>
            {% if loop.index % 3 == 0 %}
        </div><div class="row list-row">
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% else %}
      <div class="container">
        <div class="spacer spacer-xl"></div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <div class="bubble-wrapper">
              <div class="bubble bubble-right">
                Would you like to create lists with me based on <a href="/movies/popular/1">movies</a>, <a href="/tvs/popular/1">TV shows</a> or <a href="/peoples/popular/1">peoples</a> ?
              </div>
              <img class="logo" src="/svg/saw.svg" onerror="this.onerror=null; this.src='/img/saw.png'" alt="Saw by Smashicons" />
            </div>
          </div>
        </div>
      </div>
    {% endif %}

  </div>
{% endblock %}
