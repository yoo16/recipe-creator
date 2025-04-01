interface Recipe {
    id: number;
    title: string;
    image?: string;
    description: string;
    genre: string;
    keywords?: string;
    ingredients: Ingredient[];
    steps: Step[];
}