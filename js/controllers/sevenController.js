var SevenController = function(view, model) {


	var lastGoBack = function() {
		$("#lastBackButton").click(function(){
		$("#ViewSeven").hide();
		$("#ScreenAfterMainView").show();
		$("#ExampleView").show();

		});
	}

	lastGoBack();
}