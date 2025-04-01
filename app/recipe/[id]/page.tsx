'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import IngredientList from '@/app/components/IngredientList';
import StepList from '@/app/components/StepList';
import Image from 'next/image';

export default function RecipeDetailPage() {
    const router = useRouter();
    const params = useParams();

    const recipeId = params.id as string;

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        async function fetchRecipe() {
            const response = await fetch(`/api/recipe/${recipeId}`);
            const data = await response.json();
            setRecipe(data);
        }

        fetchRecipe();
    }, [recipeId]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{recipe.title}</h1>
            {recipe.image &&
                <Image src={recipe.image} alt={recipe.title} width={500} height={300} className="rounded-lg mb-4" />
            }

            <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex flex-wrap">
                <div className="w-1/3">
                    <IngredientList ingredients={recipe.ingredients} />
                </div>
                <div className="w-2/3 px-3">
                    <StepList steps={recipe.steps} />
                </div>
            </div>
        </div>
    );
}
