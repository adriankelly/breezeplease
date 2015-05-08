windApp.directive('phoneSubmit', function () {
	return function (scope, element, attr) {
		var locationField = element.find('input');
		console.log(locationField);
		element.bind('submit', function() {
			locationField[0].blur();
		});
	};
});