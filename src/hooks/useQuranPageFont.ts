import { useEffect, useState } from "react";

/**
 * Vite resolves these at build time into hashed production URLs.
 */
const fontUrls = import.meta.glob("../assets/font/p*.ttf", {
	query: "?url",
	import: "default",
	eager: true,
}) as Record<string, string>;

function getFontUrl(pageNumber: number): string {
	const key = `../assets/font/p${pageNumber}.ttf`;
	return fontUrls[key] ?? "";
}

function getFontFamily(pageNumber: number): string {
	return `QCF_P${String(pageNumber).padStart(3, "0")}`;
}

// Track injected <style> tags so we don't double-inject
const injectedPages = new Set<number>();
// Cache per-page load promises
const fontLoadCache = new Map<number, Promise<void>>();

/**
 * Injects an @font-face CSS rule and waits for the font to be
 * available in the browser's CSS rendering pipeline via document.fonts.load().
 *
 * Why CSS injection instead of the FontFace API:
 *   iOS/macOS Safari has a known gap where document.fonts.add() registers
 *   the font but it is not immediately available to the CSS layout engine,
 *   causing garbled fallback text even after the FontFace promise resolves.
 *   CSS @font-face rules go through the same pipeline Safari uses for
 *   rendering, so document.fonts.load() reliably resolves only once the
 *   font is truly ready to paint.
 */
function loadFontForPage(pageNumber: number): Promise<void> {
	if (fontLoadCache.has(pageNumber)) {
		return fontLoadCache.get(pageNumber)!;
	}

	const fontFamily = getFontFamily(pageNumber);
	const fontUrl = getFontUrl(pageNumber);

	if (!fontUrl) {
		return Promise.resolve();
	}

	const promise = new Promise<void>((resolve) => {
		// Inject @font-face via a <style> tag — Safari handles these natively
		if (!injectedPages.has(pageNumber)) {
			const existing = document.querySelector(
				`style[data-qcf-page="${pageNumber}"]`,
			);
			if (!existing) {
				const style = document.createElement("style");
				style.setAttribute("data-qcf-page", String(pageNumber));
				// font-display:swap — visibility is controlled by arabicReady
				// state so we don't need the browser's blocking period
				style.textContent =
					`@font-face{font-family:'${fontFamily}';` +
					`src:url('${fontUrl}') format('truetype');` +
					`font-display:swap;}`;
				document.head.appendChild(style);
			}
			injectedPages.add(pageNumber);
		}

		// Timeout fallback: allow rendering after 10 s if load never resolves
		const timer = setTimeout(() => resolve(), 10_000);

		// document.fonts.load() waits until the font is available in the CSS
		// rendering pipeline — key difference vs FontFace.load() on Safari
		document.fonts
			.load(`1em '${fontFamily}'`)
			.then(() => {
				clearTimeout(timer);
				resolve();
			})
			.catch(() => {
				clearTimeout(timer);
				resolve();
			});
	});

	fontLoadCache.set(pageNumber, promise);
	return promise;
}

/**
 * Loads fonts for all pages of a surah in parallel.
 * Returns a Set of page numbers whose fonts are ready for rendering.
 * Each ayah checks its own page number so text never renders with the wrong font.
 */
export function useQuranSurahFonts(pageNumbers: number[]): Set<number> {
	const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

	useEffect(() => {
		if (!pageNumbers.length) return;

		setLoadedPages(new Set());
		let cancelled = false;

		pageNumbers.forEach((pageNumber) => {
			if (!pageNumber || pageNumber < 1 || pageNumber > 604) return;

			loadFontForPage(pageNumber).then(() => {
				if (!cancelled) {
					setLoadedPages((prev) => new Set([...prev, pageNumber]));
				}
			});
		});

		return () => {
			cancelled = true;
		};
		// pageNumbers.join gives a stable primitive for the dependency
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageNumbers.join(",")]);

	return loadedPages;
}

/**
 * Get font family name for a page (used for inline style strings).
 */
export function getPageFontFamily(pageNumber: number): string {
	if (!pageNumber || pageNumber < 1 || pageNumber > 604) {
		return "Scheherazade New";
	}
	return getFontFamily(pageNumber);
}
