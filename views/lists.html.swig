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

  </div>
{% endblock %}
