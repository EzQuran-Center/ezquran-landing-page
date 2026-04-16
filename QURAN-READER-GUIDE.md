# Quran Reader Feature Guide

## Overview
The Quran Reader is a comprehensive feature that allows users to read the entire Al-Quran with Mushaf-style display, translations, audio recitation, search functionality, and bookmarks.

## Features
✅ **Traditional Mushaf Display** - Beautiful Arabic text with traditional styling  
✅ **Audio Recitation** - High-quality audio by Sheikh Mishary Rashid Alafasy  
✅ **Bilingual Translations** - Malay (Basmeih) and English (Sahih International)  
✅ **Search Functionality** - Search across all verses  
✅ **Bookmarks** - Save your reading progress  
✅ **Navigation** - Browse all 114 Surahs easily  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  

## Components

### 1. QuranReader Component
**Location**: `/src/components/QuranReader.tsx`

**Key Features**:
- Sidebar with complete Surah list
- Main reading area with verse display
- Sticky header showing current Surah info
- Audio player controls for each verse
- Translation toggle (show/hide)
- Search panel
- Bookmark functionality
- Previous/Next Surah navigation

**Props**: None (standalone page)

### 2. Quran API Library
**Location**: `/src/lib/quran.ts`

**Key Functions**:
```typescript
// Fetch surah with Arabic text and translations
fetchSurahEditions(surahNumber: number)

// Get complete list of all surahs
fetchAllSurahs()

// Get audio URL for specific verse
getAudioUrl(surahNumber: number, ayahNumber: number)

// Search across Quran
searchQuran(query: string, language: 'en' | 'ms')

// Bookmark management
saveBookmark(surah: number, ayah: number)
getBookmark()
```

**Data Structures**:
```typescript
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface QuranVerse {
  number: number;
  numberInSurah: number;
  text: string;
  surah: { number, name, englishName };
  audio?: string;
}
```

## API Integration

