{% if data.total_pages > 1 %}
  {% if data.total_pages <= 1000 %}
    {% set max = data.total_pages %}
  {% else %}
    {% set max = 1000 %}
  {% endif %}
  <nav class="text-center">
    <ul class="pagination">
      <li{% if data.page === 1 %} class="disabled"{% endif %}>
        <a href="/{{type}}/{{query}}/1" aria-label="First page">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li{% if data.page === 1 %} class="disabled"{% endif %}>
        <a href="/{{type}}/{{query}}/{{data.page|previous}}" aria-label="Previous">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      {% for i in max|paginationArray(data.page) %}
        <li{% if data.page === i %} class="active"{% endif %}><a href="/{{type}}/{{query}}/{{i}}">{{i}}</a></li>
      {% endfor %}
      <li{% if data.page === max %} class="disabled"{% endif %}>
        <a href="/{{type}}/{{query}}/{{data.page|next(max)}}" aria-label="Next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li{% if data.page === max %} class="disabled"{% endif %}>
        <a href="/{{type}}/{{query}}/{{max}}" aria-label="Last page">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
{% endif %}
