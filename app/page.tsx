export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-400 p-6">
            <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
                    レシピクリエイター
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    AIを使って、あなたのレシピを作成します
                </p>
                <div className="space-x-4">
                    <a href="/recipe"
                        className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-700 transition">
                        はじめてみよう
                    </a>
                </div>
            </div>
        </main>
    );
}
