{% extends '../layout.html.swig' %}

{% block content %}
<div class="content-container">
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <div class="spacer"></div>
      <h1 class="text-inverse">Signup</h1>
      <div class="spacer spacer-sm"></div>
      <form action="/signup" method="post">
        <div class="form-group">
          <label class="text-inverse" for="username">Username:</label>
          <input type="text" id="username" name="username" class="form-control" required />
        </div>
        <div class="form-group">
          <label class="text-inverse" for="email">Email:</label>
          <input type="email" id="email" name="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label class="text-inverse" for="password">Password:</label>
          <input type="password" id="password" name="password" class="form-control" required />
        </div>
        <div class="form-group">
          <input type="submit" value="Submit" class="btn btn-primary"/>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
