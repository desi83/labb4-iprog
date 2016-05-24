//ExampleView Object constructor
var View = function (container, model) {
// Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
this.numberOfGuests = container.find("#numOfGuests");
this.numberOfGuests.html(model.getNumberOfGuests());

}