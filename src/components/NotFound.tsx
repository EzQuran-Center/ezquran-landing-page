import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                        404
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Halaman Tidak Dijumpai
                    </h2>
                    <p className="text-xl text-gray-400 mb-2">
                        Page Not Found
                    </p>
                    <p className="text-gray-500 mb-8">
                        Maaf, halaman yang anda cari tidak wujud atau telah dialihkan.
                    </p>
                    {/* <p className="text-gray-500 mb-12">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p> */}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105"
                    >
                        <Home size={20} />
                        Kembali ke Halaman Utama
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                        Masih menghadapi masalah? Hubungi kami di{' '}
                        <a href="mailto:admin@ezquran.my" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                            admin@ezquran.my
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
