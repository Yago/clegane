{% macro default(original, size, ratio, gravity, classes, alt) %}
{% if original %}
  {% set image = api.images + original %}
{% else %}
  {% set image = 'http://i.imgur.com/FOKzIc4.png' %}
{% endif %}
<picture{% if not original %} class="placeholder"{% endif %}>
  {%if size >= '5'%}
  <source
    media="(min-width: 1200px)"
    srcset="{{image|resize('1920', ratio, gravity)}} 1x, {{image|resize('2880', ratio, gravity)}} 2x">
  {% endif %}
  {%if size >= '4'%}
  <source
    media="(min-width: 980px)"
    srcset="{{image|resize('1200', ratio, gravity)}} 1x, {{image|resize('2400', ratio, gravity)}} 2x">
  {% endif %}
  {%if size >= '3'%}
  <source
    media="(min-width: 770px)"
    srcset="{{image|resize('980', ratio, gravity)}} 1x, {{image|resize('1960', ratio, gravity)}} 2x">
  {% endif %}
  {%if size >= '2'%}
  <source
    media="(min-width: 401px)"
    srcset="{{image|resize('770', ratio, gravity)}} 1x, {{image|resize('1440', ratio, gravity)}} 2x">
  {% endif %}
  {%if size >= '1'%}
  <source
     srcset="{{image|resize('400', ratio, gravity)}} 1x, {{image|resize('800', ratio, gravity)}} 2x">
  {% else %}
  <source
     media="(max-width: 400px)"
     srcset="{{image|resize('400', ratio, gravity)}} 1x, {{image|resize('800', ratio, gravity)}} 2x">
  {% endif %}
  <img src="{%if size >= '5'%}{{image|resize('1920', ratio, gravity)}}{% elseif size >= '4'%}{{image|resize('1200', ratio, gravity)}}{% elseif size >= '3'%}{{image|resize('980', ratio, gravity)}}{% elseif size >= '2'%}{{image|resize('770', ratio, gravity)}}{% else %}{{image|resize('400', ratio, gravity)}}{% endif %}" alt="{{alt}}" class="{{classes}}">
</picture>
{% endmacro %}
