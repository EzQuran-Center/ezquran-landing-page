import { MailIcon, MapIcon, PhoneIcon, PinIcon } from "lucide-react";
import logo from "../assets/logo-ezquran2.svg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
	const navigate = useNavigate();
	return (
		<footer className="bg-black text-white py-12 border-t border-yellow-600/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div className="md:col-span-2">
						<div className="flex items-center space-x-3 mb-4">
							<img src={logo} alt="" className="max-w-12 max-h-12"/>
							<div>
								<h3 className="text-xl font-bold">EzQuran Centre</h3>
								<p className="text-xs text-yellow-500">EZQURAN CENTRE SDN. BHD.</p>
							</div>
						</div>
						<p className="text-gray-400 mb-4 max-w-md">
							Platform pembelajaran Al-Quran yang komprehensif
							untuk semua peringkat. Kami komited untuk membantu
							anda dalam perjalanan pembelajaran Al-Quran.
						</p>
						<p className="text-sm text-gray-500">
							© {new Date().getFullYear()} EZQURAN CENTRE SDN. BHD.
							<br />
							Hak Cipta Terpelihara.
						</p>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-4 text-yellow-500">
							Pautan Pantas
						</h4>
						<ul className="space-y-2">
							<li>
								<button
									onClick={() =>
										document
											.getElementById("home")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
									className="text-gray-400 hover:text-yellow-500 transition-colors"
								>
									Utama
								</button>
							</li>
							{/* <li>
								<button
									onClick={() =>
										document
											.getElementById("services")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
									className="text-gray-400 hover:text-yellow-500 transition-colors"
								>
									Perkhidmatan
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										document
											.getElementById("packages")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
									className="text-gray-400 hover:text-yellow-500 transition-colors"
								>
									Pakej
								</button>
							</li> */}
							<li>
								<button
									onClick={() =>
										document
											.getElementById("merchandise")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
									className="text-gray-400 hover:text-yellow-500 transition-colors"
								>
									Produk
								</button>
							</li>
							<li>
								<button
									onClick={() =>
										document
											.getElementById("contact")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
									className="text-gray-400 hover:text-yellow-500 transition-colors"
								>
									Hubungi Kami
								</button>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-4 text-yellow-500">
							Hubungi
						</h4>
						<ul className="space-y-2 text-gray-400">
							<li className="text-sm">
								<MapIcon size={20} className="inline-block mr-2 mb-1" />
								Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan.
							</li>
							<li className="text-sm">
								<a href="tel:+60183868296" className="text-sm hover:text-yellow-500 transition-colors">
									<PhoneIcon size={20} className="inline-block mr-2" />
									+60 18-386 8296
								</a>
							</li>
							<li className="text-sm">
								<a href="mailto:thyora.international@gmail.com" className="text-sm hover:text-yellow-500 transition-colors text-sm break-all">
									<MailIcon size={20} className="inline-block mr-2" />
									admin@ezquran.my
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-white/10">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-gray-500 text-center md:text-left">
							Dibina dengan 💛 untuk umat Islam
						</p>
						<div className="flex gap-6 text-sm text-gray-500">
							<button onClick={() => navigate("/polisi-privasi")} className="hover:text-yellow-500 transition-colors">
								Dasar Privasi
							</button>
							<button onClick={() => navigate("/terma-dan-syarat")} className="hover:text-yellow-500 transition-colors">
								Terma & Syarat
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
