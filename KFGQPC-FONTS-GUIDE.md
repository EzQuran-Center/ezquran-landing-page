# KFGQPC Quranic Fonts Integration

## Overview
The EzQuran landing page now uses **KFGQPC (King Fahd Glorious Quran Printing Complex)** page-specific fonts to display Quranic text exactly as it appears in the traditional Mushaf.

## Font Files
- **Location**: `/src/assets/font/`
- **Format**: TTF (TrueType Font)
- **Count**: 604 files (p1.ttf through p604.ttf)
- **Each font**: Represents one page of the Quran Mushaf

## How It Works

### 1. Dynamic Font Loading
The system dynamically loads fonts based on which Mushaf page is being displayed:

```typescript
// Hook: useQuranPageFont
const fontFamily = useQuranPageFont(pageNumber);
```

### 2. Page Mapping
Each verse is mapped to its corresponding Mushaf page number:

```typescript
// File: quranPageMapping.ts
- getSurahStartPage(surahNumber) // Get first page of a surah
- getSurahPages(surahNumber)     // Get all pages for a surah
- getPageFontFamily(pageNumber)  // Get font name for a page
```

### 3. Font Naming Convention
- **Android/Web**: `p1.ttf`, `p2.ttf`, ..., `p604.ttf`
- **Font Family CSS**: `QCF_P001`, `QCF_P002`, ..., `QCF_P604`

## Implementation Details

### Files Modified
1. **QuranReader.tsx** - Main component using page fonts
2. **useQuranPageFont.ts** - Custom hook for dynamic font loading
3. **quranPageMapping.ts** - Page number mapping utilities
4. **quran.ts** - API integration updated to fetch page numbers

### Key Features
✅ **Authentic Mushaf Display** - Exact representation of printed Quran
✅ **Dynamic Loading** - Fonts load on-demand to optimize performance
✅ **Page-Based Rendering** - Each verse uses its Mushaf page font
✅ **Fallback Fonts** - Scheherazade New as fallback if KFGQPC not loaded

### Usage Example

```typescript
// In QuranReader component
const pageNumber = ayah.page || getSurahStartPage(currentSurah);
const pageFontFamily = getPageFontFamily(pageNumber);

<p style={{ fontFamily: pageFontFamily }}>
  {ayah.text}
</p>
```

## Font Loading Strategy

### On-Demand Loading
```typescript
// Fonts are loaded dynamically when needed
@font-face {
  font-family: 'QCF_P001';
  src: url('/src/assets/font/p1.ttf') format('truetype');
  font-display: swap;
}
```

### Preloading
The system preloads fonts for the current surah to ensure smooth reading:
```typescript
const surahPages = getSurahPages(currentSurah);
useQuranPageFont(surahPages[0]); // Preload first page
```

## Page Number Mapping

### Surah Start Pages (Sample)
| Surah | Name | Start Page |
|-------|------|------------|
| 1 | Al-Fatihah | 1 |
| 2 | Al-Baqarah | 2 |
| 3 | Ali 'Imran | 50 |
| 18 | Al-Kahf | 293 |
| 36 | Ya-Sin | 440 |
| 67 | Al-Mulk | 562 |
| 114 | An-Nas | 604 |

*Full mapping available in `quranPageMapping.ts`*

## Components

### 1. useQuranPageFont Hook
```typescript
export function useQuranPageFont(pageNumber: number): string
```
- Dynamically loads the font for a specific page
- Returns the font family name
- Handles cleanup on unmount

### 2. getPageFontFamily Utility
```typescript
export function getPageFontFamily(pageNumber: number): string
```
- Returns CSS font-family string
- Includes fallback fonts
- Example: `"QCF_P001, 'Scheherazade New'"`

### 3. Page Mapping Functions
```typescript
getSurahStartPage(surahNumber: number): number
getSurahPages(surahNumber: number): number[]
```

## Styling

### Arabic Text Classes
```css
/* Page-specific font applied via inline style */
<p style={{ fontFamily: getPageFontFamily(pageNumber) }}>
  Arabic text here
</p>
```

### Font Characteristics
- **Line Height**: 2.2-2.5 for readability
- **Text Direction**: RTL (right-to-left)
- **Font Size**: Responsive (3xl on mobile, 5xl on desktop)
- **Font Display**: `swap` for better loading performance

## Performance Considerations

1. **Lazy Loading**: Fonts load only when needed
2. **Font Caching**: Browser caches loaded fonts
3. **Preload Strategy**: First page of each surah preloaded
4. **Fallback System**: Scheherazade New as backup

## API Integration

The Quran API returns page numbers with each verse:
```typescript
const response = await fetch(
  `${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`
);
// Returns: ayahs with page numbers
```

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

## Troubleshooting

### Fonts Not Loading?
1. Check font files exist in `/src/assets/font/`
2. Verify Vite can access the public directory
3. Check browser console for font loading errors
4. Ensure correct path in font face declaration

### Page Numbers Missing?
1. Verify API response includes `page` property
2. Check fallback to `getSurahStartPage()` is working
3. Ensure quranPageMapping.ts has complete mapping

### Font Display Issues?
1. Clear browser cache
2. Check font-display setting
3. Verify fallback fonts are loading
4. Test with different browsers

## Future Enhancements

- [ ] Add full 6236-verse page mapping
- [ ] Optimize font loading with service workers
- [ ] Add Juz-based navigation
- [ ] Implement page-by-page reading mode
- [ ] Add font preloading for next/previous pages

## Credits

- **Fonts**: KFGQPC (King Fahd Glorious Quran Printing Complex)
- **API**: AlQuran Cloud
- **Fallback Font**: Scheherazade New (SIL Open Font License)

---

**Last Updated**: April 16, 2026  
**Version**: 1.0.0
