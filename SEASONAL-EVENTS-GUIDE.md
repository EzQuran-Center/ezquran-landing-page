# Seasonal Events System - Quick Guide

## Overview
The seasonal events system allows you to easily add and manage special class packages (like "Ijazah Sanad Fast Track") on your landing page.

## How It Works

### 1. **Configuration File** 
Location: `/src/config/seasonalEvents.ts`

This file contains all your seasonal events in one place. Each event has:
- **Title** (English & Malay)
- **Descriptions** (short & full, in both languages)
- **Price & currency**
- **Features list**
- **Images** (thumbnail + gallery)
- **Dates** (optional start/end dates)
- **Status** (isActive, isFeatured)
- **Contact links** (WhatsApp, registration)

### 2. **Display on Homepage**
The `SeasonalEvents` component automatically shows all **featured** events on the landing page as attractive cards with:
- Eye-catching yellow gradient background
- Large thumbnail image
- Price display
- "Learn More" button
- Registration deadline

### 3. **Detailed Event Page**
When users click "Learn More", they navigate to `/special-event/[slug]` with:
- Full image gallery
- Complete description
- All features listed
- WhatsApp contact button
- Share functionality
- Price and date information

## Adding a New Seasonal Event

### Step 1: Prepare Your Assets
1. Create a folder: `/src/assets/season/[event-name]/`
2. Add images (at least one thumbnail, can have multiple for gallery)

### Step 2: Update Configuration
Open `/src/config/seasonalEvents.ts` and add a new event:

```typescript
// 1. Import images at the top
import newEventImage1 from '../assets/season/new-event/image1.jpeg';
import newEventImage2 from '../assets/season/new-event/image2.jpeg';

// 2. Add to seasonalEvents array
export const seasonalEvents: SeasonalEvent[] = [
  // ... existing events ...
  
  {
    id: 'unique-event-id-2026',
    slug: 'new-event-name', // This will be in the URL
    title: {
      en: 'New Event Title',
      ms: 'Tajuk Acara Baru'
    },
    shortDescription: {
      en: 'Brief description for homepage card',
      ms: 'Penerangan ringkas untuk kad halaman utama'
    },
    fullDescription: {
      en: 'Full detailed description for event page',
      ms: 'Penerangan penuh terperinci untuk halaman acara'
    },
    price: {
      amount: '1,500',
      currency: 'MYR',
      period: 'per program' // optional
    },
    features: {
      en: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
      ],
      ms: [
        'Ciri 1',
        'Ciri 2',
        'Ciri 3',
      ]
    },
    images: {
      thumbnail: newEventImage1, // Main image for cards
      gallery: [newEventImage1, newEventImage2] // All images for detail page
    },
    startDate: '2026-06-01', // Optional
    endDate: '2026-05-31', // Optional
    isActive: true, // Set to false to hide
    isFeatured: true, // Set to true to show on homepage
    whatsappLink: 'https://wa.me/60123456789?text=I%20am%20interested' // Optional
  }
];
```

### Step 3: Save and Test
That's it! The new event will automatically appear on the homepage and have its own detail page.

## Managing Events

### To Show/Hide an Event
Set `isActive: false` to completely hide it from the website.

### To Remove from Homepage (but keep detail page accessible)
Set `isFeatured: false` - the event won't show on homepage but the detail page at `/special-event/[slug]` will still work.

### To Update Event Details
Just edit the configuration in `/src/config/seasonalEvents.ts` and save.

## URL Structure
- Homepage: `/`
- Event detail: `/special-event/ijazah-sanad-fast-track`
- The slug in the URL comes from the `slug` field in your event configuration

## Current Events

### Ijazah Sanad Fast Track 2026
- **Status**: Active & Featured ✅
- **URL**: `/special-event/ijazah-sanad-fast-track`
- **Price**: MYR 2,500
- **Registration Closes**: April 30, 2026

## Tips

1. **Image Quality**: Use high-resolution images (at least 1200px wide) for best display
2. **Image Names**: For easier management, rename images to something descriptive instead of WhatsApp default names
3. **Consistent Sizing**: Try to use images with similar aspect ratios for better gallery display
4. **WhatsApp Links**: Format as `https://wa.me/[phone]?text=[message]` (URL encoded)
5. **Dates**: Use ISO format `YYYY-MM-DD` for dates
6. **Testing**: After adding a new event, check both the homepage card and detail page

## File Structure
```
src/
├── config/
│   └── seasonalEvents.ts          # Main configuration file
├── components/
│   ├── SeasonalEvents.tsx         # Homepage preview cards
│   └── SeasonalEventDetail.tsx    # Full event detail page
└── assets/
    └── season/
        ├── Ijazah-Sanad-Fast-Track/
        │   ├── image1.jpeg
        │   ├── image2.jpeg
        │   └── ...
        └── [new-event-name]/
            └── images...
```

## Need Help?
If you have questions or need to customize the design, let me know!