// Recipe list data array for filling in info box
var recipeListData = [];
var recipeId = {};

// DOM Ready
$(document).ready(function(){

  // Get the recipe ID from functions database
  getId();

  // Get the recipe information from the recipes database
  // getRecipes();

});

// gets the recipe ID from the database
function getId(){
  $.getJSON('/recipes/getid', function(data){
    recipeId = {
      id: data[0].view_id
    };
    getRecipes(recipeId);
  });
}

function getIdFromObject(recipes){
var answer = {};
  recipes.forEach(function(item){
    if (item._id == recipeId.id) {
      answer = item;
    }
  });
  return answer;
}

function getRecipes(input){

  // jquery AJAX call for JSON
  $.getJSON('/recipes/getview', function(data){
    recipeListData = data;
    var thisRecipeObject = getIdFromObject(recipeListData);
    $('#recipe-box').append("<h1>" + thisRecipeObject.name + "</h1>");
    $('#recipe-box').append("<p>" + thisRecipeObject.recipe + "</p>");
    $('#recipe-box').append("<p>" + JSON.stringify(thisRecipeObject) + "</p>");
    // $('#recipe-box').(JSON.stringify(thisRecipeObject));
  }); // end of AJAX for recipelist

};
