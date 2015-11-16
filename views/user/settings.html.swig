{% extends '../layout.html.swig' %}

{% block content %}
<div class="content-container">
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <div class="spacer"></div>
      <h1 class="text-inverse">Settings</h1>
      <br>
      <form action="/settings" method="post">
        <div class="form-group">
          <label class="text-inverse" for="username">Username:</label>
          <input type="text" name="username" id="username" value="{{ user.username }}" class="form-control"/>
        </div>
        <div class="form-group">
          <label class="text-inverse" for="email">Email:</label>
          <input type="text" name="email" id="email" value="{{ user.email }}" class="form-control"/>
        </div>
        <div class="form-group">
          <label class="text-inverse" for="password">New password :</label>
          <input type="password" name="password" id="password" class="form-control"/>
        </div>
        <div class="form-group">
          <input type="submit" value="Save" class="btn btn-primary"/>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
