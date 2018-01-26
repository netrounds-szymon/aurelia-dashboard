define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
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
        };
        return App;
    }());
    exports.App = App;
});



define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});



define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});



define('dashboard/dashboard',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dashboard = (function () {
        function Dashboard() {
        }
        return Dashboard;
    }());
    exports.Dashboard = Dashboard;
});



define('index/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Index = (function () {
        function Index() {
        }
        return Index;
    }());
    exports.Index = Index;
});



define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(['./elements/loading-indicator/loading-indicator']);
    }
    exports.configure = configure;
});



define('resources/data-providers/web-api',["require", "exports", "text!./data.json", "../models/employee"], function (require, exports, data, employee_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WebAPI = (function () {
        function WebAPI() {
        }
        WebAPI.prototype.connect = function () {
            try {
                this.jsonData = JSON.parse(data);
            }
            catch (ex) {
                console.log(ex);
            }
        };
        WebAPI.prototype.listEmployee = function () {
            return this.jsonData.map(function (x) { return new employee_1.Employee(x.id, x.name, x.email, x.about); });
        };
        WebAPI.prototype.getEmployee = function (id) {
            var found = this.jsonData.filter(function (x) { return x.id == id; })[0];
            return new employee_1.Employee(found.id, found.name, found.email, found.about);
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
});



define('resources/models/employee',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Employee = (function () {
        function Employee(id, name, email, about) {
            this.id = id;
            this.name = name;
            this.about = about;
            this.email = email;
        }
        return Employee;
    }());
    exports.Employee = Employee;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/employee-container/employee-container',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../data-providers/web-api", "../employee-list/employee-list-messages"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, employee_list_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeeContainer = (function () {
        function EmployeeContainer(api, ea) {
            var _this = this;
            this.api = api;
            this.title = "Employee of the month";
            api.connect();
            ea.subscribe(employee_list_messages_1.EmployeeListSelected, function (msg) {
                _this.employee = msg.employee;
            });
        }
        EmployeeContainer = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], EmployeeContainer);
        return EmployeeContainer;
    }());
    exports.EmployeeContainer = EmployeeContainer;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/loading-indicator/loading-indicator',["require", "exports", "nprogress", "aurelia-framework"], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
            this.loading = false;
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        };
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], LoadingIndicator.prototype, "loading", void 0);
        LoadingIndicator = __decorate([
            aurelia_framework_1.noView(['nprogress/nprogress.css'])
        ], LoadingIndicator);
        return LoadingIndicator;
    }());
    exports.LoadingIndicator = LoadingIndicator;
});



define('resources/elements/employee-list/employee-list-messages',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeeListSelected = (function () {
        function EmployeeListSelected(employee) {
            this.employee = employee;
        }
        return EmployeeListSelected;
    }());
    exports.EmployeeListSelected = EmployeeListSelected;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/employee-list/employee-list',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../data-providers/web-api", "./employee-list-messages"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, employee_list_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeeList = (function () {
        function EmployeeList(api, ea) {
            this.api = api;
            this.ea = ea;
            this.title = "Select employee of the month";
            this.selectedId = 0;
        }
        EmployeeList.prototype.created = function () {
            this.api.connect();
            this.employees = this.api.listEmployee();
        };
        EmployeeList.prototype.select = function (employee) {
            this.selectedId = employee.id;
            this.ea.publish(new employee_list_messages_1.EmployeeListSelected(employee));
            return true;
        };
        EmployeeList = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator),
            __metadata("design:paramtypes", [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], EmployeeList);
        return EmployeeList;
    }());
    exports.EmployeeList = EmployeeList;
});



