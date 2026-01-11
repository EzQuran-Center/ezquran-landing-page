# Simple Localization System - How It Works

## 📁 File Structure

```
src/
├── locales/              # Translation files
│   ├── ms.json          # Bahasa Melayu (Malaysian)
│   └── en.json          # English
├── hooks/
│   └── useTranslation.ts # Custom hook to use translations
└── components/
    └── ExampleTranslation.tsx # Usage example
```

## 🔄 How It Works

### 1. **Translation Files** (`ms.json` & `en.json`)
These JSON files contain all your text in both languages:

```json
// ms.json
{
  "navbar": {
    "home": "Utama",
    "register": "Daftar"
  }
}

// en.json
{
  "navbar": {
    "home": "Home",
    "register": "Register"
  }
}
```

### 2. **Translation Hook** (`useTranslation.ts`)
- Reads the selected region from AuthContext
- If region is Malaysia (MY) → use `ms.json`
- If region is other countries → use `en.json`
- Returns a `t()` function to get translations

### 3. **Using in Components**

```tsx
import { useTranslation } from '../hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('navbar.home')}</h1>
      {/* Shows "Utama" if MY, "Home" if other */}
    </div>
  );
}
```

## 🚀 Quick Start Guide

### Step 1: Add translations to JSON files
Edit `src/locales/ms.json` and `src/locales/en.json` to add your text.

### Step 2: Use in any component

```tsx
// Import the hook
import { useTranslation } from '../hooks/useTranslation';

// Use inside component
function Navbar() {
  const { t, language } = useTranslation();
  
  return (
    <nav>
      <button>{t('navbar.home')}</button>
      <button>{t('navbar.register')}</button>
      <p>Current language: {language}</p> {/* 'ms' or 'en' */}
    </nav>
  );
}
```

### Step 3: Language switches automatically!
When user changes region via the globe button:
- Selects Malaysia → All text becomes Bahasa Melayu
- Selects other → All text becomes English

## 📝 Real Example

I've already updated the Receipt component to show you how it works:

**Before:**
```tsx
<h2>Receipt Not Found</h2>
<button>Back to Home</button>
```

**After:**
```tsx
const { t } = useTranslation();

<h2>{t('receipt.receiptNotFound')}</h2>
<button>{t('receipt.backToHome')}</button>
```

Now these buttons show:
- Malaysia: "Resit Tidak Dijumpai", "Kembali ke Laman Utama"
- Others: "Receipt Not Found", "Back to Home"

## 🎯 Key Features

1. **Automatic switching** - Based on selected region
2. **No extra libraries** - Pure React + TypeScript
3. **Type-safe** - Uses TypeScript
4. **Simple API** - Just use `t('key.path')`
5. **Centralized** - All translations in one place

## 📚 Adding New Translations

1. Add to both `ms.json` and `en.json`:

```json
// ms.json
{
  "newSection": {
    "title": "Tajuk Baru",
    "button": "Klik Sini"
  }
}

// en.json  
{
  "newSection": {
    "title": "New Title",
    "button": "Click Here"
  }
}
```

2. Use in component:

```tsx
const { t } = useTranslation();

<h1>{t('newSection.title')}</h1>
<button>{t('newSection.button')}</button>
```

## 🔍 What You Get from useTranslation()

```tsx
const { t, language, isMS, isEN } = useTranslation();

// t() - Translation function
t('navbar.home') // Returns "Utama" or "Home"

// language - Current language code
language // 'ms' or 'en'

// isMS - Boolean, true if Malaysian
isMS // true if region is Malaysia

// isEN - Boolean, true if not Malaysian  
isEN // true if region is not Malaysia
```

## 💡 Tips

1. **Organize by sections** - Group translations by component/page
2. **Use dot notation** - `t('section.subsection.key')`
3. **Keep keys consistent** - Same keys in both language files
4. **Test both languages** - Change region to see translations

## 🎨 Next Steps

Now you can translate your entire app by:
1. Adding all your text to `ms.json` and `en.json`
2. Importing `useTranslation` in components
3. Replacing hardcoded text with `t('key')`

That's it! The system handles everything else automatically based on the selected region.
