'use client';

import { useState, useEffect } from 'react';
import RecipeList from '@/app/components/RecipeList';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch('/api/recipe/get');
            const data = await response.json();
            setRecipes(data);
        }

        fetchRecipes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold p-4 text-center">レシピをさがす</h1>
            <div className="my-3">
                <div className="my-3">
                    <RecipeList recipes={recipes} />
                </div>
            </div>
        </div>
    );
}