define('text!resources/data-providers/data.json',[],function () { return '[\n  {\n    "id": 1,\n    "name": "Billie Byrd",\n    "email": "billiebyrd@kneedles.com",\n    "about": "Deserunt ipsum consectetur aute nisi Lorem fugiat esse voluptate ut veniam reprehenderit elit in officia. Magna deserunt enim ea in eu laborum laborum aliqua ut aliquip occaecat. Anim aute ad in adipisicing anim officia veniam commodo adipisicing nulla occaecat. Labore tempor nisi id do proident ea in nisi. Incididunt cillum consequat et labore est. Qui mollit cillum exercitation id anim eu tempor. Esse cillum adipisicing officia duis consequat.\\r\\n"\n  },\n  {\n    "id": 2,\n    "name": "Gail Lott",\n    "email": "gaillott@kneedles.com",\n    "about": "Ex voluptate eiusmod aliquip nulla in esse deserunt consequat aute et cupidatat amet adipisicing id. In minim non duis proident nisi enim reprehenderit. Voluptate cillum minim nostrud culpa dolore sunt in. Ad cillum aliqua irure Lorem Lorem ipsum do. Esse aute sunt nulla reprehenderit adipisicing mollit minim enim aliqua velit exercitation.\\r\\n"\n  },\n  {\n    "id": 3,\n    "name": "Olson Sanford",\n    "email": "olsonsanford@kneedles.com",\n    "about": "Labore occaecat cillum ut pariatur cillum ea ad quis irure esse reprehenderit minim sunt. Nisi commodo consectetur Lorem tempor amet excepteur laborum. Ea aliqua eiusmod voluptate non nulla nostrud fugiat laboris commodo ut eiusmod minim. Exercitation magna eiusmod occaecat quis velit reprehenderit do sunt duis.\\r\\n"\n  },\n  {\n    "id": 4,\n    "name": "Florence Rosa",\n    "email": "florencerosa@kneedles.com",\n    "about": "Nostrud enim ut cillum commodo id duis. Exercitation ex ullamco eiusmod sunt. Elit exercitation reprehenderit commodo elit incididunt consequat ad voluptate ut aliqua ex cupidatat id consequat. Ad nulla irure elit eiusmod culpa laboris fugiat anim sit velit in Lorem elit. Mollit ipsum duis laborum dolor cupidatat. Sit reprehenderit ad pariatur consectetur.\\r\\n"\n  },\n  {\n    "id": 5,\n    "name": "Kristi Mayer",\n    "email": "kristimayer@kneedles.com",\n    "about": "Est do esse adipisicing do reprehenderit non consequat officia occaecat consectetur. Qui anim incididunt aliquip irure do non. Ex laboris id id sunt duis ex elit nostrud velit tempor elit proident laborum.\\r\\n"\n  },\n  {\n    "id": 6,\n    "name": "Toni Mathis",\n    "email": "tonimathis@kneedles.com",\n    "about": "Aliqua exercitation velit qui culpa adipisicing deserunt magna enim adipisicing qui occaecat laborum aute nostrud. Ipsum adipisicing incididunt excepteur consequat laborum ullamco. Deserunt labore nisi proident ut. Tempor occaecat deserunt velit labore.\\r\\n"\n  },\n  {\n    "id": 7,\n    "name": "Jarvis Weeks",\n    "email": "jarvisweeks@kneedles.com",\n    "about": "Sit adipisicing commodo veniam occaecat in sunt ullamco. Culpa aliqua adipisicing nisi aute sit eu deserunt enim est magna Lorem eiusmod. Mollit magna commodo aliqua sunt reprehenderit consectetur quis. Magna elit fugiat est elit ea nisi sunt tempor amet aliquip ea.\\r\\n"\n  },\n  {\n    "id": 8,\n    "name": "Berta Dickson",\n    "email": "bertadickson@kneedles.com",\n    "about": "Qui occaecat officia irure eiusmod deserunt est. Tempor voluptate id mollit adipisicing sunt commodo irure et ullamco ad. Reprehenderit officia occaecat magna ex nulla ex fugiat dolor adipisicing veniam ex.\\r\\n"\n  },\n  {\n    "id": 9,\n    "name": "Pace Mccormick",\n    "email": "pacemccormick@kneedles.com",\n    "about": "Esse labore laboris excepteur et cupidatat est consectetur ex minim. Laboris eiusmod sit culpa proident laborum pariatur laboris ex excepteur. Amet ea nulla sunt aute sunt. Consequat do amet veniam cillum sit adipisicing ipsum pariatur deserunt elit. Elit qui laborum exercitation fugiat aliqua ipsum.\\r\\n"\n  },\n  {\n    "id": 10,\n    "name": "Lindsey Powell",\n    "email": "lindseypowell@kneedles.com",\n    "about": "Aliqua voluptate mollit dolore ullamco sint. Amet est sit ullamco laborum dolor elit. Ipsum ad consectetur ea exercitation irure cillum elit enim incididunt dolor ut consectetur ullamco.\\r\\n"\n  },\n  {\n    "id": 11,\n    "name": "Eloise Gonzales",\n    "email": "eloisegonzales@kneedles.com",\n    "about": "Ullamco sit occaecat occaecat adipisicing labore quis velit. Id laboris laboris laboris aliqua ea ex irure sunt ea aliquip reprehenderit fugiat ex dolore. Ad qui do sit aute consequat. Do ad id adipisicing mollit deserunt culpa mollit veniam sunt tempor nulla quis. Deserunt cillum magna sunt pariatur labore deserunt est in et. Reprehenderit magna velit fugiat qui ea velit proident consectetur labore esse nisi culpa voluptate.\\r\\n"\n  }\n]';});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><i class=\"fa fa-user\"></i> <span><a href=\"#\">Aurelia Dashboard demo</a></span></a></div></nav><loading-indicator loading.bind=\"router.isNavigating\"></loading-indicator><div class=\"container\" style=\"padding-top:10px\"><div class=\"row\"><router-view class=\"col\"></router-view></div></div></template>"; });
define('text!dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/elements/employee-list/employee-list\"></require><require from=\"../resources/elements/employee-container/employee-container\"></require><div class=\"row\"><employee-list class=\"col\"></employee-list><employee-container class=\"col\"></employee-container></div></template>"; });
define('text!index/index.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><h1 class=\"display-4\">Hello, world!</h1><p class=\"lead\">This is a simple page which shows how easily is to create web apps in aurelia.</p><hr class=\"my-4\"><p class=\"lead\"><a class=\"btn btn-primary btn-lg\" href=\"#dashboard\" role=\"button\">Go to dashboard</a></p></div></template>"; });
define('text!resources/elements/employee-container/employee-container.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div class=\"card-header\"> ${title} </div><div class=\"card-body\"><h5 class=\"card-title\">${employee.name}</h5><h6 class=\"card-subtitle mb-2 text-muted\">${employee.email}</h6><p class=\"card-text\">${employee.about}</p></div></div></template>"; });
define('text!resources/elements/employee-list/employee-list.html', ['module'], function(module) { module.exports = "<template><div class=\"card\"><div class=\"card-header\"> ${title} </div><div class=\"card-body\"><div class=\"list-group\"><a href=\"#dashboard\" repeat.for=\"employee of employees\" class=\"list-group-item list-group-item-action ${employee.id === $parent.selectedId ? 'active' : ''}\" click.delegate=\"$parent.select(employee)\"> ${employee.name} </a></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map