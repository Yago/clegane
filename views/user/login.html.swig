{% extends '../layout.html.swig' %}

{% block content %}
<div class="row">
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Login</h1>
    <div class="spacer spacer-sm"></div>
    <form action="/login" method="post">
      <div class="form-group">
        <label>Username:</label>
        <input type="text" name="username" class="form-control"/>
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" name="password" class="form-control"/>
      </div>
      <div class="form-group">
        <input type="submit" value="Log In" class="btn btn-primary"/>
      </div>
    </form>
  </div>
</div>
{% endblock %}
