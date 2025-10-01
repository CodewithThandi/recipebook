// Basic Recipe Book Script
// Assumes your HTML has elements like: 
// - a form to add recipes
// - a list to display recipes
// - buttons to delete recipes

// Example selectors (update if your HTML uses different IDs/classes)
const recipeForm = document.getElementById('recipe-form');
const recipeList = document.getElementById('recipe-list');
const recipeNameInput = document.getElementById('recipe-name');
const recipeIngredientsInput = document.getElementById('recipe-ingredients');

// Store recipes in localStorage
function getRecipes() {
    return JSON.parse(localStorage.getItem('recipes') || '[]');
}

function saveRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function renderRecipes() {
    const recipes = getRecipes();
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.className = 'recipe-item';
        li.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.ingredients}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        recipeList.appendChild(li);
    });
}

// Add recipe
recipeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.trim();
    if (name && ingredients) {
        const recipes = getRecipes();
        recipes.push({ name, ingredients });
        saveRecipes(recipes);
        renderRecipes();
        recipeForm.reset();
    }
});

// Delete recipe
recipeList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        const recipes = getRecipes();
        recipes.splice(index, 1);
        saveRecipes(recipes);
        renderRecipes();
    }
});

// Initial render
renderRecipes();