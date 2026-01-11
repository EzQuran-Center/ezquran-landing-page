import { BookOpen, Mic, Users, ShoppingBag } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function Services() {
	const { t } = useTranslation();

	const services = [
		{
			icon: BookOpen,
			title: t("services.iqra.title"),
			description: t("services.iqra.description"),
			features: t("services.iqra.features") as string[],
		},
		{
			icon: Mic,
			title: t("services.tilawah.title"),
			description: t("services.tilawah.description"),
			features: t("services.tilawah.features") as string[],
		},
		{
			icon: Users,
			title: t("services.fardhuAin.title"),
			description: t("services.fardhuAin.description"),
			features: t("services.fardhuAin.features") as string[],
		},
		{
			icon: ShoppingBag,
			title: t("services.tadabbur.title"),
			description: t("services.tadabbur.description"),
			features: t("services.tadabbur.features") as string[],
		},
	];

	return (
		<section id="services" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-3">
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
					{t("services.title")}{" "}
					<span className="text-yellow-600">{t("services.titleHighlight")}</span>
					</h2>
				</div>
				<p className="text-xl text-gray-600 max-w-2xl mx-auto">
					{t("services.subtitle")}
				</p>
				<div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-500 transition-all hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-1"
						>
							<div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<service.icon className="text-white" size={32}/>
							</div>

							<h3 className="text-base font-bold text-black mb-3">{service.title}</h3>
							<p className="text-sm text-gray-600 mb-6 leading-relaxed">{service.description}</p>

							<ul className="space-y-2">
								{service.features.map((feature, idx) => (
									<li
										key={idx}
										className="flex items-center text-sm text-gray-700"
									>
										<span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
