// Local Mushaf Data Loader using quran_words_v2.json
import quranWordsData from '../assets/mushaf/quran_words_v2.json';
import mushafLayoutsData from '../assets/mushaf/mushaf_layouts.json';

export interface QuranWord {
  id: number;
  location: string;
  surah: number;
  ayah: number;
  word: number;
  text: string;
}

export interface PageLayout {
  page_number: number;
  line_number: number;
  line_type: string;
  is_centered: number;
  first_word_id: string | number;
  last_word_id: string | number;
  surah_number: string | number;
}

export interface AyahData {
  surah: number;
  ayah: number;
  text: string;
  words: QuranWord[];
  page: number;
}

// Parse the JSON data
const wordsTable = quranWordsData.tables.words.rows as QuranWord[];
const pagesTable = mushafLayoutsData.tables.pages.rows as PageLayout[];

/**
 * Get all words for a specific surah
 */
export function getSurahWords(surahNumber: number): QuranWord[] {
  return wordsTable.filter(word => word.surah === surahNumber);
}

/**
 * Get all words for a specific ayah
 */
export function getAyahWords(surahNumber: number, ayahNumber: number): QuranWord[] {
  return wordsTable.filter(word => word.surah === surahNumber && word.ayah === ayahNumber);
}

/**
 * Group words by ayah for a surah
 */
export function getSurahAyahs(surahNumber: number): AyahData[] {
  const surahWords = getSurahWords(surahNumber);
  const ayahsMap = new Map<number, QuranWord[]>();
  
  // Group words by ayah
  surahWords.forEach(word => {
    if (!ayahsMap.has(word.ayah)) {
      ayahsMap.set(word.ayah, []);
    }
    ayahsMap.get(word.ayah)!.push(word);
  });
  
  // Convert to AyahData array
  const ayahs: AyahData[] = [];
  ayahsMap.forEach((words, ayahNumber) => {
    const text = words.map(w => w.text).join('');
    const page = getPageForAyah(surahNumber, ayahNumber);
    
    ayahs.push({
      surah: surahNumber,
      ayah: ayahNumber,
      text,
      words,
      page
    });
  });
  
  return ayahs.sort((a, b) => a.ayah - b.ayah);
}

/**
 * Get page number for a specific ayah
 */
export function getPageForAyah(surahNumber: number, ayahNumber: number): number {
  // Find the first word of this ayah
  const firstWord = wordsTable.find(
    word => word.surah === surahNumber && word.ayah === ayahNumber
  );
  
  if (!firstWord) return 1;
  
  // Find which page this word is on
  const pageLayout = pagesTable.find(layout => {
    const firstId = Number(layout.first_word_id);
    const lastId = Number(layout.last_word_id);
    return firstWord.id >= firstId && firstWord.id <= lastId;
  });
  
  return pageLayout?.page_number || 1;
}

/**
 * Get page number for first word of a surah
 */
export function getSurahStartPage(surahNumber: number): number {
  return getPageForAyah(surahNumber, 1);
}

/**
 * Get all pages for a surah
 */
export function getSurahPages(surahNumber: number): number[] {
  const surahWords = getSurahWords(surahNumber);
  if (surahWords.length === 0) return [1];
  
  const firstWordId = surahWords[0].id;
  const lastWordId = surahWords[surahWords.length - 1].id;
  
  const pages = new Set<number>();
  
  pagesTable.forEach(layout => {
    const firstId = Number(layout.first_word_id);
    const lastId = Number(layout.last_word_id);
    
    // Check if this page contains any words from this surah
    if (
      (firstWordId <= lastId && lastWordId >= firstId) ||
      (firstId <= lastWordId && lastId >= firstWordId)
    ) {
      pages.add(layout.page_number);
    }
  });
  
  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * Get word by ID
 */
export function getWordById(id: number): QuranWord | undefined {
  return wordsTable.find(word => word.id === id);
}

/**
 * Get page layout information
 */
export function getPageLayout(pageNumber: number): PageLayout[] {
  return pagesTable.filter(layout => layout.page_number === pageNumber);
}

/**
 * Get total number of ayahs in a surah
 */
export function getSurahAyahCount(surahNumber: number): number {
  const surahWords = getSurahWords(surahNumber);
  if (surahWords.length === 0) return 0;
  
  const ayahNumbers = new Set(surahWords.map(w => w.ayah));
  return ayahNumbers.size;
}

/**
 * Get mushaf info
 */
export function getMushafInfo() {
  return mushafLayoutsData.tables.info.rows[0];
}

export default {
  getSurahWords,
  getAyahWords,
  getSurahAyahs,
  getPageForAyah,
  getSurahStartPage,
  getSurahPages,
  getWordById,
  getPageLayout,
  getSurahAyahCount,
  getMushafInfo
};
