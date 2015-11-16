<div class="sidebar">
  <div class="sidebar-content">
    <header class="text-center">
      <a href="/" class="brand">
        <i class="cleganicon cleganicon-clegane cleganicon-4x"></i>
      </a>
    </header>
    <div class="search-wrapper" ng-controller="SearchCtrl as search">
      {% include "../molecules/search.html.swig" %}
    </div>
    <nav class="sidenav">
      <ul class="list-unstyled">
        <li><a href="#"><i class="cleganicon cleganicon-fire"></i> Hot</a></li>
      </ul>
      <h5>Discover</h5>
      <ul class="list-unstyled">
        <li><a href="/movies/popular/1"><i class="cleganicon cleganicon-film"></i> Movies</a></li>
        <li><a href="/tvs/popular/1"><i class="cleganicon cleganicon-television"></i> TV Shows</a></li>
        <li><a href="/peoples/popular/1"><i class="cleganicon cleganicon-oscar"></i> People</a></li>
      </ul>
      <h5>{{ user.username }}</h5>
      <ul class="list-unstyled">
        <li><a href="/watched"><small><i class="cleganicon cleganicon-eye"></i></small> Watched</a></li>
        <li><a href="/lists"><i class="cleganicon cleganicon-film"></i> My lists</a></li>
        <li><a href="/settings"><i class="cleganicon cleganicon-cog"></i> Settings</a></li>
        <li><a href="/logout"><i class="cleganicon cleganicon-out"></i> Logout</a></li>
      </ul>
    </nav>
  </div>
</div>
