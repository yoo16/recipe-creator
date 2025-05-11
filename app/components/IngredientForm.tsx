'use client';

interface IngredientListProps {
    ingredients: Ingredient[];
    onAddIngredient: () => void;
    onRemoveIngredient: (index: number) => void;
    onChangeIngredient: (index: number, name: string, quantity: string) => void;
}

const IngredientForm = ({ ingredients, onAddIngredient, onRemoveIngredient, onChangeIngredient }: IngredientListProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">材料</h2>
            <button
                type="button"
                className="bg-blue-500 text-sm text-white rounded px-4 py-2"
                onClick={onAddIngredient}
            >
                材料を追加
            </button>
            {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="材料"
                        className="border border-gray-300 rounded p-3 w-full mr-2"
                        value={ingredient.name}
                        onChange={(e) => onChangeIngredient(index, e.target.value, ingredient.quantity)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="数量"
                        className="border border-gray-300 rounded p-3 w-40 mr-2"
                        value={ingredient.quantity}
                        onChange={(e) => onChangeIngredient(index, ingredient.name, e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => onRemoveIngredient(index)}
                    >
                        削除
                    </button>
                </div>
            ))}

        </div>
    );
};

export default IngredientForm;
