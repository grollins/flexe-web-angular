'use strict';

angular.module('flexeWebApp')
    .controller('HomeCtrl', function($scope, $log, FlexeWebBackend, User) {
        $scope.submissionFailed = false;
        $scope.submissionSucceeded = false;
        $scope.submissionStatus = '';
        $scope.jobs = [];
        $scope.username = User.username();

        $scope.job = {
            title: '',
            refFile: null,
            comparisonFile: null,
        };

        $scope.closeAlert = function() {
            $scope.submissionFailed = false;
            $scope.submissionSucceeded = false;
            $scope.submissionStatus = '';
        };

        $scope.saveJob = function() {
            var fd = new FormData();
            fd.append('title', $scope.job.title);
            fd.append('reference', $scope.job.refFile);
            fd.append('comparison', $scope.job.comparisonFile);

            FlexeWebBackend.saveJob(fd)
            .success(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post success');
                $scope.refreshJobs();
                $scope.submissionSucceeded = true;
            })
            .error(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post failed');
                $scope.refreshJobs();
                $scope.submissionFailed = true;
                $scope.submissionStatus = status;
            });
            $scope.jobForm.$setPristine();
            $scope.job.title = '';
        };

        $scope.refreshJobs = function() {
            FlexeWebBackend.refreshJobs()
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobs = data.results;
                $log.debug('Job refresh success');
            })
            .error(function(data, status) {
                $scope.jobs = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };

        $scope.refreshJobs();
    });