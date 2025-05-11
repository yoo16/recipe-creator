'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import GenreInput from '@/app/components/GenreInput';
import KeywordInput from '@/app/components/KeywordInput';
import { initRecipe } from '@/app/models/Recipe';

const NewRecipeForm = () => {
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe>(initRecipe);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    /* ─────────────────────────
       材料の追加／更新ハンドラー
    ───────────────────────── */
    const addIngredient = () =>
        setIngredients([...ingredients, { id: 0, name: '', quantity: '' }]);

    const updateIngredient = (
        index: number,
        field: keyof Ingredient, // 'name' | 'quantity'
        value: string,
    ) =>
        setIngredients((prev) =>
            prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
        );


    const addStep = () =>
        setSteps([...steps, { id: 0, stepNumber: steps.length + 1, instruction: '' }]);

    const updateStep = (index: number, value: string) =>
        setSteps((prev) =>
            prev.map((s, i) => (i === index ? { ...s, instruction: value } : s)),
        );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleRecipeChange = (key: keyof Recipe, value: string | string[]) =>
        setRecipe((prev) => ({ ...prev, [key]: value }));


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/api/recipe/create', { recipe, ingredients, steps });
        router.push('/user/recipe');
    };

    const handleCancel = () => router.push('/user/recipe');

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="mb-4 text-center text-2xl font-bold">レシピ作成</h1>

            <form onSubmit={handleSubmit}>
                {/* 基本情報 */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">基本情報</h3>
                    <input
                        name="title"
                        type="text"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={recipe?.title}
                        onChange={handleInputChange}
                        placeholder="タイトル"
                        required
                    />
                </div>

                <div className="mb-4">
                    <GenreInput
                        value={recipe?.genre}
                        onChange={handleRecipeChange}
                    />
                </div>

                <div className="mb-8">
                    <KeywordInput
                        keywords={recipe?.keywords}
                        onChange={handleRecipeChange}
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        name="description"
                        className="border border-gray-300 rounded p-2 w-full"
                        value={recipe?.description}
                        onChange={handleInputChange}
                        placeholder="説明"
                    ></textarea>
                </div>

                {/* 材料 */}
                <section className="mb-8">
                    <h3 className="text-xl font-bold mb-2">材料</h3>
                    <button
                        type="button"
                        className="mb-2 bg-blue-500 text-sm text-white rounded px-4 py-1"
                        onClick={addIngredient}
                    >
                        材料を追加
                    </button>

                    {ingredients.map((ing, idx) => (
                        <div key={idx} className="mb-2 flex">
                            <input
                                type="text"
                                placeholder="材料"
                                className="mr-2 w-full rounded border border-gray-300 p-2"
                                value={ing.name}
                                onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="数量"
                                className="w-full rounded border border-gray-300 p-2"
                                value={ing.quantity}
                                onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                </section>

                {/* 手順 */}
                <section className="mb-8 border-b py-5">
                    <h3 className="text-xl font-bold mb-2">手順</h3>
                    <button
                        type="button"
                        className="mb-2 bg-blue-500 text-sm text-white rounded px-4 py-1"
                        onClick={addStep}
                    >
                        手順を追加
                    </button>

                    {steps.map((step, idx) => (
                        <textarea
                            key={idx}
                            placeholder={`手順 ${idx + 1}`}
                            className="mb-2 w-full rounded border border-gray-300 p-2"
                            value={step.instruction}
                            onChange={(e) => updateStep(idx, e.target.value)}
                            required
                        />
                    ))}
                </section>

                <div className="mt-2 flex justify-between">
                    <button type="submit" className="rounded bg-blue-500 px-4 py-1 text-white">
                        保存
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded border border-blue-500 px-4 py-1 text-blue-500"
                    >
                        戻る
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewRecipeForm;
