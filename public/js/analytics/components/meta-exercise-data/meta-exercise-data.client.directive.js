angular.module('analytics').directive('meanfitMetaExerciseData', function meanfitMetaExerciseData($resource, AnalyticsApi) {
	var directive = {
		restrict: 'E',
		bindToController: true,
		controllerAs: 'vm',
		scope: {
			isCollapsable: '=?'
		},
		templateUrl: 'js/analytics/components/meta-exercise-data/meta-exercise-data.client.template.html'
	};

	directive.controller = function metaAnalyticsController() {
		var vm = this;

		AnalyticsApi.get().$promise.then(function success(data) {
			vm.metaAnalyticsData = data;
		});

		if(!vm.isCollapsable) {
			vm.isOpen = true;
		}

		vm.toggleAnalytics = function toggleAnalytics() {
			vm.isOpen = !vm.isOpen;
		};
	};

	return directive;
});