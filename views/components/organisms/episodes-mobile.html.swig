<div class="content-container visible-xs">
  <div class="episodes-mobile">
    {% for season in seasons|sortSeasons %}
      {% if season.season_number !== 0 and season.episodes|length > 0 %}
        <h3>Season </span>{{season.season_number|zero}}</h3>
        <uib-accordion close-others="true">
          {% for episode in season.episodes %}
            <uib-accordion-group is-disabled="status.isFirstDisabled">
              <uib-accordion-heading>
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
                </span>
                {{episode.episode_number|zero}}. {{episode.name}}
              </uib-accordion-heading>
              <h3>
                Season {{episode.season_number}}, Episode {{episode.episode_number}} : {{episode.name}}<br>
                <small>({{episode.air_date}})</small>
              </h3>
              <p>
                {{episode.overview}}
              </p>
            </uib-accordion-group>
          {% endfor %}
        </uib-accordion>
      {% endif %}
    {% endfor %}
  </div>
</div>