The Quran Reader uses the **AlQuran Cloud API** (https://alquran.cloud):

### Endpoints Used:
1. `/surah` - Get all surahs list
2. `/surah/{number}` - Get Arabic text
3. `/surah/{number}/ms.basmeih` - Get Malay translation
4. `/surah/{number}/en.sahih` - Get English translation
5. `/search/{query}/all/{edition}` - Search verses

### Audio CDN:
Audio files are served from: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/`

Format: `{surah_padded}{ayah_padded}.mp3` (e.g., `001001.mp3` for Surah 1, Ayah 1)

## User Features

### 1. Reading Experience
- **Bismillah**: Automatically displayed at the start of each Surah (except Surah 9)
- **Verse Numbers**: Arabic verse numbers (﴿١﴾) displayed inline
- **Translation**: Toggle between show/hide, switch between Malay/English
- **Highlighting**: Currently playing verse is highlighted with yellow border

### 2. Audio Player
- **Play Button**: Click play icon next to any verse
- **Auto-Continue**: Automatically plays next verse when current finishes
- **Pause Control**: Pause button appears during playback
- **Visual Feedback**: Playing verse gets highlighted

### 3. Navigation
- **Sidebar**: Complete list of all 114 Surahs
- **Quick Info**: Each Surah shows name (Arabic & English), translation, verse count
- **Previous/Next Buttons**: Navigate between Surahs at bottom
- **Mobile Menu**: Hamburger menu for Surah list on mobile

### 4. Search
- **Global Search**: Search across entire Quran
- **Language Support**: Search in Malay or English translation
- **Results Display**: Shows Surah name, verse number, and matching text
- **Quick Navigation**: Click any result to jump to that verse

### 5. Bookmarks
- **Save Progress**: Bookmark icon next to each verse
- **Quick Access**: Saved bookmark shown in sidebar
- **Jump to Bookmark**: One-click navigation to bookmarked verse
- **Persistent Storage**: Saved in browser localStorage

## Routing

**Route**: `/quran`  
**Component**: `QuranReader`

Added in `App.tsx`:
```tsx
<Route path="/quran" element={<QuranReader />} />
```

## Navigation Menu

The Quran link appears in both desktop and mobile navigation:
- **Desktop**: Horizontal menu bar
- **Mobile**: Hamburger menu

Translation keys:
- `navbar.quran` (English): "Al-Quran"
- `navbar.quran` (Malay): "Al-Quran"

## Styling

### Custom CSS
Added in `/src/index.css`:
```css
.font-arabic {
  font-family: 'Amiri Quran', 'Arabic Typesetting', 'Traditional Arabic', serif;
  line-height: 2;
  letter-spacing: 0.02em;
}
```

### Google Font
Imported: **Amiri Quran** - Traditional Quranic font

### Color Scheme
- **Primary**: Yellow (#FBBF24, yellow-500)
- **Background**: Black gradient
- **Text**: White for body, Yellow for accents
- **Active State**: Yellow background for selected items
- **Playing Verse**: Yellow border with yellow/20 background

## Data Storage

### LocalStorage Keys:
- `ezquran_bookmark`: Stores user's bookmark
  ```json
  {
    "surah": 1,
    "ayah": 5,
    "timestamp": "2024-04-16T..."
  }
  ```

## Performance Considerations

1. **API Calls**: 
   - Surahs fetched once on mount
   - Verses fetched per Surah (cached by browser)
   - Search only triggers on button click

2. **Audio Loading**: 
   - Audio files loaded on-demand when play button clicked
   - Auto-cleanup when switching verses

3. **Scroll Behavior**: 
   - Smooth scroll to top when changing Surahs
   - Smooth scroll to verse when using search/bookmark navigation

## Mobile Optimization

- **Responsive Sidebar**: Slides in/out on mobile, always visible on desktop
- **Touch-Friendly**: Large touch targets for buttons
- **Font Sizing**: Adaptive font sizes (text-3xl on mobile, text-4xl on desktop)
- **Sticky Header**: Header stays visible while scrolling

## Bilingual Support

All UI elements support English and Malay:
- Surah List / Senarai Surah
- Search Verses / Cari Ayat
- Translation / Terjemahan
- Hide / Sembunyi
- Previous Surah / Surah Sebelum
- Next Surah / Surah Seterusnya
- Loading / Memuatkan

## Future Enhancements

Potential features for future development:
1. **Tafsir Integration** - Add Quranic commentary
2. **Reading Goals** - Track daily reading progress
3. **Multiple Reciters** - Choose from different Sheikh recitations
4. **Night Mode** - Additional dark theme option
5. **Copy Verse** - Share or copy individual verses
6. **Verse-by-Verse Mode** - Navigate verse by verse instead of full Surah
7. **Juz Navigation** - Browse by Juz (30 parts)
8. **Page Navigation** - Browse by Mushaf page number (604 pages)
9. **Offline Support** - Cache for offline reading
10. **Notes** - Personal notes on verses

## Troubleshooting

### Audio Not Playing
- Check internet connection
- Verify CDN accessibility
- Check browser audio permissions

### Translation Not Showing
- Ensure showTranslation state is true
- Verify API response contains translation data
- Check console for API errors

### Bookmark Not Saving
- Check browser localStorage support
- Verify no browser restrictions on storage
- Clear localStorage if corrupted

### Search Not Working
- Verify search query has minimum characters
- Check internet connection for API call
- Review console for API errors

## Credits

- **API**: AlQuran Cloud (https://alquran.cloud)
- **Reciter**: Sheikh Mishary Rashid Alafasy
- **Malay Translation**: Abdullah Muhammad Basmeih
- **English Translation**: Sahih International
- **Font**: Amiri Quran (Google Fonts)

## License

This feature is part of the EzQuran platform. All Quranic content is provided by AlQuran Cloud under their terms of use.

---

**Last Updated**: April 2024
**Version**: 1.0.0
