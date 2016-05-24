var SidebarController = function(view, viewSix, model) {

	var addGuest = function() {
		$("#up").click(function(){
		model.setNumberOfGuests(1);
		view.update();
		});
	}

	addGuest();

	var removeGuest = function() {
		$("#down").click(function(){
		model.setNumberOfGuests(-1);
		view.update();
		});
	}

	removeGuest();

	var confirmDinner = function(){
		$("#confirmDinner").click(function(){
			$("#ExampleView").hide();
			$("#LasagneMainView").hide();
			$("#ScreenAfterMainView").hide();
			$("#ViewSix").show();
			viewSix.update();
		});
	}
	confirmDinner();

/*	var removeDish = function(){
		$("#remove").click(function(){
			console.log("removeDish")
			var id = $(this).attr('id');

		});
	}
	removeDish();*/

	$('#addedDishes').on('click', '.addDishesRow', function(){
		var id = $(this).attr('id');		
		model.removeDishFromMenu(id);
		view.update();

	});
}