import { BookOpen, Users, Award, Play, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

import poster1 from '../assets/poster1.png'
import poster2 from '../assets/poster2.jpeg'
import videoBanner from '../assets/ezquran-banner-1.png'
import videoFile from '../assets/ezquran-vid.MOV'

export default function Hero() {

	const { t } = useTranslation();
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	// Close modal on ESC key press
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isVideoModalOpen) {
				setIsVideoModalOpen(false);
			}
		};
		
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isVideoModalOpen]);

	// Close modal when exiting fullscreen
	useEffect(() => {
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement && isVideoModalOpen) {
				// Optional: close modal when exiting fullscreen
				// setIsVideoModalOpen(false);
			}
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
		};
	}, [isVideoModalOpen]);

	const scrollToPackages = () => {
		const element = document.getElementById("packages");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
		{/* Hero Section */}
		<section
		id="home"
		className="relative min-h-screen flex items-center bg-gradient-to-br from-black via-black to-black overflow-hidden"
		>
		<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2Q3YjMzZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
			<div className="grid md:grid-cols-2 gap-12 items-center">
			<div className="space-y-8">
				<div className="inline-block">
				<span className="text-yellow-500 text-sm font-semibold tracking-wider border border-yellow-500/30 px-4 py-3 rounded-full">
					Assalamualaikum, Pencinta Al-Quran
				</span>
				</div>

				{/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-loose">
				Belajar Al-Quran {t('hero.title')}
				<span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2">
					Dengan Mudah
				</span>
				</h1> */}

				<h1 className="text-4xl md:text-4xl lg:text-7xl font-bold from-yellow-400 to-yellow-700 bg-clip-text text-transparent bg-gradient-to-r">
				{t('hero.title')}
				</h1>

				<p className="text-xl text-gray-300 leading-relaxed">
				{/* Platform pembelajaran Al-Quran yang komprehensif untuk semua
				peringkat. Belajar membaca, tilawah, dan memahami Al-Quran dengan
				bimbingan guru berpengalaman. */}
				{t('hero.subtitle')}
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
				<button
					onClick={scrollToPackages}
					className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30"
				>
					{t('hero.cta')}
				</button>
				</div>

				<div className="flex flex-col sm:flex-row gap-3">
				{/* App Store */}
				<a
					href="https://apps.apple.com/us/app/ezquran-tajwid-tadabbur/id6758323330"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
				>
					<svg viewBox="0 0 24 24" className="w-7 h-7 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
					</svg>
					<div>
					<p className="text-white/60 text-xs leading-none">Download on the</p>
					<p className="text-white font-semibold text-sm leading-tight">App Store</p>
					</div>
				</a>

				{/* Google Play */}
				<a
					href="https://play.google.com/store/apps/details?id=my.ezquran.app"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
				>
					<svg className="w-7 h-7 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
					<path d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z"></path>
					</svg>
					<div>
					<p className="text-white/60 text-xs leading-none">Get it on</p>
					<p className="text-white font-semibold text-sm leading-tight">Google Play</p>
					</div>
				</a>
				</div>

				<div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<BookOpen className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">500+</p>
					<p className="text-sm text-gray-400">{t('hero.students')}</p>
				</div>
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<Users className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">20+</p>
					<p className="text-sm text-gray-400">{t('hero.teachers')}</p>
				</div>
				<div className="text-center">
					<div className="flex justify-center mb-2">
					<Award className="text-yellow-500" size={28} />
					</div>
					<p className="text-2xl font-bold text-white">8+</p>
					<p className="text-sm text-gray-400">{t('hero.years')}</p>
				</div>
				</div>
			</div>

			<div className="relative hidden md:block">
				<div className="relative w-full max-h-[600px] rounded-2xl overflow-hidden backdrop-blur-sm flex items-center justify-center">
				<div className="text-center space-y-6 p-12">
					{/* <div className="text-8xl text-yellow-500 mb-4">🕌</div>
					<div className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "serif" }}>
					بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
					</div>
					<p className="text-lg text-gray-300">
					Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang
					</p> */}
					<img src={poster2} alt="Hero Banner" className="w-full h-full rounded-lg shadow-lg object-cover" />
				</div>
				</div>
				<div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-6 -left-6 w-40 h-40 bg-yellow-600/20 rounded-full blur-3xl"></div>
			</div>
			</div>
		</div>
		</section>

		{/* Video Thumbnail Section */}
		<section className="py-16 bg-black">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto">
					{/* <div 
						className="relative group cursor-pointer" 
						onClick={() => setIsVideoModalOpen(true)}
					>
						<div className="relative rounded-lg overflow-hidden shadow-2xl">
							<img 
								src={videoBanner} 
								alt="Video Thumbnail" 
								className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
							/>

							<div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
							
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="bg-white/90 backdrop-blur-sm rounded-full p-8 group-hover:bg-yellow-500 group-hover:scale-110 transition-all duration-300 shadow-2xl">
									<Play size={64} className="text-black fill-black" />
								</div>
							</div>
						</div>
					</div> */}
					{/* Video Player */}
					<video
						className="w-full rounded-lg"
						controls
						playsInline
						autoPlay
						src={videoFile}
						style={{ maxHeight: '60vh' }}
					>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</section>

		{/* Video Modal */}
		{isVideoModalOpen && (
			<div 
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
				onClick={() => setIsVideoModalOpen(false)}
			>
				<div 
					className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button - Desktop (outside video) */}
					<button
						onClick={() => setIsVideoModalOpen(false)}
						className="absolute -top-12 right-0 text-white hover:text-yellow-500 transition-colors hidden md:block z-50"
						aria-label="Close video"
					>
						<X size={32} />
					</button>

					{/* Close Button - Inside video container (visible in fullscreen) */}
					<button
						onClick={() => setIsVideoModalOpen(false)}
						className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all backdrop-blur-sm"
						aria-label="Close video"
					>
						<X size={24} />
					</button>
					
					{/* Video Player */}
					<video
						className="w-full rounded-lg"
						controls
						autoPlay
						playsInline
						src={videoFile}
						style={{ maxHeight: '80vh' }}
					>
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		)}
		</>
	);
}
