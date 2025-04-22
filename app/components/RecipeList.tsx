'use client';

import Link from 'next/link';
import Image from 'next/image';

interface RecipeListProps {
    recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {recipes.map((recipe) => (
                <div
                    key={recipe.id}
                    className=""
                >
                    <Link href={`/recipe/${recipe.id}`} className="block h-full">
                        <Image
                            src={recipe.image || '/no-image.png'}
                            alt={recipe.title}
                            width={500}
                            height={500}
                            className="w-full object-cover rounded-xl"
                        />

                        <div className="p-4">
                            {/* ジャンルラベル */}
                            <span className="mb-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                                {recipe.genre}
                            </span>

                            {/* タイトル */}
                            <h2 className="text-lg font-semibold text-gray-900">
                                {recipe.title}
                            </h2>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
