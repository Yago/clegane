{% extends 'layout.html.swig' %}

{% block content %}

  <div class="content-container">
    <div class="whity">
      <div class="spacer spacer-sm"></div>
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          <div class="text-center">
            <img src="/svg/clegane.svg" onerror="this.onerror=null; this.src='/img/clegane.png'" alt="Clegane identity" class="img-responsive center-block" />
          </div>
          <div class="spacer spacer-md"></div>
          <p>
            Coded and maintained by the open-source comunity, <b>Clegane</b> is a forever free and fully open-source web application based on JavaScript technologies. The idea is to create a JS playground, but also a nice looking app to manage any movies or TV shows.
          </p>
          <div class="row text-center librairies">
            <div class="col-sm-2-4">
              <a href="http://gulpjs.com/"><i class="cleganicon cleganicon-gulp cleganicon-4x"></i></a>
            </div>
            <div class="col-sm-2-4">
              <a href="https://nodejs.org/en/"><i class="cleganicon cleganicon-node cleganicon-5x"></i></a>
            </div>
            <div class="col-sm-2-4">
              <div class="spacer spacer-xs"></div>
              <a href="https://www.mongodb.org/"><i class="cleganicon cleganicon-mongodb cleganicon-4x"></i></a>
            </div>
            <div class="col-sm-2-4">
              <a href="https://angular.io/"><i class="cleganicon cleganicon-angular cleganicon-5x"></i></a>
            </div>
            <div class="col-sm-2-4">
              <div class="spacer spacer-xs"></div>
              <a href="http://expressjs.com/"><i class="cleganicon cleganicon-express cleganicon-4x"></i></a>
            </div>
          </div>
          <a class="pull-right" href="https://github.com/Yago/clegane/blob/dev/package.json">View all the librairies</a>
          <div class="spacer spacer-xs"></div>

          <h2>Who's behind</h2>
          <div class="spacer spacer-xs"></div>
          <div class="media">
            <div class="media-left">
              <a href="https://github.com/yago">
                <img src="https://avatars3.githubusercontent.com/u/2025924" alt="Yago, Yann Gouffon" class="media-object img-circle">
              </a>
            </div>
            <div class="media-body">
              <a href="https://github.com/yago"><h3>Yann Gouffon</h3></a>
              <p>
                Occasional Designer and rainbow coder who focuses on modular, performant and maintainable web development, he's in love with full-stack JavaScript technologies&nbsp;!
              </p>
            </div>
          </div>

          <div class="spacer spacer-xs"></div>
          <h2>Partners</h2>
          <p>
            Nothing would be possible without them :D
          </p>
          <div class="row row-guttered">
            <div class="col-sm-6">
              <a href="https://www.themoviedb.org/">
                <img src="https://assets.tmdb.org/images/logos/var_1_1_PoweredByTMDB_Blk_Logo_Antitled.png" class="img-responsive">
              </a>
            </div>
            <div class="col-sm-6"></div>
          </div>

          <div class="spacer"></div>

        </div>
      </div>
    </div>
  </div>

{% endblock %}
