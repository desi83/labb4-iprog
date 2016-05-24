var ScreenAfterController = function(view, sidebarview, lasagnemainview, model) {

	$("#buttonSearch").click(function(){
		view.updateSearch($("#typeSearch").val(), $("#searchWord").val());
		selectDish();
		$("#searchWord").val('');
		return false;
	});

	$("#typeSearch").change(function() {
		view.updateSearch($(this).val(), $("#searchWord").val());
		selectDish();
	});

	var selectDish = function() {
	$('#dishImage').on('click', '.image', function(){
			console.log("inne i selectDish")
			var id = $(this).attr('id'); //hämtar attributet id från den dishen vi har klickat på
			//model.addPendingDish(id);
			$("#ScreenAfterMainView").hide();
			$("#ViewSix").hide();
			$("#LasagneMainView").show();
			sidebarview.updatePending(id);
			lasagnemainview.update(id);
		})

	}

	selectDish();

	var confirmDish = function() {
		
		$("#confirmButton").click(function(){
			var id = model.getDish(id).RecipeID;
			model.addDishToMenu(id);
			sidebarview.update();
			$("#LasagneMainView").hide();
			$("#ScreenAfterMainView").show();
			});
	}

	confirmDish();

	var goBack = function() {
		$("#backButton").click(function(){
			model.removePendingDish();
			$("#LasagneMainView").hide();
			$("#ScreenAfterMainView").show();
			sidebarview.update();
		});
	}
	goBack();

	$(document).ajaxStart(function() {
		$(".loading").show();
	});
	$( document ).ajaxStop(function() {
		$( ".loading" ).hide();
	});


};
