var HomeController = function(view, model) {
	$("#HomeView").show()
	$("#ExampleView").hide()
	$("#LoadingView").hide()
	$("#ScreenAfterMainView").hide()
	$("#LasagneMainView").hide()
	$("#ViewSix").hide()
	$("#ViewSeven").hide()

$("#startButton").click(function(){
	$("#HomeView").hide()
	$("#ExampleView").show()
	$("#ScreenAfterMainView").show()
	$("#LasagneMainView").hide()
	$("#ViewSix").hide()
	$("#ViewSeven").hide()

});

}