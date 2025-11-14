import { BookOpen, Users, Award } from "lucide-react";

export default function Hero() {
	const scrollToPackages = () => {
		const element = document.getElementById("packages");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
		id="home"
		className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
		>
		<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2Q3YjMzZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
			<div className="grid md:grid-cols-2 gap-12 items-center">
			<div className="space-y-8">
				<div className="inline-block">
				<span className="text-yellow-500 text-sm font-semibold tracking-wider border border-yellow-500/30 px-4 py-3 rounded-full">
					Assalamualaikum, Warga EzQuran Centre
				</span>
				</div>

				<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-loose">
				Belajar Al-Quran
				<span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2">
					Dengan Mudah
				</span>
				</h1>

				<p className="text-xl text-gray-300 leading-relaxed">
				Platform pembelajaran Al-Quran yang komprehensif untuk semua
				peringkat. Belajar membaca, tilawah, dan memahami Al-Quran dengan
				bimbingan guru berpengalaman.
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
				<button
					onClick={scrollToPackages}
					className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
				>
					Daftar Sekarang
				</button>
				<button
					onClick={() =>
					window.open("https://wa.me/60183868296", "_blank")
					}
					className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
				>
					Hubungi Kami
				</button>
				</div>

				<div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<BookOpen className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">500+</p>
					<p className="text-sm text-gray-400">Pelajar</p>
				</div>
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<Users className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">20+</p>
					<p className="text-sm text-gray-400">Guru</p>
				</div>
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<Award className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">8+</p>
					<p className="text-sm text-gray-400">Tahun</p>
				</div>
				</div>
			</div>

			<div className="relative hidden md:block">
				<div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 backdrop-blur-sm border border-yellow-500/30 flex items-center justify-center">
				<div className="text-center space-y-6 p-12">
					<div className="text-8xl text-yellow-500 mb-4">🕌</div>
					<div
					className="text-4xl font-bold text-white mb-4"
					style={{ fontFamily: "serif" }}
					>
					بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
					</div>
					<p className="text-lg text-gray-300">
					Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang
					</p>
				</div>
				</div>
				<div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-6 -left-6 w-40 h-40 bg-yellow-600/20 rounded-full blur-3xl"></div>
			</div>
			</div>
		</div>
		</section>
	);
}
