(function () {
    'use strict';

    angular.module('app')
        .config(httpConfig)
        .config(dialogConfig)
    ;

    httpConfig.$inject = ['$httpProvider'];
    function httpConfig($httpProvider) {

        $httpProvider.interceptors.push(httpInterceptor);

    }

    httpInterceptor.$inject = ['$q', '$injector', '$localStorage', '$sessionStorage', 'APP_CONST'];
    function httpInterceptor($q, $injector, $localStorage, $sessionStorage, APP_CONST) {
        return {
            'request': function (request) {

                var authToken = $sessionStorage[APP_CONST.STORAGE.AUTH_TOKEN] || $localStorage[APP_CONST.STORAGE.AUTH_TOKEN] || '';
                if (authToken) {
                    request.headers['Authorization'] = 'Bearer ' + authToken;
                }

                return request;
            },
            'response': function (response) {
                return response;
            },
            'responseError': function (rejection) {

                var state = $injector.get('$state');
                var toaster = $injector.get('toaster');
                switch (rejection.status) {
                    case 400: {
                        toaster.pop('error', '参数错误', rejection.data.message);
                        break;
                    }
                    case 403: {
                        toaster.pop('error', '访问未授权', rejection.data.message);
                        break;
                    }
                    case 500: {
                        toaster.pop('error', '服务端错误', rejection.data.message);
                        break;
                    }
                    case 401: {
                        state.go('access.login');
                        break;
                    }
                    case 404: {
                        state.go('access.404');
                        break;
                    }
                    default : {

                        break;
                    }
                }

                return $q.reject(rejection);
            }
        };
    }

    dialogConfig.$inject = ['$translateProvider'];
    function dialogConfig($translateProvider) {
        // This will set default modal buttons, header and message text
        $translateProvider.translations('en-US', {
            DIALOGS_ERROR: "错误",
            DIALOGS_ERROR_MSG: "未知错误。",
            DIALOGS_CLOSE: "关闭",
            DIALOGS_PLEASE_WAIT: "请等待",
            DIALOGS_PLEASE_WAIT_ELIPS: "请稍等...",
            DIALOGS_PLEASE_WAIT_MSG: "等待操作完成",
            DIALOGS_PERCENT_COMPLETE: "% 完成",
            DIALOGS_NOTIFICATION: "通知",
            DIALOGS_NOTIFICATION_MSG: "未知通知。",
            DIALOGS_CONFIRMATION: "确认",
            DIALOGS_CONFIRMATION_MSG: "操作需要确认",
            DIALOGS_OK: "OK",
            DIALOGS_YES: "是",
            DIALOGS_NO: "否"
        });
    }

})();