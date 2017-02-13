// Recipe list data array for filling in info box
var recipeListData = [];
var selectedRecipes = [];

// DOM Ready
$(document).ready(function(){

  // Populate the recipe table on initial page load
  populateTable();

});

function populateTable(){

  //empty content string
  var tableContent = '';

  // jquery AJAX call for JSON
  $.getJSON('/recipes/recipelist', function (data){

    // adds all user info from database to the global variable
    recipeListData = data;

    // for each item in our JSON, add a table row and cells to the content string
    // $.each(data, function(){
    //   tableContent += '<tr>';
    //   //tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.name + '">' + this.name + '</a></td>';
    //   tableContent += '<td>' + this.name + '</td>';
    //   tableContent += '<td>' + this.cuisine + '</td>';
    //   tableContent += '<td><a href="#" style="color: white; background-color: red; padding: 2px;" class="linkdeleteuser deleterecipe" rel="' + this._id + '">Delete?</a> <a href="#" class="linkedituser editrecipe" rel="' + this._id + '">Edit</a></td>';
    //   tableContent += '</tr>';
    // });

    // inject the whole content string into our existing HTML table
    //$('#newRecipeList table tbody').html(tableContent);
    $('#recipe-box').append("Does it work?");
  });
};
