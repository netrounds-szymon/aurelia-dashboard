import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Dashboard';
    config.map([
      {
        route: '',
        moduleId: './index/index',
        title: 'Main page'
      },
      {
        route: '/dashboard/',
        moduleId: './dashboard/dashboard',
        title: 'Dashboard'
      },
    ]);

    this.router = router;
  }
}