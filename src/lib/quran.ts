// Quran API configuration and helper functions

export interface Surah {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	numberOfAyahs: number;
	revelationType: string;
}

export const surahs: Surah[] = [
	{
		number: 1,
		name: "الفاتحة",
		englishName: "Al-Fatihah",
		englishNameTranslation: "The Opening",
		numberOfAyahs: 7,
		revelationType: "Meccan",
	},
	{
		number: 2,
		name: "البقرة",
		englishName: "Al-Baqarah",
		englishNameTranslation: "The Cow",
		numberOfAyahs: 286,
		revelationType: "Medinan",
	},
	{
		number: 3,
		name: "آل عمران",
		englishName: "Ali 'Imran",
		englishNameTranslation: "Family of Imran",
		numberOfAyahs: 200,
		revelationType: "Medinan",
	},
	{
		number: 4,
		name: "النساء",
		englishName: "An-Nisa",
		englishNameTranslation: "The Women",
		numberOfAyahs: 176,
		revelationType: "Medinan",
	},
	{
		number: 5,
		name: "المائدة",
		englishName: "Al-Ma'idah",
		englishNameTranslation: "The Table Spread",
		numberOfAyahs: 120,
		revelationType: "Medinan",
	},
	{
		number: 6,
		name: "الأنعام",
		englishName: "Al-An'am",
		englishNameTranslation: "The Cattle",
		numberOfAyahs: 165,
		revelationType: "Meccan",
	},
	{
		number: 7,
		name: "الأعراف",
		englishName: "Al-A'raf",
		englishNameTranslation: "The Heights",
		numberOfAyahs: 206,
		revelationType: "Meccan",
	},
	{
		number: 8,
		name: "الأنفال",
		englishName: "Al-Anfal",
		englishNameTranslation: "The Spoils of War",
		numberOfAyahs: 75,
		revelationType: "Medinan",
	},
	{
		number: 9,
		name: "التوبة",
		englishName: "At-Tawbah",
		englishNameTranslation: "The Repentance",
		numberOfAyahs: 129,
		revelationType: "Medinan",
	},
	{
		number: 10,
		name: "يونس",
		englishName: "Yunus",
		englishNameTranslation: "Jonah",
		numberOfAyahs: 109,
		revelationType: "Meccan",
	},
	// Add more surahs - I'll include key ones for now
	{
		number: 11,
		name: "هود",
		englishName: "Hud",
		englishNameTranslation: "Hud",
		numberOfAyahs: 123,
		revelationType: "Meccan",
	},
	{
		number: 12,
		name: "يوسف",
		englishName: "Yusuf",
		englishNameTranslation: "Joseph",
		numberOfAyahs: 111,
		revelationType: "Meccan",
	},
	{
		number: 18,
		name: "الكهف",
		englishName: "Al-Kahf",
		englishNameTranslation: "The Cave",
		numberOfAyahs: 110,
		revelationType: "Meccan",
	},
	{
		number: 36,
		name: "يس",
		englishName: "Ya-Sin",
		englishNameTranslation: "Ya Sin",
		numberOfAyahs: 83,
		revelationType: "Meccan",
	},
	{
		number: 55,
		name: "الرحمن",
		englishName: "Ar-Rahman",
		englishNameTranslation: "The Beneficent",
		numberOfAyahs: 78,
		revelationType: "Medinan",
	},
	{
		number: 67,
		name: "الملك",
		englishName: "Al-Mulk",
		englishNameTranslation: "The Sovereignty",
		numberOfAyahs: 30,
		revelationType: "Meccan",
	},
	{
		number: 112,
		name: "الإخلاص",
		englishName: "Al-Ikhlas",
		englishNameTranslation: "The Sincerity",
		numberOfAyahs: 4,
		revelationType: "Meccan",
	},
	{
		number: 113,
		name: "الفلق",
		englishName: "Al-Falaq",
		englishNameTranslation: "The Daybreak",
		numberOfAyahs: 5,
		revelationType: "Meccan",
	},
	{
		number: 114,
		name: "الناس",
		englishName: "An-Nas",
		englishNameTranslation: "Mankind",
		numberOfAyahs: 6,
		revelationType: "Meccan",
	},
];

