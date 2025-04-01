import prisma from "@/lib/prisma";

export const initRecipe: Recipe = {
    id: 0,
    title: "",
    genre: "",
    image: "",
    description: "",
    keywords: "",
    ingredients: [],
    steps: [],
};

export const createRecipe = async (recipe: Recipe, ingredients: Ingredient[], steps: Step[]) => {
    if (!recipe) return false;
    try {
        const newRecipe = await prisma.recipe.create({
            data: bindRecipe(recipe, ingredients, steps)
        });
        return newRecipe;
    } catch (error) {
        return false;
    }
}

export const bindRecipe = (recipe: Recipe, ingredients: Ingredient[], steps: Step[]) => {
    //Prisma bind
    var data = {
        title: recipe.title,
        description: recipe.description,
        genre: recipe.genre,
        keywords: recipe.keywords,
        ingredients: {
            create: ingredients.map((ingredient: { name: string; quantity: string }) => ({
                name: ingredient.name,
                quantity: ingredient.quantity,
            })),
        },
        steps: {
            create: steps.map((step: { instruction: string }, index: number) => ({
                stepNumber: index + 1,
                instruction: step.instruction,
            })),
        },
    }
    return data;
}