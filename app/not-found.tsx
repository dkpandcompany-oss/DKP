export default function NotFoundPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you are looking for does not exist.
            </p>
            <a href="/" className="px-6 py-3 bg-[#156d95] text-white rounded-full hover:bg-[#156d95]/90 transition-colors">
                Go Home
            </a>
        </main>
    );
}
