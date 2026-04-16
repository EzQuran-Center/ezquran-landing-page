import { useEffect } from "react";

/**
 * Dynamically loads KFGQPC page fonts
 * This component handles loading the correct TTF font for each Mushaf page
 */
export function useQuranPageFont(pageNumber: number) {
	useEffect(() => {
		if (!pageNumber || pageNumber < 1 || pageNumber > 604) return;

		const fontFamily = `QCF_P${String(pageNumber).padStart(3, "0")}`;
		const fontId = `quran-font-${pageNumber}`;

		// Check if font is already loaded
		if (document.getElementById(fontId)) {
			return;
		}

		// Create @font-face style element
		// Use dynamic import path for Vite
		const style = document.createElement("style");
		style.id = fontId;
		style.textContent = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('/src/assets/font/p${pageNumber}.ttf') format('truetype');
        font-display: swap;
        font-weight: normal;
        font-style: normal;
      }
    `;
		document.head.appendChild(style);

		// Preload the font
		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "font";
		link.type = "font/ttf";
		link.href = `/src/assets/font/p${pageNumber}.ttf`;
		link.crossOrigin = "anonymous";
		document.head.appendChild(link);

		// Cleanup
		return () => {
			const existingStyle = document.getElementById(fontId);
			if (existingStyle && existingStyle.parentNode) {
				existingStyle.parentNode.removeChild(existingStyle);
			}
		};
	}, [pageNumber]);

	return `QCF_P${String(pageNumber).padStart(3, "0")}`;
}

/**
 * Get font family name for a page
 */
export function getPageFontFamily(pageNumber: number): string {
	if (!pageNumber || pageNumber < 1 || pageNumber > 604) {
		return "Scheherazade New";
	}
    
	return `QCF2${String(pageNumber).padStart(3, "0")}`;
    // return `p${String(pageNumber)}`;
}
