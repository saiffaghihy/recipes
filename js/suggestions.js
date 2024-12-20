document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipeForm');
    const addIngredientBtn = document.getElementById('addIngredient');
    const ingredientsList = document.getElementById('ingredientsList');

    // Add new ingredient row
    addIngredientBtn.addEventListener('click', () => {
        const ingredientRow = document.createElement('div');
        ingredientRow.className = 'ingredient-row';
        ingredientRow.innerHTML = `
            <input type="text" placeholder="Ingredient" required>
            <input type="text" placeholder="Amount" required>
            <button type="button" class="remove-btn">Remove</button>
        `;
        ingredientsList.appendChild(ingredientRow);

        // Add remove functionality to new row
        const removeBtn = ingredientRow.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            ingredientRow.remove();
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('recipeName').value,
            description: document.getElementById('description').value,
            prepTime: parseInt(document.getElementById('prepTime').value),
            servings: parseInt(document.getElementById('servings').value),
            ingredients: [],
            instructions: document.getElementById('instructions').value
        };

        // Gather ingredients
        const ingredientRows = ingredientsList.querySelectorAll('.ingredient-row');
        ingredientRows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            formData.ingredients.push({
                item: inputs[0].value,
                amount: inputs[1].value
            });
        });

        // Submit the recipe (you would typically send this to a server)
        console.log('Recipe submitted:', formData);
        alert('Thank you for sharing your recipe!');
        form.reset();
    });
});
