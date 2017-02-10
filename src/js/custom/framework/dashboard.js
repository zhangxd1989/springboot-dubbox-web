(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$rootScope', '$scope', '$filter', 'DashboardService'];
    function DashboardCtrl($rootScope, $scope, $filter, dashboardService) {

        $rootScope.loading = true;
        dashboardService.get()
            .then(function (data) {
                $scope.data = data;

                $("#consumePie").sparkline(
                    [30, 70],
                    {
                        type: 'pie',
                        height: 40,
                        sliceColors: ['#fad733', '#fff'],
                        tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{offset:names}} ({{value}}/{{percent.1}}%)',
                        tooltipValueLookups: {
                            names: {
                                0: '消费1',
                                1: '消费2'
                            }
                        }
                    }
                );

                var everyDayConsumeArray = [];
                var everyDayConsume1Array = [];
                var everyDayConsume2Array = [];
                var everyDayUserArray = [];
                var everyDayRevenueArray = [];
                var myDate = new Date(); //获取今天日期
                myDate.setDate(myDate.getDate() - 6);
                var days = {};
                var showDays = [];
                for (var i = 1; i <= 7; i++) {
                    var date = $filter('date')(myDate, 'yyyy-MM-dd');
                    var key = i * 5;

                    var showDay = [];
                    var showDate = $filter('date')(myDate, 'MM-dd');
                    showDay.push(key);
                    showDay.push(showDate);
                    showDays.push(showDay);

                    days[key] = showDate;

                    myDate.setDate(myDate.getDate() + 1);

                    everyDayConsumeArray.push([key, Math.random() * 1234]);
                    everyDayConsume1Array.push([key, Math.random() * 123]);
                    everyDayConsume2Array.push([key, Math.random() * 123]);
                    everyDayUserArray.push([key, Math.random() * 1000]);
                    everyDayRevenueArray.push([key, Math.random() * 4321]);
                }

                $.plot($("#lastConsume"),
                    [
                        {label: '总消费', data: everyDayConsumeArray},
                        {label: '消费1', data: everyDayConsume1Array},
                        {label: '消费2', data: everyDayConsume2Array}
                    ],
                    {
                        bars: {
                            show: true,
                            fill: true,
                            lineWidth: 1,
                            order: 1,
                            fillColor: {colors: [{opacity: 0.5}, {opacity: 0.9}]}
                        },
                        colors: ['#23b7e5', '#27c24c', '#7266ba'],
                        series: {shadowSize: 1},
                        xaxis: {
                            ticks: showDays,
                            font: {color: '#ccc'}
                        },
                        yaxis: {font: {color: '#ccc'}},
                        grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
                        tooltip: true,
                        tooltipOpts: {
                            content: function (label, xval, yval) {
                                return label + " | 日期: " + days[xval] + " | 金额: " + yval;
                            }, defaultTheme: false, shifts: {x: 10, y: -25}
                        }
                    }
                );

                $.plot($("#lastUser"),
                    [
                        {
                            data: everyDayUserArray,
                            label: '用户数',
                            points: {show: true},
                            lines: {
                                show: true,
                                fill: true,
                                fillColor: {colors: [{opacity: 0.1}, {opacity: 0.1}]}
                            }
                        }
                    ],
                    {
                        colors: ['#23b7e5', '#fad733'],
                        series: {shadowSize: 2},
                        xaxis: {
                            ticks: showDays,
                            font: {color: '#ccc'}
                        },
                        yaxis: {tickDecimals: 0, font: {color: '#ccc'}},
                        grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
                        tooltip: true,
                        tooltipOpts: {
                            content: '%s | 日期: %x | 人数: %y.0',
                            defaultTheme: false,
                            shifts: {x: 10, y: -25}
                        }
                    }
                );

                $.plot($("#lastRevenue"),
                    [
                        {
                            data: everyDayRevenueArray,
                            label: '充值金额(元)',
                            points: {show: true},
                            lines: {
                                show: true,
                                fill: true,
                                fillColor: {colors: [{opacity: 0.1}, {opacity: 0.1}]}
                            }
                        }
                    ],
                    {
                        colors: ['#23b7e5', '#fad733'],
                        series: {shadowSize: 2},
                        xaxis: {
                            ticks: showDays,
                            font: {color: '#ccc'}
                        },
                        yaxis: {font: {color: '#ccc'}},
                        grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
                        tooltip: true,
                        tooltipOpts: {
                            content: '%s | 日期: %x | 金额: %y.4',
                            defaultTheme: false,
                            shifts: {x: 10, y: -25}
                        }
                    }
                );

            })
            .finally(function () {
                $rootScope.loading = false;
            });

    }
})();