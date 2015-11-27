<header class="mobile-header visible-sm visible-xs" ng-class="mobile.open === true ? 'mobile-header-push' : ''">
  <button ng-click="mobile.toggleMenu();" class="navbar-toggle">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <button ng-controller="ModalCtrl as modal" ng-click="modal.search()" class="btn-search">
    <i class="glyphicon glyphicon-search"></i>
  </button>
  <a href="/">
    <i class="cleganicon cleganicon-clegane cleganicon-2x"></i>
  </a>
</header>
