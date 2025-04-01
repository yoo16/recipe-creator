'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import GenreInput from '@/app/components/GenreInput';
import KeywordInput from '@/app/components/KeywordInput';
import IngredientForm from '@/app/components/IngredientForm';
import StepForm from './StepForm';
import Image from 'next/image';

interface EditRecipeFormProps {
    initRecipe: Recipe;
}

const EditRecipeForm = ({ initRecipe }: EditRecipeFormProps) => {
    const router = useRouter();

    const [recipe, setRecipe] = useState<Recipe>(initRecipe);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>(initRecipe.ingredients);
    const [steps, setSteps] = useState<Step[]>(initRecipe.steps);

    const addIngredient = () => {
        setIngredients([...ingredients, { id: 0, name: '', quantity: '' }]);
        console.log(ingredients)
    };

    const addStep = () => {
        setSteps([...steps, { id: 0, stepNumber: 0, instruction: '' }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index: number, name: string, quantity: string) => {
        setIngredients(
            ingredients.map((value, i) =>
                i === index ? { ...value, name, quantity } : value
            )
        );
    };

    const handleStepChange = (index: number, instruction: string) => {
        setSteps(
            steps.map((value, i) =>
                i === index ? { ...value, instruction: instruction } : value
            )
        )
    }

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleRecipeChange = (key: keyof Recipe, value: string) => {
        setRecipe(prev => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            recipe: {
                title: recipe.title,
                description: recipe.description,
                genre: recipe.genre,
                keywords: recipe.keywords,
            },
            ingredients,
            steps,
        };

        // レシピの更新
        await axios.put(`/api/recipe/${recipe.id}/update`, payload);

        // 画像がある場合はアップロード
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const uri = `/api/recipe/${recipe.id}/upload-image`;
            // console.log(uri);
            await axios.post(uri, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        router.push('/user/recipe');
    };

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/user/recipe');
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('このレシピを削除しますか？');
        if (confirmDelete) {
            await axios.delete(`/api/recipe/${recipe.id}/delete`);
            router.push('/user/recipe');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.title}
                        onChange={(e) => handleRecipeChange('title', e.target.value)}
                        required
                    />
                </div>

                <div className="mb-8">
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

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">画像</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setSelectedImage(e.target.files[0]);
                            }
                        }}
                    />
                    {recipe.image && (
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            className="mt-2 w-full h-auto rounded"
                            width={300}
                            height={300}
                        />
                    )}
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                    <textarea
                        className="border border-gray-300 rounded p-3 w-full"
                        value={recipe?.description || ''}
                        onChange={(e) => handleRecipeChange('description', e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-8">
                    <IngredientForm
                        ingredients={ingredients}
                        onAddIngredient={addIngredient}
                        onRemoveIngredient={removeIngredient}
                        onChangeIngredient={handleIngredientChange}
                    />
                </div>

                <div className="mb-8">
                    <StepForm
                        steps={steps}
                        onAddStep={addStep}
                        onRemoveStep={removeStep}
                        onChangeStep={handleStepChange}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white rounded px-4 py-2"
                    >
                        保存
                    </button>
                    <button
                        type="button"
                        className="border border-blue-500 text-blue-500 rounded px-4 py-2"
                        onClick={handleCancel}
                    >
                        戻る
                    </button>
                </div>
                <div className="my-5 flex justify-end">
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded px-4 py-2"
                        onClick={handleDelete}
                    >
                        削除
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditRecipeForm;