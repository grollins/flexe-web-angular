'use strict';

angular.module('flexeWebApp')
    .controller('JobCtrl', function($scope, $log, $location, $routeParams, FlexeWebBackend) {
        $scope.jobId = $routeParams.jobId;
        $scope.jobDone = false;

        $scope.refreshJob = function() {
            FlexeWebBackend.getJobResults($scope.jobId)
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobData = data;
                $scope.result = data.result[0];
                $log.debug('Job refresh success');
                if (data.status === 'done') {
                    $scope.jobDone = true;
                }
            })
            .error(function(data, status) {
                $scope.jobData = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };

        $scope.deleteJob = function() {
            FlexeWebBackend.deleteJob($scope.jobId)
            .success(function() {
                $log.debug('Job deleted');
                $location.path( '/home' );
            })
            .error(function() {
                $log.debug('Job deletion failed');
            });
        };

        $scope.refreshJob();

    });
