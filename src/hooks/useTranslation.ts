import { useAuth } from "../contexts/AuthContext";
import msTranslations from "../locales/ms.json";
import enTranslations from "../locales/en.json";

type TranslationKey = string;

// Helper function to get nested value from object using dot notation
// Example: "navbar.home" -> translations.navbar.home
function getNestedValue(obj: any, path: string): string {
	return (
		path.split(".").reduce((current, key) => current?.[key], obj) || path
	);
}

export function useTranslation() {
	const { selectedCountry, regions } = useAuth();

	// Get the selected region details
	const selectedRegion = regions.find(
		(r) => r.region_id.toString() === selectedCountry
	);

	// Malaysia (region_code: "MY") uses Malay, others use English
	const language = selectedRegion?.region_code === "MY" ? "ms" : "en";

	// Select the appropriate translation object
	const translations = language === "ms" ? msTranslations : enTranslations;

	// Function to get translation by key
	const t = (key: TranslationKey): string => {
		return getNestedValue(translations, key);
	};

	return {
		t, // Translation function
		language, // Current language code ('ms' or 'en')
		isMS: language === "ms",
		isEN: language === "en",
	};
}