// Quran API endpoints
const QURAN_API_BASE = "https://api.alquran.cloud/v1";
const QURAN_CDN = "https://cdn.islamic.network/quran";

export interface QuranVerse {
	number: number;
	numberInSurah: number;
	text: string;
	surah: {
		number: number;
		name: string;
		englishName: string;
	};
	audio?: string;
}

export interface Translation {
	text: string;
	language: string;
}

/**
 * Fetch surah with Arabic text
 */
export async function fetchSurah(surahNumber: number): Promise<any> {
	const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}`);
	const data = await response.json();
	return data.data;
}

/**
 * Fetch surah with translation
 * Identifiers: ms.basmeih (Malay), en.sahih (English)
 */
export async function fetchSurahWithTranslation(
	surahNumber: number,
	translationId: string = "en.sahih",
): Promise<any> {
	const response = await fetch(
		`${QURAN_API_BASE}/surah/${surahNumber}/${translationId}`,
	);
	const data = await response.json();
	return data.data;
}

/**
 * Fetch multiple editions (Arabic + translations + page numbers)
 */
export async function fetchSurahEditions(surahNumber: number): Promise<any> {
	// Fetch Arabic text with page numbers (using quran-uthmani edition)
	const arabicResponse = await fetch(
		`${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`,
	);
	const arabicData = await arabicResponse.json();
	const arabic = arabicData.data;

	// Fetch Malay translation
	const malay = await fetchSurahWithTranslation(surahNumber, "ms.basmeih");

	// Fetch English translation
	const english = await fetchSurahWithTranslation(surahNumber, "en.sahih");

	return {
		arabic: arabic.ayahs,
		malay: malay.ayahs,
		english: english.ayahs,
		surahInfo: {
			number: arabic.number,
			name: arabic.name,
			englishName: arabic.englishName,
			englishNameTranslation: arabic.englishNameTranslation,
			numberOfAyahs: arabic.numberOfAyahs,
			revelationType: arabic.revelationType,
		},
	};
}

/**
 * Get audio URL for a specific ayah
 * Using Mishary Rashid Alafasy recitation
 */
export function getAudioUrl(surahNumber: number, ayahNumber: number): string {
	const surahPadded = String(surahNumber).padStart(3, "0");
	const ayahPadded = String(ayahNumber).padStart(3, "0");
	return `${QURAN_CDN}/audio/128/ar.alafasy/${surahPadded}${ayahPadded}.mp3`;
}

/**
 * Search Quran verses
 */
export async function searchQuran(
	query: string,
	language: string = "en",
): Promise<any> {
	const edition = language === "ms" ? "ms.basmeih" : "en.sahih";
	const response = await fetch(
		`${QURAN_API_BASE}/search/${encodeURIComponent(query)}/all/${edition}`,
	);
	const data = await response.json();
	return data.data;
}

/**
 * Get bookmark key for localStorage
 */
export function getBookmarkKey(): string {
	return "ezquran_bookmark";
}

/**
 * Save bookmark
 */
export function saveBookmark(surah: number, ayah: number): void {
	const bookmark = { surah, ayah, timestamp: new Date().toISOString() };
	localStorage.setItem(getBookmarkKey(), JSON.stringify(bookmark));
}

/**
 * Get saved bookmark
 */
export function getBookmark(): { surah: number; ayah: number } | null {
	const saved = localStorage.getItem(getBookmarkKey());
	if (!saved) return null;
	try {
		const bookmark = JSON.parse(saved);
		return { surah: bookmark.surah, ayah: bookmark.ayah };
	} catch {
		return null;
	}
}

/**
 * Get complete surah list (all 114 surahs)
 */
export async function fetchAllSurahs(): Promise<Surah[]> {
	const response = await fetch(`${QURAN_API_BASE}/surah`);
	const data = await response.json();
	return data.data;
}
