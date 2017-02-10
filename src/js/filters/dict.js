(function () {
    'use strict';

    angular.module('app')
        .filter('dict', dict);

    dict.$inject = ['DICT_CONST'];
    function dict(DICT_CONST) {
        return function (key, type) {

            return getDict(key, type);
        };

        function getDict(key, type) {
            var value = key;

            var dictList;
            if (dictList = DICT_CONST[type]) {
                angular.forEach(dictList, function (dict) {
                    if (dict['key'] === key) {
                        value = dict['value'];
                    }
                })
            }

            return value;
        }
    }
})();
