'use client';
import React from 'react';

interface Props {
    ingredients: Ingredient[];
    onAdd: () => void;
    onChange: (index: number, field: keyof Ingredient, value: string) => void;
}

function IngredientsForm({ ingredients, onAdd, onChange }: Props) {
    <section className="mb-8">
        <h3 className="text-xl font-bold mb-2">材料</h3>

        <button
            type="button"
            className="mb-4 bg-blue-500 text-sm text-white rounded px-4 py-1"
            onClick={onAdd}
        >
            材料を追加
        </button>

        {ingredients.map((ing, idx) => (
            <div key={idx} className="mb-2 flex">
                <input
                    type="text"
                    placeholder="材料"
                    className="border border-gray-300 rounded p-2 w-full mr-2"
                    value={ing.name}
                    onChange={(e) => onChange(idx, 'name', e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="数量"
                    className="border border-gray-300 rounded p-2 w-full"
                    value={ing.quantity}
                    onChange={(e) => onChange(idx, 'quantity', e.target.value)}
                    required
                />
            </div>
        ))}
    </section>
}

export default IngredientsForm;
