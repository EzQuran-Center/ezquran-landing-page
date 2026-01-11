import { ShoppingBag, ExternalLink } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function Merchandise() {
	const { t } = useTranslation()
	const categories = [
		{
			title: t("merchandise.products.1.title"),
			description: t("merchandise.products.1.description"),
			image: t("merchandise.products.1.image"),
		},
		{
			title: t("merchandise.products.2.title"),
			description: t("merchandise.products.2.description"),
			image: t("merchandise.products.2.image"),
		},
		{
			title: t("merchandise.products.3.title"),
			description: t("merchandise.products.3.description"),
			image: t("merchandise.products.3.image"),
		},
	];

	return (
		<section
			id="merchandise"
			className="py-24 bg-gradient-to-br from-gray-50 to-white"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-6">
						<ShoppingBag size={20} />
						<span className="font-semibold">{t("merchandise.badge")}</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-4 from-yellow-400 to-yellow-700 bg-clip-text text-transparent bg-gradient-to-r">
						{t("merchandise.title")}{" "}
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						{t("merchandise.subtitle")}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{categories.map((category, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-500 transition-all hover:shadow-xl transform hover:-translate-y-1 group"
						>
							<div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
								{category.image}
							</div>
							<h3 className="text-xl font-bold text-black mb-2 text-center">
								{category.title}
							</h3>
							<p className="text-gray-600 text-center text-sm">
								{category.description}
							</p>
						</div>
					))}
				</div>

				{/* <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-12 text-center relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2Q3YjMzZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

					<div className="relative z-10">
						<h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
							Lawati Kedai Dalam Talian Kami
						</h3>
						<p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
							Terokai koleksi penuh barangan Islam di platform
							e-dagang THYORA. Beli-belah dengan mudah dan
							selamat.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								onClick={() =>
									window.open("https://thyora.com", "_blank")
								}
								className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
							>
								<ShoppingBag size={20} />
								Lawati Kedai THYORA
								<ExternalLink size={18} />
							</button>
							<p className="text-gray-400 text-sm">
								Diskaun istimewa untuk ahli EzQuran Centre
							</p>
						</div>
					</div>
				</div> */}
			</div>
		</section>
	);
}
