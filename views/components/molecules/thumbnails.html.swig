{% macro movie(content) %}
<a class="thumb" href="/movie/{{content.id}}">
  {{picture.default(content.poster_path, 1, 0.66, 'none', 'img-responsive', content.title)}}
  <span class="thumb-info">
    <h5>{{content.media_type}}</h5>
    <h3>{{content.title}}</h3>
  </span>
</a>
{% endmacro %}

{% macro tv(content) %}
<a class="thumb" href="/tv/{{content.id}}">
  {{picture.default(content.poster_path, 1, 0.66, 'none', 'img-responsive', content.name)}}
  <span class="thumb-info">
    <h5>{{content.media_type}}</h5>
    <h3>{{content.name}}</h3>
  </span>
</a>
{% endmacro %}

{% macro episode(tv, name) %}
<a class="thumb thumb-episode" href="/tv/{{tv.id}}">
  {{picture.default(tv.picture, 1, 0.66, 'none', 'img-responsive', name)}}
  <span class="thumb-info">
    <h5>{{name}}</h5>
    <h3>s{{tv.episodes|lastEpisode.season|zero}}e{{tv.episodes|lastEpisode.episode|zero}}</h3>
  </span>
</a>
{% endmacro %}

{% macro people(content) %}
<a class="thumb" href="/people/{{content.id}}">
  {{picture.default(content.profile_path, 1, 0.66, 'none', 'img-responsive', content.title)}}
  <span class="thumb-info">
    <h5>People</h5>
    <h3>{{content.name}}</h3>
  </span>
</a>
{% endmacro %}

{% macro watched(content, type) %}
<a class="thumb" href="/{{type}}/{{content.tmdb_id}}">
  {{picture.default(content.picture, 1, 0.66, 'none', 'img-responsive', content.name)}}
  <span class="thumb-info">
    <h5>{{type}}</h5>
    <h3>{{content.name}}</h3>
  </span>
</a>
{% endmacro %}

{% macro cast(content) %}
<div class="cast-thumb">
  <a href="/people/{{content.id}}">
    {{picture.default(content.profile_path, 1, 0.66, 'none', 'img-responsive', content.name)}}
  </a>
  <a href="/people/{{content.id}}">
    <h4>{{content.name}}</h4>
  </a>
  <small>{{content.character}}</small>
</div>
{% endmacro %}
