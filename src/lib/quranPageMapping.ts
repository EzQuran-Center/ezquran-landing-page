/**
 * Quran Page Mapping - Maps verses to their Mushaf page numbers
 * The Quran has 604 pages in the standard Mushaf
 */

export interface PageInfo {
  page: number;
  surah: number;
  ayahStart: number;
  ayahEnd: number;
}

/**
 * Get the page number for a specific verse
 * This is a mapping based on the standard Mushaf (Madinah Mushaf)
 */
export function getPageNumber(surahNumber: number, ayahNumber: number): number {
  // Use the API or mapping to get page number
  // For now, we'll use a simplified calculation
  // In production, you should use the complete mapping
  
  const pageMap = getPageMapping();
  const key = `${surahNumber}:${ayahNumber}`;
  return pageMap[key] || 1;
}

/**
 * Get all verses on a specific page
 */
export function getVersesOnPage(pageNumber: number): PageInfo[] {
  // This would return all verses that appear on this page
  // You'll need a complete mapping database
  return [];
}

/**
 * Get the starting page for a surah
 */
export function getSurahStartPage(surahNumber: number): number {
  const surahPages: { [key: number]: number } = {
    1: 1,    // Al-Fatihah
    2: 2,    // Al-Baqarah
    3: 50,   // Ali 'Imran
    4: 77,   // An-Nisa
    5: 106,  // Al-Ma'idah
    6: 128,  // Al-An'am
    7: 151,  // Al-A'raf
    8: 177,  // Al-Anfal
    9: 187,  // At-Tawbah
    10: 208, // Yunus
    11: 221, // Hud
    12: 235, // Yusuf
    13: 249, // Ar-Ra'd
    14: 255, // Ibrahim
    15: 262, // Al-Hijr
    16: 267, // An-Nahl
    17: 282, // Al-Isra
    18: 293, // Al-Kahf
    19: 305, // Maryam
    20: 312, // Ta-Ha
    21: 322, // Al-Anbiya
    22: 332, // Al-Hajj
    23: 342, // Al-Mu'minun
    24: 350, // An-Nur
    25: 359, // Al-Furqan
    26: 367, // Ash-Shu'ara
    27: 377, // An-Naml
    28: 385, // Al-Qasas
    29: 396, // Al-Ankabut
    30: 404, // Ar-Rum
    31: 411, // Luqman
    32: 415, // As-Sajdah
    33: 418, // Al-Ahzab
    34: 428, // Saba
    35: 434, // Fatir
    36: 440, // Ya-Sin
    37: 446, // As-Saffat
    38: 453, // Sad
    39: 458, // Az-Zumar
    40: 467, // Ghafir
    41: 477, // Fussilat
    42: 483, // Ash-Shuraa
    43: 489, // Az-Zukhruf
    44: 496, // Ad-Dukhan
    45: 499, // Al-Jathiyah
    46: 502, // Al-Ahqaf
    47: 507, // Muhammad
    48: 511, // Al-Fath
    49: 515, // Al-Hujurat
    50: 518, // Qaf
    51: 520, // Adh-Dhariyat
    52: 523, // At-Tur
    53: 526, // An-Najm
    54: 528, // Al-Qamar
    55: 531, // Ar-Rahman
    56: 534, // Al-Waqi'ah
    57: 537, // Al-Hadid
    58: 542, // Al-Mujadila
    59: 545, // Al-Hashr
    60: 549, // Al-Mumtahanah
    61: 551, // As-Saff
    62: 553, // Al-Jumu'ah
    63: 554, // Al-Munafiqun
    64: 556, // At-Taghabun
    65: 558, // At-Talaq
    66: 560, // At-Tahrim
    67: 562, // Al-Mulk
    68: 564, // Al-Qalam
    69: 566, // Al-Haqqah
    70: 568, // Al-Ma'arij
    71: 570, // Nuh
    72: 572, // Al-Jinn
    73: 574, // Al-Muzzammil
    74: 575, // Al-Muddaththir
    75: 577, // Al-Qiyamah
    76: 578, // Al-Insan
    77: 580, // Al-Mursalat
    78: 582, // An-Naba
    79: 583, // An-Nazi'at
    80: 585, // 'Abasa
    81: 586, // At-Takwir
    82: 587, // Al-Infitar
    83: 587, // Al-Mutaffifin
    84: 589, // Al-Inshiqaq
    85: 590, // Al-Buruj
    86: 591, // At-Tariq
    87: 591, // Al-A'la
    88: 592, // Al-Ghashiyah
    89: 593, // Al-Fajr
    90: 594, // Al-Balad
    91: 595, // Ash-Shams
    92: 595, // Al-Layl
    93: 596, // Ad-Duhaa
    94: 596, // Ash-Sharh
    95: 597, // At-Tin
    96: 597, // Al-'Alaq
    97: 598, // Al-Qadr
    98: 598, // Al-Bayyinah
    99: 599, // Az-Zalzalah
    100: 599, // Al-'Adiyat
    101: 600, // Al-Qari'ah
    102: 600, // At-Takathur
    103: 601, // Al-'Asr
    104: 601, // Al-Humazah
    105: 601, // Al-Fil
    106: 602, // Quraysh
    107: 602, // Al-Ma'un
    108: 602, // Al-Kawthar
    109: 603, // Al-Kafirun
    110: 603, // An-Nasr
    111: 603, // Al-Masad
    112: 604, // Al-Ikhlas
    113: 604, // Al-Falaq
    114: 604, // An-Nas
  };
  
  return surahPages[surahNumber] || 1;
}

/**
 * Get font family name for a specific page
 */
export function getPageFontFamily(pageNumber: number): string {
  const paddedPage = String(pageNumber).padStart(3, '0');
  return `QCF_P${paddedPage}`;
}

/**
 * Dynamically load a page font
 */
export function loadPageFont(pageNumber: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const fontFamily = getPageFontFamily(pageNumber);
    const fontPath = `/src/assets/font/p${pageNumber}.ttf`;
    
    // Check if font is already loaded
    if (document.fonts.check(`16px ${fontFamily}`)) {
      resolve();
      return;
    }
    
    // Create and load font face
    const fontFace = new FontFace(
      fontFamily,
      `url(${fontPath})`,
      { display: 'swap' }
    );
    
    fontFace.load()
      .then(loadedFont => {
        document.fonts.add(loadedFont);
        resolve();
      })
      .catch(reject);
  });
}

/**
 * Simplified page mapping - maps each verse to its page
 * This is a subset; you'll need the complete 6236 verse mapping
 */
function getPageMapping(): { [key: string]: number } {
  // This is a placeholder. In production, use a complete mapping database
  // or fetch from an API that provides page numbers
  return {
    '1:1': 1,
    '1:7': 1,
    '2:1': 2,
    '2:141': 22,
    '2:252': 40,
    // ... add complete mapping
  };
}

/**
 * Get pages for entire surah
 */
export function getSurahPages(surahNumber: number): number[] {
  const startPage = getSurahStartPage(surahNumber);
  const nextSurahPage = getSurahStartPage(surahNumber + 1);
  
  if (surahNumber === 114) {
    return [604]; // Last surah
  }
  
  const pages: number[] = [];
  for (let i = startPage; i < nextSurahPage; i++) {
    pages.push(i);
  }
  
  return pages;
}
