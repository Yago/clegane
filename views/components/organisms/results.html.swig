<div class="row">
  <div class="col-sm-3" ng-repeat="(key, result) in search.results">
    <a href="/[[result.media_type]]/[[result.id]]">
      <span ng-if="result.poster_path">
        <img src="{{api.images}}[[result.poster_path]]" class="img-responsive" />
      </span>
      <span ng-if="result.profile_path">
        <img src="{{api.images}}[[result.profile_path]]" class="img-responsive" />
      </span>
      <h4 ng-if="result.title">
        [[result.title]]
      </h4>
      <h4 ng-if="result.name">
        [[result.name]]
      </h4>
    </a>
  </div>
</div>
