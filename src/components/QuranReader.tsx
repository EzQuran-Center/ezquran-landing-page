import { useState, useEffect, useRef } from "react";
import {
	Search,
	Pause,
	Play,
	Bookmark,
	BookmarkCheck,
	ChevronLeft,
	ChevronRight,
	Menu,
	X,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
	fetchAllSurahs,
	fetchSurahWithTranslation,
	getAudioUrl,
	saveBookmark,
	getBookmark,
	searchQuran,
	type Surah,
} from "../lib/quran";
import { useTranslation } from "../hooks/useTranslation";
import { getPageFontFamily, useQuranSurahFonts } from "../hooks/useQuranPageFont";
import {
	getSurahAyahs,
	getSurahStartPage,
	getSurahPages,
	type AyahData,
} from "../lib/mushafData";

export default function QuranReader() {
	const { language } = useTranslation();
	const lang = (language === "ms" ? "ms" : "en") as "en" | "ms";

	const [surahs, setSurahs] = useState<Surah[]>([]);
	const [currentSurah, setCurrentSurah] = useState<number>(1);
	const [verses, setVerses] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [showSidebar, setShowSidebar] = useState(false);
	const [showTranslation, setShowTranslation] = useState(true);
	const [translationLang, setTranslationLang] = useState<"ms" | "en">("en");

	// Audio state
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentAyah, setCurrentAyah] = useState<number | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Search state
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [searching, setSearching] = useState(false);

	// Bookmark state
	const [bookmark, setBookmark] = useState<{
		surah: number;
		ayah: number;
	} | null>(null);

	// Load surahs list
	useEffect(() => {
		fetchAllSurahs()
			.then((data) => setSurahs(data))
			.catch((err) => console.error("Error loading surahs:", err));

		// Load bookmark
		const saved = getBookmark();
		if (saved) {
			setBookmark(saved);
		}
	}, []);

	// Load surah verses from local mushaf data
	useEffect(() => {
		setLoading(true);
		try {
			// Get Arabic text from local mushaf data
			const arabicAyahs = getSurahAyahs(currentSurah);

			// Fetch translations from API
			Promise.all([
				fetchSurahWithTranslation(currentSurah, "ms.basmeih"),
				fetchSurahWithTranslation(currentSurah, "en.sahih"),
			])
				.then(([malayData, englishData]) => {
					const data = {
						arabic: arabicAyahs,
						malay: malayData.ayahs,
						english: englishData.ayahs,
						surahInfo: {
							number: malayData.number,
							name: malayData.name,
							englishName: malayData.englishName,
							englishNameTranslation:
								malayData.englishNameTranslation,
							numberOfAyahs: arabicAyahs.length,
							revelationType: malayData.revelationType,
						},
					};
					setVerses(data);
					setLoading(false);
					// Scroll to top when surah changes
					window.scrollTo({ top: 0, behavior: "smooth" });
				})
				.catch((err) => {
					console.error("Error loading translations:", err);
					setLoading(false);
				});
		} catch (err) {
			console.error("Error loading surah:", err);
			setLoading(false);
		}
	}, [currentSurah]);

	// Load fonts for ALL pages in the current surah so each ayah gates on its own page font
	const surahPages = getSurahPages(currentSurah);
	const loadedPages = useQuranSurahFonts(surahPages);

	// Audio player
	const playAyah = (ayahNumber: number) => {
		if (audioRef.current) {
			audioRef.current.pause();
		}

		const audioUrl = getAudioUrl(currentSurah, ayahNumber);
		const audio = new Audio(audioUrl);
		audioRef.current = audio;

		audio.play();
		setIsPlaying(true);
		setCurrentAyah(ayahNumber);

		audio.onended = () => {
			// Auto-play next ayah
			if (verses && ayahNumber < verses.arabic.length) {
				playAyah(ayahNumber + 1);
			} else {
				setIsPlaying(false);
				setCurrentAyah(null);
			}
		};

		audio.onerror = () => {
			setIsPlaying(false);
			setCurrentAyah(null);
		};
	};

	const pauseAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	const handleBookmark = (ayahNumber: number) => {
		saveBookmark(currentSurah, ayahNumber);
		setBookmark({ surah: currentSurah, ayah: ayahNumber });
	};

	const goToBookmark = () => {
		if (bookmark) {
			setCurrentSurah(bookmark.surah);
			setTimeout(() => {
				const element = document.getElementById(
					`ayah-${bookmark.ayah}`,
				);
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}, 500);
		}
	};

	const handleSearch = async () => {
		if (!searchQuery.trim()) return;

		setSearching(true);
		try {
			const results = await searchQuran(searchQuery, translationLang);
			setSearchResults(results.matches || []);
		} catch (err) {
			console.error("Search error:", err);
		} finally {
			setSearching(false);
		}
	};

	const goToVerse = (surahNumber: number, ayahNumber: number) => {
		setCurrentSurah(surahNumber);
		setShowSearch(false);
		setTimeout(() => {
			const element = document.getElementById(`ayah-${ayahNumber}`);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}, 500);
	};

	const currentSurahInfo = surahs.find((s) => s.number === currentSurah);

	return (
		<div className="min-h-screen bg-black">
			{/* <Navbar /> */}

			<div className="pt-0 flex">
				{/* Sidebar */}
				<div className={`fixed inset-y-0 left-0 z-40 w-80 bg-black border-r border-yellow-500/20 transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static overflow-y-auto mt-0`}>
					<div className="p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-yellow-500">
								{lang === "ms" ? "Senarai Surah" : "Surah List"}
							</h2>
							<button
								onClick={() => setShowSidebar(false)}
								className="lg:hidden text-white"
							>
								<X size={24} />
							</button>
						</div>

						{/* Quick actions */}
						<div className="space-y-2 mb-6">
							<button
								onClick={() => setShowSearch(!showSearch)}
								className="w-full flex items-center gap-3 px-4 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg text-white transition-colors"
							>
								<Search size={20} />
								<span>{lang === "ms" ? "Cari Ayat" : "Search Verses"}</span>
							</button>

							{bookmark && (
								<button
									onClick={goToBookmark}
									className="w-full flex items-center gap-3 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-white transition-colors"
								>
									<BookmarkCheck size={20} />
									<span>
										{lang === "ms" ? "Tanda Buku" : "Bookmark"} : {bookmark.surah}:{bookmark.ayah}
									</span>
								</button>
							)}
						</div>

						{/* Surah list */}
						<div className="space-y-2">
							{surahs.map((surah) => (
								<button
									key={surah.number}
									onClick={() => {
										setCurrentSurah(surah.number);
										setShowSidebar(false);
									}}
									className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
										currentSurah === surah.number
											? "bg-yellow-500 text-black font-bold"
											: "bg-white/5 hover:bg-white/10 text-white"
									}`}
								>
									<div className="flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="text-sm opacity-70">{surah.number}.</span>
												<span>{surah.englishName}</span>
											</div>
											<div className="text-xs opacity-70 mt-1">
												{surah.englishNameTranslation} •{" "}
												{surah.numberOfAyahs}{" "}
												{lang === "ms" ? "ayat" : "verses"}
											</div>
										</div>
									{/* <span 
										className="text-2xl"
										style={{ fontFamily: getPageFontFamily(getSurahStartPage(surah.number)) }}
									>
										{surah.name}
									</span> */}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Main content */}
				<div className="pt-0 flex-1 min-h-screen">
					{/* Header */}
					<div className="sticky top-0 z-30 bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-lg">
						<div className="max-w-5xl mx-auto px-4 py-6">
							<div className="flex items-center justify-between">
								<button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden text-black">
									<Menu size={28} />
								</button>

								<div className="flex-1 text-center pt-6">
									{currentSurahInfo && (
										<div>
										{loadedPages.has(getSurahStartPage(currentSurah)) ? (
											<h1 
												className="text-4xl md:text-5xl font-bold text-black mb-1"
												style={{ fontFamily: getPageFontFamily(getSurahStartPage(currentSurah)) }}
											>
												{currentSurahInfo.name}
											</h1>
										) : (
											<div className="h-12 w-48 mx-auto bg-black/20 rounded animate-pulse mb-1" />
										)}
											<p className="text-black/80">
												{currentSurahInfo.englishName} -{" "}
												{
													currentSurahInfo.englishNameTranslation
												}
											</p>
											<p className="text-sm text-black/70">
												{
													currentSurahInfo.revelationType
												}{" "}
												•{" "}
												{currentSurahInfo.numberOfAyahs}{" "}
												{lang === "ms"
													? "Ayat"
													: "Verses"}
											</p>
										</div>
									)}
								</div>

								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setShowTranslation(!showTranslation)
										}
										className={`px-4 py-2 rounded-lg font-semibold transition-all ${
											showTranslation
												? "bg-black text-yellow-500"
												: "bg-black/20 text-black"
										}`}
									>
										{showTranslation
											? lang === "ms"
												? "Sembunyi"
												: "Hide"
											: lang === "ms"
												? "Terjemahan"
												: "Translation"}
									</button>

									{showTranslation && (
										<select
											value={translationLang}
											onChange={(e) =>
												setTranslationLang(
													e.target.value as
														| "ms"
														| "en",
												)
											}
											className="px-3 py-2 bg-black/20 text-black rounded-lg font-semibold"
										>
											<option value="en">English</option>
											<option value="ms">Malay</option>
										</select>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Search panel */}
					{showSearch && (
						<div className="bg-gray-900 border-b border-yellow-500/20 p-6">
							<div className="max-w-5xl mx-auto">
								<div className="flex gap-3 mb-4">
									<input
										type="text"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										onKeyPress={(e) =>
											e.key === "Enter" && handleSearch()
										}
										placeholder={
											lang === "ms"
												? "Cari dalam Al-Quran..."
												: "Search in the Quran..."
										}
										className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
									/>
									<button
										onClick={handleSearch}
										disabled={searching}
										className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
									>
										{searching
											? lang === "ms"
												? "Mencari..."
												: "Searching..."
											: lang === "ms"
												? "Cari"
												: "Search"}
									</button>
								</div>

								{searchResults.length > 0 && (
									<div className="space-y-3 max-h-96 overflow-y-auto">
										{searchResults.map((result, idx) => (
											<div
												key={idx}
												onClick={() =>
													goToVerse(
														result.surah.number,
														result.numberInSurah,
													)
												}
												className="p-4 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
											>
												<div className="text-yellow-500 font-semibold mb-2">
													{result.surah.englishName} (
													{result.surah.number}:
													{result.numberInSurah})
												</div>
												<div className="text-gray-300 text-sm">
													{result.text}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					)}

					{/* Verses */}
					<div className="max-w-5xl mx-auto px-4 py-8">
						{loading ? (
							<div className="text-center py-20">
								<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
								<p className="text-white mt-4">
									{lang === "ms"
										? "Memuatkan..."
										: "Loading..."}
								</p>
							</div>
						) : verses ? (
							<div className="space-y-8">
								{/* Bismillah (except for Surah 9) */}
								{currentSurah !== 1 && currentSurah !== 9 && (
									<div className="text-center py-8">
								{loadedPages.has(getSurahStartPage(currentSurah)) ? (
									<p 
										className="text-4xl md:text-5xl text-yellow-500"
										style={{ fontFamily: getPageFontFamily(getSurahStartPage(currentSurah)) }}
									>
										بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
									</p>
								) : (
									<div className="h-16 flex items-center justify-center">
										<div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
									</div>
								)}
								</div>
							)}

								{verses.arabic.map(
								(ayah: AyahData, index: number) => {
								const malayTranslation      = verses.malay[index];
								const englishTranslation    = verses.english[index];
								const isBookmarked          = bookmark?.surah === currentSurah && bookmark?.ayah === ayah.ayah;
								const isCurrentlyPlaying    = isPlaying && currentAyah === ayah.ayah;
							
								// Get page number for this verse and load appropriate font
								const pageNumber        = ayah.page;
								const pageFontFamily    = `QCF_P${String(pageNumber).padStart(3, '0')}`;

								// Gate each ayah on ITS OWN page font being loaded
								const arabicReady = loadedPages.has(pageNumber);
							
								return (
									<div
									key={`${ayah.surah}-${ayah.ayah}`}
									id={`ayah-${ayah.ayah}`}
									className={`p-6 rounded-2xl transition-all overflow-hidden min-w-0 ${
										isCurrentlyPlaying ? "bg-yellow-500/20 border-2 border-yellow-500" : "bg-white/5 border border-white/10"
									}`}
								>
									{/* Arabic text with KFGQPC font */}
								<div className="text-right mb-6 overflow-hidden">
								{arabicReady ? (
									<p 
										className="text-2xl md:text-4xl leading-relaxed text-white break-all overflow-wrap-anywhere"
										style={{ 
											fontFamily: pageFontFamily,
											lineHeight: '2',
											wordBreak: 'break-all',
											overflowWrap: 'anywhere',
											whiteSpace: 'normal',
											}}
										>
											{ayah.text}
										</p>
									) : (
										<div className="flex justify-end">
											<div className="h-12 w-3/4 bg-white/10 rounded animate-pulse" />
										</div>
									)}								</div>
									{/* Translation */}
									{showTranslation && (
										<div className="mb-4 p-4 bg-black/30 rounded-lg">
											<p className="text-gray-300 leading-relaxed">
												{translationLang === "ms"
													? malayTranslation.text
													: englishTranslation.text}
											</p>
										</div>
									)}

									{/* Controls */}
									<div className="flex items-center justify-between pt-4 border-t border-white/10">
										<div className="flex items-center gap-3">
											<span className="text-yellow-500 font-semibold">
												{currentSurah}:{ayah.ayah}
											</span>
											<span className="text-gray-400 text-sm">
												{lang === "ms" ? "Muka Surat" : "Page"} {pageNumber}
											</span>
										</div>
													<div className="flex items-center gap-2">
														<button
															onClick={() =>
																handleBookmark(
																	ayah.ayah,
																)
															}
															className={`p-2 rounded-lg transition-colors ${
																isBookmarked
																	? "bg-green-500 text-white"
																	: "bg-white/10 text-white hover:bg-white/20"
															}`}
															title={
																lang === "ms"
																	? "Tanda Buku"
																	: "Bookmark"
															}
														>
															{isBookmarked ? (
																<BookmarkCheck
																	size={20}
																/>
															) : (
																<Bookmark
																	size={20}
																/>
															)}
														</button>

														{/* <button
															onClick={() =>
																isCurrentlyPlaying
																	? pauseAudio()
																	: playAyah(
																			ayah.ayah,
																		)
															}
															className="p-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
															title={
																lang === "ms"
																	? "Main Audio"
																	: "Play Audio"
															}
														>
															{isCurrentlyPlaying ? (
																<Pause
																	size={20}
																/>
															) : (
																<Play
																	size={20}
																/>
															)}
														</button> */}
													</div>
												</div>
											</div>
										);
									},
								)}
							</div>
						) : (
							<div className="text-center py-20 text-gray-400">
								{lang === "ms"
									? "Tiada data"
									: "No data available"}
							</div>
						)}

						{/* Navigation */}
						{verses && (
							<div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
								<button
									onClick={() =>
										currentSurah > 1 &&
										setCurrentSurah(currentSurah - 1)
									}
									disabled={currentSurah === 1}
									className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
								>
									<ChevronLeft size={20} />
									{lang === "ms"
										? "Surah Sebelum"
										: "Previous Surah"}
								</button>

								<button
									onClick={() =>
										currentSurah < 114 &&
										setCurrentSurah(currentSurah + 1)
									}
									disabled={currentSurah === 114}
									className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
								>
									{lang === "ms"
										? "Surah Seterusnya"
										: "Next Surah"}
									<ChevronRight size={20} />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
