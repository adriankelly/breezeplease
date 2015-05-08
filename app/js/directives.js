windApp.directive('phoneSubmit', function () {
	return function (scope, element, attr) {
		var locationField = element.find('input');
		element.bind('submit', function() {
			locationField[0].blur();
		});
	};
});