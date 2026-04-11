import { ArrowRight, Calendar, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getFeaturedEvents } from "../config/seasonalEvents";
import { useTranslation } from "../hooks/useTranslation";

export default function SeasonalEvents() {
	const navigate = useNavigate();
	const { language } = useTranslation();
	const featuredEvents = getFeaturedEvents();
    const lang = (language === 'ms' ? 'ms' : 'en') as 'en' | 'ms';

	const handleLearnMore = (slug: string) => {
		navigate(`/special-event/${slug}`);
	};

	return (
		<section className="py-24 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-600 relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
						<Star className="text-white" size={20} fill="white" />
						<span className="text-white font-semibold">
							{language === "ms"
								? "Kelas Istimewa"
								: "Special Event"}
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
						{language === "ms"
							? "Program Musim Ini"
							: "Seasonal Program"}
					</h2>
					<p className="text-xl text-black/80 max-w-2xl mx-auto">
						{language === "ms"
							? "Jangan lepaskan peluang untuk menyertai program eksklusif kami"
							: "Don't miss the opportunity to join our exclusive programs"}
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-8">
					{featuredEvents.map((event) => (
						<div
							key={event.id}
							className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group w-full max-w-md md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
						>
							{/* Event Image */}
							<div className="relative h-64 overflow-hidden">
								<img
									src={event.images.thumbnail}
									alt={event.title[lang]}
									className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

								{/* Featured Badge */}
								<div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm">
									{language === "ms" ? "TERHAD" : "LIMITED"}
								</div>

								{/* Date if available */}
								{event.endDate && (
									<div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
										<Calendar
											size={16}
											className="text-yellow-400"
										/>
										<span className="text-white text-sm">
											{language === "ms"
												? "Tutup"
												: "Closes"}
											:{" "}
											{new Date(
												event.endDate,
											).toLocaleDateString(
												language === "ms"
													? "ms-MY"
													: "en-US",
												{
													month: "short",
													day: "numeric",
												},
											)}
										</span>
									</div>
								)}
							</div>

							{/* Event Details */}
							<div className="p-6">
								<h3 className="text-2xl font-bold text-black mb-3">
									{event.title[lang]}
								</h3>
								<p className="text-gray-600 mb-4 line-clamp-2">
									{event.shortDescription[lang]}
								</p>

								{/* Price */}
								<div className="mb-6">
									<div className="text-3xl font-bold text-yellow-600">
										{event.price.currency}{" "}
										{event.price.amount}
									</div>
									{event.price.period && (
										<div className="text-sm text-gray-500">
											{event.price.period}
										</div>
									)}
								</div>

								{/* CTA Button */}
								<button
									onClick={() => handleLearnMore(event.slug)}
									className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4"
								>
									{language === "ms"
										? "Ketahui Lebih Lanjut"
										: "Learn More"}
									<ArrowRight
										size={20}
										className="transition-all duration-300"
									/>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
