{% extends '../layout.html.swig' %}

{% block content %}
<div class="content-container">
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <div class="spacer"></div>
      <h1 class="text-inverse">Login</h1>
      <div class="spacer spacer-sm"></div>
      <form action="/login" method="post">
        <div class="form-group">
          <label class="text-inverse" for="username">Username:</label>
          <input type="text" name="username" id="username" class="form-control"/>
        </div>
        <div class="form-group">
          <label class="text-inverse" for="password">Password:</label>
          <input type="password" name="password" id="password" class="form-control"/>
        </div>
        <div class="form-group">
          <input type="submit" value="Log In" class="btn btn-primary"/>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
