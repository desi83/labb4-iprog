//ExampleView Object constructor
var ViewSeven = function (container, model) {
// Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
this.numberOfGuests = container.find("#numOfGuests");
this.numberOfGuests.html(model.getNumberOfGuests());
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.dishInfoList = container.find("#dishInfoList");

	var imagesStr = "";
	var getDishes = function () {
		// body...
		var menuType = model.getFullMenu();
		for (var i=0; i < menuType.length; i++){ 
			var dish = menuType[i];
			imagesStr = imagesStr + '<div class="row" style=" display: flex; align-items: baseline;">'
			+'<div class="col-md-2 ">'
			 + '<img src="'+dish.ImageURL+'"  alt="'+dish.Title+'" style="width: 136px; height: 140px; border: 2px solid black; margin-left:40px; vertical-align: text-top;"></img></div>'
			 + '<div class="col-md-4" style="padding-right: 60px; padding-top: 10px;" >'
			 +'<h2 style="text-transform: uppercase;">'+dish.Title+'</h2>'
			 + '<p class="text-justify description">'+dish.Subcategory+'</p></div>'
			 +'<div class="col-md-6" style="padding-right: 120px;">'
			 +'<h3 style="text-transform: uppercase;">Preparation</h3>'
			 +'<h4>'+dish.Subcategory+'</h4></div></div>';			
		}
		return imagesStr;
	}

	this.update = function(obj) {
		imagesStr = "";
		getDishes();
		this.dishInfoList.html(imagesStr);
	};
	model.addObserver(this);
}