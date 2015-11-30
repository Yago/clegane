<div ng-cloak class="episodes-wrapper hidden-xs" ng-class="{in: episodes.episodeOpen}" ng-init="episodes.init({{tv.seasons|length}})" ng-controller="EpisodesCtrl as episodes">
  <tabset vertical="true" type="tabs">
    {% for season in seasons|sortSeasons %}
      {% if season.season_number !== 0 and season.episodes|length > 0 %}
        <tab select="episodes.selectSeason({{tv.id}}, {{season.season_number}})">
          <tab-heading>
            s<span class="hidden-xs" ng-hide="episodes.episodeOpen">eason </span>{{season.season_number|zero}}
          </tab-heading>
          <div>
            <tabset vertical="true" type="tabs">
              {% for episode in season.episodes %}
                <tab active="{% if loop.index == 1 %}episodes.seasonOpen[{{season.season_number}}]{% else %}false{% endif %}" select="episodes.selectEpisode({{tv.id}}, {{season.season_number}}, {{loop.index}})">
                  <tab-heading>
                    <span class="watch-toggle" ng-controller="WatchCtrl as watched">
                      <input
                        type="checkbox"
                        ng-model="watched.episode{{episode.episode_number}}"
                        ng-click="watched.episode(
                          '{{user.key}}',
                          '{{tv.id}}',
                          '{{tv.name|quotesafe}}',
                          '{{tv.poster_path}}',
                          '{{season.season_number}}',
                          '{{episode.episode_number}}',
                          '{{episode.id}}',
                          '{{episode.name|quotesafe}}',
                          '{{ids.imdb_id}}'
                        ); $event.stopPropagation();"
                        ng-checked="{{episode.watched}}">
                      <span class="icon-wrapper">
                        <i class="cleganicon cleganicon-unwatched"></i>
                        <i class="cleganicon cleganicon-eye"></i>
                      </span>
                    </span> e<span ng-hide="episodes.episodeOpen">pisode </span>{{episode.episode_number|zero}}
                  </tab-heading>
                  <h3>
                    Season {{episode.season_number}}, Episode {{episode.episode_number}} : {{episode.name}}<br>
                    <small>({{episode.air_date}})</small>
                  </h3>
                  <div class="spacer spacer-xs"></div>

                  <div id="episode-gallery-[[episodes.seasonnumber]][[episodes.number]]" class="episode-gallery" itemscope itemtype="http://schema.org/ImageGallery">
                    <div class="episode-gallery-container">
                      <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" ng-repeat="(key, image) in episodes.images | limitTo:2">
                        <a href="{{api.images}}[[image.file_path]]" itemprop="contentUrl" ng-click="episodes.openGallery(key); $event.preventDefault();">
                          {{picture.default('[[image.file_path]]', 2, 1.77, 'none', 'img-responsive', 'Season [[episodes.seasonnumber]], Episode [[episodes.number]] : [[episodes.title]]')}}
                        </a>
                      </figure>
                    </div>
                  </div>
                  <div class="spacer spacer-sm"></div>
                  <p>
                    {{episode.overview}}
                  </p>
                </tab>
              {% endfor %}
            </tabset>
          </div>
        </tab>
      {% endif %}
    {% endfor %}
  </tabset>
</div>
