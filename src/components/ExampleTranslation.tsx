// Example: How to use the translation hook in your components

import { useTranslation } from "../hooks/useTranslation";

export default function ExampleComponent() {
	// 1. Import and use the hook
	const { t, language, isMS, isEN } = useTranslation();

	return (
		<div>
			{/* 2. Use t() function with dot notation to get translations */}
			<h1>{t("hero.title")}</h1>
			<p>{t("hero.subtitle")}</p>

			{/* 3. Check current language if needed */}
			<p>Current language: {language}</p>

			{/* 4. Conditional rendering based on language */}
			{isMS && <p>Kandungan khas untuk Malaysia</p>}
			{isEN && <p>Special content for other countries</p>}

			{/* Examples for different sections */}
			<nav>
				<a href="#home">{t("navbar.home")}</a>
				<a href="#contact">{t("navbar.contact")}</a>
				<button>{t("navbar.register")}</button>
			</nav>

			<section>
				<h2>{t("packages.title")}</h2>
				<span>{t("packages.monthly")}</span>
				<button>{t("packages.selectPackage")}</button>
			</section>

			<form>
				<input placeholder={t("contact.name")} />
				<input placeholder={t("contact.email")} />
				<textarea placeholder={t("contact.message")} />
				<button>{t("contact.send")}</button>
			</form>
		</div>
	);
}

/* 
FLOW EXPLANATION:
==================

1. User selects Malaysia (MY) -> language = 'ms' -> loads ms.json
2. User selects other country -> language = 'en' -> loads en.json

3. When you call t('navbar.home'):
   - If language is 'ms': returns "Utama" from ms.json
   - If language is 'en': returns "Home" from en.json

4. The translation automatically switches when user changes region
   because useTranslation() hooks into AuthContext's selectedCountry

USAGE IN YOUR COMPONENTS:
==========================

// Import the hook
import { useTranslation } from '../hooks/useTranslation';

// Inside component
const { t } = useTranslation();

// Use in JSX
<button>{t('navbar.register')}</button>

// That's it! The language switches automatically based on selected region.
*/
