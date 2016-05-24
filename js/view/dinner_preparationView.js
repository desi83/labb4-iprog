//ExampleView Object constructor
var ViewSeven = function (container, model) {
// Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
this.numberOfGuests = container.find("#numOfGuests");
this.numberOfGuests.html(model.getNumberOfGuests());


//images!!
var ScreenAfterMainView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.dishImage = container.find("#dishInfo");

	var imagesStr = "";
	var getDishes = function () {
		// body...
		var menuType = model.getFullMenu();
		console.log("hej");
		for (var i=0; i < menuType.length; i++){ 
			var dish = menuType[i];
			imagesStr = imagesStr + '<div class="col-md-2 ">'
			 + '<img src="'+'images/'+dish.image+'"  alt="'+dish.name+'" style="width: 136px; height: 140px; border: 2px solid black; margin-left:40px; vertical-align: text-top;"></img></div>'
			 + '<div class="col-md-4" style="padding-right: 60px; padding-top: 10px;" >'
			 +'<h2 style="text-transform: uppercase;">'+dish.name+'</h2>'
			 + '<p class="text-justify description">'+dish.description+'</p></div>'
			 +'<div class="col-md-6" style="padding-right: 120px;">'
			 +'<h4>'+dish.description+'</h4>'+'</div>';			
		}
		return imagesStr;
	}
	getDishes();
	this.dishInfo.html(imagesStr);
}

}