{% extends 'layout.html.swig' %}
{% import 'components/atoms/pictures.html.swig' as picture %}
{% import 'components/molecules/thumbnails.html.swig' as thumbnail %}

{% block wrapper-class %}{% endblock %}

{% block content %}
  {% if images[0] %}
    <div class="cover">
      <div class="cover-image">
        {{picture.default(images[0].file_path, 5, 2.38, 'center', 'img-responsive img-full', people.name)}}
      </div>
      <div class="cover-avatar">
        {{picture.default(people.profile_path, 1, 1, 'center', 'img-responsive', people.name)}}
      </div>
    </div>
  {% endif %}
  <div class="content-container content-container-people">
    <div class="whity">
      {% if images[0] %}
      <div class="spacer"></div>
      {% else %}
        {% if people.profile_path %}
          <div class="spacer"></div>
          <div class="row">
            <div class="col-sm-4 col-sm-offset-4">
              <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                  {{picture.default(people.profile_path, 1, 1, 'center', 'img-responsive img-circle', people.name)}}
                </div>
              </div>
            </div>
          </div>
        {% endif %}
      {% endif %}

      <div class="text-center">
        <h1>{{people.name}}</h1>
        <p>{{people.birthday}}{% if people.imdb_id %} - <a href="http://www.imdb.com/name/{{people.imdb_id}}" target="_blank">IMDB</a>{% endif %}</p>
      </div>
      <div class="spacer spacer-sm"></div>
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <p>{{people.biography}}</p>
          <div class="spacer"></div>

          <div ng-controller="PeopleCtrl as people" ng-init="people.getData({{people.id}})">
            <div class="gallery" itemscope itemtype="http://schema.org/ImageGallery">
              <div class="gallery row">
                <figure class="col-xs-4 col-sm-3" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" ng-repeat="(key, image) in people.gallery | orderBy:vote | limitTo:12">
                  <a href="{{api.images}}[[image.file_path]]" itemprop="contentUrl" ng-click="people.openGallery(key); $event.preventDefault();">
                    {{picture.default('[[image.file_path]]', 1, 0.66, 'none', 'img-responsive')}}
                  </a>
                  <div class="spacer spacer-xs"></div>
                </figure>
              </div>
            </div>
          </div>

          <div class="spacer"></div>
        </div>
      </div>

      <div ng-controller="ModalCtrl as modal">
        <button class="btn btn-primary btn-corner" ng-click="modal.open()">
          <i class="cleganicon cleganicon-add"></i>
        </button>
      </div>

      <h2>Known For</h2>
      <div class="row">
        {% set thumbindex = 0 %}
        {% for media in credits.cast|recent %}
          {% if thumbindex <= 4 and media.poster_path and media.year < currentyear %}
            <div class="col-sm-2-4">
              {% if media.media_type === 'movie' %}
                {{ thumbnail.movie(media) }}
              {% else %}
                {{ thumbnail.tv(media) }}
              {% endif %}
            </div>
            {% set thumbindex = thumbindex + 1 %}
          {% endif %}
        {% endfor %}
      </div>
      <br>
      <div ng-controller="CollapseCtrl as collapse">
        <p>
          <button class="btn btn-link" role="button" ng-click="collapse.isCollapsed = !collapse.isCollapsed" aria-expanded="[[!collapse.isCollapsed]]">Full filmography <span class="caret"></span></button>
        </p>

        <div id="cast-wrapper" class="cast-wrapper" ng-cloak uib-collapse="collapse.isCollapsed">
          {% if credits.cast %}
            <h3>Acting</h3>
            <table class="table table-striped table-hover">
              <tbody>
                {% for media in credits.cast|recent %}
                  <tr>
                    <td>{% if media.year === 0 %}-{% else %}{{media.year}}{% endif %}</td>
                    <td><a href="/{{media.media_type}}/{{media.id}}">{{media.heading}}</a> <span class="label label-default pull-right">{{media.media_type}}</span></td>
                    <td>
                      {% if media.character %}
                        {{media.character}}
                      {% else %}
                        <em>-</em>
                      {% endif %}
                    </td>
                  </tr>
                {% endfor %}
              </tbody>
            </table>
          {% endif %}

          {% if credits.crew.length > 0 %}
            <h3>Crew</h3>
            <table class="table table-striped table-hover">
              <tbody>
                {% for media in credits.crew|recent %}
                  <tr>
                    <td>{% if media.year === 0 %}-{% else %}{{media.year}}{% endif %}</td>
                    <td><a href="/{{media.media_type}}/{{media.id}}">{{media.heading}}</a> <span class="label label-default pull-right">{{media.media_type}}</span></td>
                    <td>
                      {% if media.job %}
                        {{media.job}}
                      {% else %}
                        <em>-</em>
                      {% endif %}
                    </td>
                  </tr>
                {% endfor %}
              </tbody>
            </table>
          {% endif %}
        </div>
      </div>

    </div>
  </div>

  {% include "./components/organisms/photoswipe-wrapper.html.swig" %}
  {% include "./components/molecules/modal.html.swig" %}
{% endblock %}
