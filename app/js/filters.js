// Filter to convert mph received into kph
windApp.filter("changeToKph", function() {
	return function(input) {
		if (isNaN(input)) {
			return "";
		} else {
			return Math.round(input * 1.60934);
		}
	};
});

// Filter to capitalise first letter of word
windApp.filter("upperFirst", function() {
	return function(input) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(word){return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();}) : '';
	};
});