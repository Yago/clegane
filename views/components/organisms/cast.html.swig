{% import '../molecules/thumbnails.html.swig' as thumbnail %}

{% macro default(credits) %}
<div class="row">
  {% for cast in credits.cast %}
    {% if loop.key <= 3 %}
    <div class="col-sm-3">
      {{ thumbnail.cast(cast) }}
    </div>
    {% endif %}
  {% endfor %}
</div>
<br>
<div ng-controller="CollapseCtrl as collapse">
  <p>
    <button class="btn btn-link" role="button" ng-click="collapse.isCollapsed = !collapse.isCollapsed">Full cast & crew <span class="caret"></span></button>
  </p>

  <div id="cast-wrapper" class="cast-wrapper" uib-collapse="collapse.isCollapsed">
    <table class="table table-striped table-hover">
      <tbody>
        {% for cast in credits.cast %}
          {% if loop.key >= 4 %}
          <tr>
            <td><a href="/people/{{cast.id}}">{{cast.name}}</a></td>
            <td>{{cast.character}}</td>
          </tr>
          {% endif %}
        {% endfor %}
        {% if credits.crew %}
        <tr>
          <td><h3>Crew</h3></td>
          <td></td>
        </tr>
        {% endif %}
        {% for crew in credits.crew %}
          <tr>
            <td><a href="/people/{{crew.id}}">{{crew.name}}</a></td>
            <td>{{crew.job}}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

{% endmacro %}
