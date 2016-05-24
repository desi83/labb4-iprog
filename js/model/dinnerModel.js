//DinnerModel Object constructor
var DinnerModel = function() {
	var specMenu = [];
	var numberOfGuests = 1;
 	var pendingDishes = [];
 	var observers = [];

// will add new observer to the array
	this.addObserver = function(observer) {
		 observers.push(observer);
	}

// will call the update method on all the observers in the array
	this.notifyObservers = function(obj) {
	for (i = 0; i < observers.length; i++) {
		observers[i].update(obj);
	} 
}

	this.setNumberOfGuests = function(num) {
		numberOfGuests = numberOfGuests + num;
		this.notifyObservers(); //ska senare skicka med ett objekt
	}

	// should return 
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}


	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		var menuType = [];
		for (menu = 0; menu < specMenu.length; menu++) { //loopar igenom varje maträtt
			var dish = this.getDish(specMenu[menu]); //hämtar ut rätterna om de finns i menyn
	   	if (dish.type == type){ 
              menuType.push(dish.id); //lägger i listan om rätt type
        }
	}
	return menuType;
	}

/*	this.addPendingDish = function(id) {
		var pendingDish = this.getDish(id);
		pendingDishes.push(pendingDish);
		this.notifyObservers(id);
	}	

	this.removePendingDish = function(){
		pendingDishes = [];
		pendingDishes.pop(); //Tar bort det sista elemntet
		console.log(pendingDishes)
    }

	this.getPendingDish = function() {
		//dishen = pendingDishes.pop();
		return pendingDishes[0];
	}

	//Returns */
	this.getFullMenu = function() {
		console.log(specMenu)
		return specMenu;
	}


    
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var allIngredients = [];
		for (i = 0; i < specMenu.length; i++) {
			var ingredient = this.getDish(i).ingredients; //sparar ner ingredienserna till de dishes vi fått ut
			for (var key in ingredient){ //
				allIngredients.push(ingredient[key]);
		}
			}
		return allIngredients;
	}

	this.getDishPrice = function(id){
		var specPrice = 0;
		ingredient = [];
		ingredient.push(this.getDish(id).Ingredients);
		var dish = ingredient[0];
		for(key in dish){
			specPrice += dish[key].MetricQuantity;
		}
		specPrice = specPrice*numberOfGuests;
		return specPrice;
	}

	this.getTotalMenuPrice = function() {
		//TODO Lab 2
		var totalMenuPrice = 0;
		for(key in specMenu){
			totalMenuPrice += this.getDishPrice(specMenu[key].RecipeID);
		}
    return totalMenuPrice;
	}
	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		//TODO Lab 2 
		var dishToAdd = this.getDish(id);
		if (specMenu.length >= 1) {
			var dishExist = false;
			for (menu in specMenu){
				var dish = specMenu[menu];
				if (dish.RecipeID == dishToAdd.RecipeID) {
					dishExist = true;
					this.removeDishFromMenu(dishToAdd.RecipeID);
					specMenu.push(dishToAdd);

				}
			}
			if(dishExist == false) {
				specMenu.push(dishToAdd);
			}
		}
		else {
			specMenu.push(dishToAdd);
		}
	return specMenu;
	this.notifyObservers(); //ska senare skicka med ett objekt
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var removeDish = this.getDish(id);
		for (menu = 0; menu < specMenu.length; menu++){
			var dish = specMenu[menu];
			if(removeDish.RecipeID == dish.RecipeID){ //kollar om den rätten man vill ta bort faktiskt finns i menyn, om den gör det f
				specMenu.splice(menu, 1);
			}
			else if(removeDish.Category == dish.Category){ //kollar om den rätten man vill ta bort faktiskt finns i menyn, om den gör det f
				specMenu.splice(menu, 1);
			}
		}
		return specMenu;
		this.notifyObservers(); //ska senare skicka med ett objekt

	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (Category, filter, cb) {
	    var apiKey = "Li5k9EKcwy83lOzY9W1uCa0K08ZT9K2S";
	    var type = Category;
	    var searchword = filter;
	    // if (filter === ""){
	    //   var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&include_primarycat=" + type + "&pg=1&rpp=125";
	    // }
	    if (filter === "") {
	      	var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&include_primarycat=" + type + "&pg=1&rpp=125";
	    }
	    else {
	      var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&title_kw=" + searchword + "&include_primarycat=" + type + "&pg=1&rpp=125";
	    }
	    $.ajax({
	      	type: "GET",
	      	dataType:'json',
	      	cache: false,
	      	async: true,
	      	url: url,
	      	success: cb,
	      	error: function(data) {
		    	alert("Something's wrong!");
		    },
		    complete: function(data) {
		    	$("#LoadingView").hide();
		    }
	    });
	}
	// var apiKey = "F088t4s6QGI5T92W3Nwiju8jFU52J8SP";
	// var recipeID = 196149;
	// var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
	// var model = this; 
	// $.ajax({
	//          type: "GET",
	//          dataType: 'json',
	//          cache: false,
	//          url: url,
	//          success: function (data) {
 //        		eventObject = {"description" : "dishes", "data" : data};
 //        		console.log(eventObject)
 //        		model.notifyObserver(eventObject);
	//             },
	//         error: function(xhr, status, error){
 //        		console.log('Error in getAllDishes function');
 //             	model.errorMessage(xhr, status, error);
 //             	} 
	//          });
	
	// }

	//function that returns a dish of specific ID
	this.getDish = function (id, cb) {
	  	var apiKey = "Li5k9EKcwy83lOzY9W1uCa0K08ZT9K2S";
	  	var recipeID = id;
	  	console.log("inne i getDish")
	  	var url = "http://api.bigoven.com/recipe/" + recipeID + "?&api_key=" + apiKey + "&pg=1&rpp=125";
	    	var dish = "";
		    $.ajax({
		      	type: "GET",
		      	dataType:'json',
		      	cache: false,
		      	async: true,
		      	url: url,
		      	success: cb,
		      	error: function(data) {
		      		alert("Something's wrong!");
		      	}
		    });
}

	this.getSpecificDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return selectedDish = dishes[key].name;
			}
		}
	}

	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
