$(document).ready(function () {
    const appId = '8cb8a5ec';
    const appKey = 'f1d75cc07ff4dc341b3ebf830c89174f';
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
    function getRandomRecipe() {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=meal&app_id=${appId}&app_key=${appKey}`;
      return $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
      });
    }
  
    function generateMealPlan() {
      const mealPlanTableBody = $('#mealPlanTable tbody');
  
      weekdays.forEach((weekday) => {
        const row = $('<tr>').append($('<td>').text(weekday));
  
        for (let i = 0; i < 3; i++) {
          getRandomRecipe().done((data) => {
            const recipe = data.hits[0].recipe;
  
            const mealName = $('<p>').text(recipe.label);
            const recipeImage = $('<img>').attr('src', recipe.image);
            const ingredients = $('<ul>');
            recipe.ingredients.forEach((ingredient) => {
              ingredients.append($('<li>').text(ingredient.text));
            });
  
            const cell = $('<td>').append(mealName, recipeImage, ingredients);
            row.append(cell);
          });
        }
  
        mealPlanTableBody.append(row);
      });
    }
  
    $('#generateMealPlan').on('click', function () {
      generateMealPlan();
    });
  });
  