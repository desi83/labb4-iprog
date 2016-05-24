//ExampleView Object constructor
var ExampleView = function (container, model) {
	
	this.updatePending = function(id) {
		this.specPrice = container.find("#pendingPrice");
		//var ID = model.getDish(id).RecipeID;
		//this.specPrice.html(model.getDishPrice(ID));

	};
	
	this.addedDishes = container.find("#addedDishes");


	var dishStr = "";
	 var addDish = function() {
		var fullMenu = model.getFullMenu();
		console.log(fullMenu)
		for (i in fullMenu) {

			var selectedDish = fullMenu[i].Title;
			
			//this.dishID = container.find("#dishID");
			var dishID = fullMenu[i].RecipeID;

			var amountOfGuests = model.getNumberOfGuests();

			var selectedPrice = model.getDishPrice(fullMenu[i].RecipeID);

			dishStr = dishStr + '<div class="row addDishesRow" id="'+dishID+'" style="background-color: #D8D8D8; color: #B40404; border: 2px solid black; margin-top: 10px; margin-left: 1px; margin-right: 1px;">'
				+'<div class="col-md-2" id="amountOfGuests" style="font-size: 12px; text-align: left;">'+amountOfGuests+'</div>'
				+	'<div class="col-md-6" id="selectedDish" style="font-size: 12px; text-align: right;">'+selectedDish+'</div>'
				+	'<div class="col-md-4" id="selectedPrice" style="font-size: 12px; text-align: right;">'+selectedPrice+'</div>'
				+ '<button type="button" class="btn btn-default btn-xs remove" style="background-color: #B40404; border-radius: 15px; margin-left: 175px; margin-top: -20px;"><span class="glyphicon glyphicon-remove"></span></button></div>';
		}
		
		this.totalMenuPrice = container.find("#totalPrice");
		this.totalMenuPrice.html(model.getTotalMenuPrice());
		return dishStr;

	}


	this.update = function() {
		dishStr = "";
		addDish();
		this.specPrice = container.find("#pendingPrice");
		this.specPrice.html("0.00");
		this.addedDishes.html(dishStr);
		this.numberOfGuests = container.find("#numberOfGuests");
		this.numberOfGuests.html(model.getNumberOfGuests());
	};

model.addObserver(this);

}

