var LasagneMainView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	//var id = model.getPendingDish();
	this.dishInfo = container.find("#dishInfo");

	var imagesStr = "";
	var getDishes = function (id) {
		var imagesStr = "";
		model.getDish(id, function(dishes){
		var dish = dishes;
		imagesStr = imagesStr + '<div class="col-md-5">'
		+ '<text style="font-size: 30px;">'+String(dish.Title)+'</text></br>'
		+ '<img src="'+String(dish.ImageURL)+'"  alt="'+String(dish.Title)+'" style="width: 136px; height: 140px;"></img>'	 
		+ '<p class="text-justify description">'+String(dish.Subcategory)+'</p></div>';	
		console.log(imagesStr)
		return imagesStr;
		});
	}
	//getDishes(100);
	//this.dishInfo.html(imagesStr);


	this.allIngredients = container.find("#allIngredients");


	var ingredientList = "";
	var getIngredients = function (id) {
		model.getDish(id, function(dishes){
		var dish = dishes;
		var guests = (model.getNumberOfGuests());
		var ingredientList = "";
		for(var i=0; i < dish.Ingredients.length; i++){
		ingredientList = ingredientList + '<tr>'
		+ '<td style="padding-bottom:10px; padding-right: 70px;">'+String(dish.Ingredients[i].MetricQuantity)*guests+String(dish.Ingredients[i].MetricUnit)+'</td>'
		+ '<td style="padding-bottom:10px; padding-right: 70px;">'+String(dish.Ingredients[i].Name)+'</td>'	 
		+ '<td style="padding-bottom:10px; padding-right: 70px;">'+String(dish.Ingredients[i].MetricQuantity)*guests+'</td></tr>';	
		}
		});
		return ingredientList;
	}

	//getIngredients(100);
	//this.algetlIngredients.html(ingredients);
	$("#confirmButton").append('<button id="confirmButton" type="button" class="btn btn-warning" style="margin-top: 20px;">Confirm Dish</button>');
	$("#backButton").append('<button id="backButton" type="button" class="btn btn-warning" style="margin-top: 20px; margin-left:950px; padding-right: 10px; padding-left: 10px; ">Go Back</button>');

	this.update = function(id) {
		this.numbOfGuests = container.find("#numbOfGuests");
		this.numbOfGuests.html(model.getNumberOfGuests());
		this.dishInfo.html(getDishes(id));
		this.allIngredients.html(getIngredients(id));
		this.specPrice = container.find("#specPrice");
		this.pendingPrice = container.find("#pendingPrice");
		//var dishTwo = model.getPendingDish().RecipeID;
		//this.specPrice.html(model.getDishPrice(dishTwo));


	};

	model.addObserver(this);
}