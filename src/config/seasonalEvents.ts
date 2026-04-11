// Configuration for seasonal/special class events
// To add a new event, simply add a new entry to the seasonalEvents array

export interface SeasonalEvent {
	id: string; // URL-friendly identifier
	slug: string; // URL slug (e.g., "ijazah-sanad-fast-track")
	title: {
		en: string;
		ms: string;
	};
	shortDescription: {
		en: string;
		ms: string;
	};
	fullDescription: {
		en: string;
		ms: string;
	};
	price: {
		amount: string;
		currency: string;
		period?: string; // e.g., "per month", "one-time"
	};
	features: {
		en: string[];
		ms: string[];
	};
	images: {
		thumbnail: string; // Main image for preview/card
		gallery: string[]; // Additional images for detail page
	};
	startDate?: string; // Optional: When the event starts
	endDate?: string; // Optional: When registration closes
	isActive: boolean; // Whether to display this event
	isFeatured: boolean; // Whether to highlight/feature this event
	registrationLink?: string; // Optional: Direct registration link
	whatsappLink?: string; // Optional: WhatsApp contact link
}

// Import images for Ijazah Sanad Fast Track
import ijazahImage4 from "../assets/season/Ijazah-Sanad-Fast-Track/WhatsApp Image 2026-04-09 at 18.17.56 (1).jpeg";
import ijazahImage2 from "../assets/season/Ijazah-Sanad-Fast-Track/WhatsApp Image 2026-04-09 at 18.17.56 (2).jpeg";
import ijazahImage3 from "../assets/season/Ijazah-Sanad-Fast-Track/WhatsApp Image 2026-04-09 at 18.17.56 (3).jpeg";
import ijazahImage1 from "../assets/season/Ijazah-Sanad-Fast-Track/WhatsApp Image 2026-04-09 at 18.17.56.jpeg";

export const seasonalEvents: SeasonalEvent[] = [
	{
		id: "ijazah-sanad-fast-track-2026",
		slug: "ijazah-sanad-fast-track",
		title: {
			en: "Ijazah Sanad Fast Track",
			ms: "Ijazah Sanad Fast Track",
		},
		shortDescription: {
			en: "Accelerated program to obtain Ijazah Sanad with experienced certified instructors",
			ms: "Program dipercepat untuk mendapatkan Ijazah Sanad dengan guru bertauliah berpengalaman",
		},
		fullDescription: {
			en: "Join our exclusive Ijazah Sanad Fast Track program designed for serious students who want to obtain their Ijazah certification through an intensive, structured learning path. This special program offers personalized guidance from certified scholars with authentic chains of transmission (sanad).",
			ms: "Sertai program eksklusif Ijazah Sanad Fast Track kami yang direka khas untuk pelajar serius yang ingin mendapatkan sijil Ijazah melalui laluan pembelajaran intensif dan berstruktur. Program istimewa ini menawarkan bimbingan peribadi daripada ulama bertauliah dengan sanad yang sahih.",
		},
		price: {
			amount: "1,999.00",
			currency: "RM",
			period: "per program",
		},
		features: {
			en: [
				"One-on-one sessions with certified Qari",
				"Authentic chain of transmission (Sanad)",
				"Intensive 6-month program",
				"Weekly progress assessments",
				"Certificate upon completion",
				"Lifetime access to community",
				"Personal correction and guidance",
				"Flexible scheduling",
			],
			ms: [
				"Sesi bersama Qari bertauliah secara individu",
				"Sanad yang sahih dan bersambung",
				"Program intensif 6 bulan",
				"Penilaian kemajuan mingguan",
				"Sijil selepas tamat program",
				"Akses seumur hidup ke komuniti",
				"Pembetulan dan bimbingan peribadi",
				"Jadual yang fleksibel",
			],
		},
		images: {
			thumbnail: ijazahImage1,
			gallery: [ijazahImage1, ijazahImage2, ijazahImage3, ijazahImage4],
		},
		startDate: "2026-05-01",
		endDate: "2026-04-30",
		isActive: true,
		isFeatured: true,
		whatsappLink:
			"https://wa.me/60123456789?text=Saya%20berminat%20dengan%20Ijazah%20Sanad%20Fast%20Track",
	},
	// Add more seasonal events here following the same structure
	// Example:
	// {
	//   id: 'ramadan-intensive-2027',
	//   slug: 'ramadan-intensive',
	//   title: { en: 'Ramadan Intensive Program', ms: 'Program Intensif Ramadan' },
	//   ...
	// }
];

// Helper function to get active events
export const getActiveEvents = (): SeasonalEvent[] => {
	return seasonalEvents.filter((event) => event.isActive);
};

// Helper function to get featured events
export const getFeaturedEvents = (): SeasonalEvent[] => {
	return seasonalEvents.filter((event) => event.isActive && event.isFeatured);
};

// Helper function to get event by slug
export const getEventBySlug = (slug: string): SeasonalEvent | undefined => {
	return seasonalEvents.find((event) => event.slug === slug);
};
