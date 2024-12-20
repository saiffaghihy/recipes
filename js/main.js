// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize featured recipes on home page
    if (document.getElementById('featuredGrid')) {
        loadFeaturedRecipes();
    }

    // Initialize search and filter functionality on recipes page
    if (document.getElementById('searchInput')) {
        initializeSearch();
    }
});

function loadFeaturedRecipes() {
    const featuredGrid = document.getElementById('featuredGrid');
    const featuredRecipes = recipes.slice(0, 3); // Get first 3 recipes

    featuredRecipes.forEach(recipe => {
        featuredGrid.appendChild(createRecipeCard(recipe));
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-details">
                <span>${recipe.prepTime} mins</span>
                <span>${recipe.servings} servings</span>
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const filterCategory = document.getElementById('filterCategory');
    const recipesGrid = document.getElementById('recipesGrid');

    searchInput.addEventListener('input', updateRecipes);
    filterCategory.addEventListener('change', updateRecipes);

    function updateRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterCategory.value.toLowerCase();

        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) ||
                                recipe.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || recipe.tags.includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });

        displayRecipes(filteredRecipes);
    }

    function displayRecipes(recipesToShow) {
        recipesGrid.innerHTML = '';
        recipesToShow.forEach(recipe => {
            recipesGrid.appendChild(createRecipeCard(recipe));
        });
    }

    // Initial display
    displayRecipes(recipes);
}
