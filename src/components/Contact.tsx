import {
	MapPin,
	Mail,
	Phone,
	Clock,
	Facebook,
	Instagram,
	MessageCircle,
	FacebookIcon,
	InstagramIcon,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function Contact() {
	
	const { t } = useTranslation();

	return (
		<section id="contact" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* <div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
						{t('contact.title')} <span className="text-yellow-600">{t('contact.highlight')}</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
				</div> */}

				<div className="grid md:grid-cols-2 gap-12">
					<div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
						<h3 className="text-2xl font-bold text-black mb-6">
							{t('contact.message.title')}
						</h3>
						<form
							className="space-y-6"
							onSubmit={(e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const name = formData.get("name");
								const phone = formData.get("phone");
								const message = formData.get("message");
								const whatsappMessage = `Nama: ${name}%0ATelefon: ${phone}%0A%0AMesej:%0A${message}`;
								window.open(`https://wa.me/+601164140170?text=${whatsappMessage}`, "_blank");
							}}
						>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-semibold text-black mb-2"
								>
									{t('contact.message.fullname')}
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
									placeholder="Ahmad bin Ali"
								/>
							</div>

							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-semibold text-black mb-2"
								>
									{t('contact.message.phone')}
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
									placeholder="+60 12-345 6789"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-semibold text-black mb-2"
								>
									{t('contact.message.message')}
								</label>
								<textarea
									id="message"
									name="message"
									required
									rows={6}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
									placeholder={t('contact.message.placeholder')}
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-2"
							>
								<MessageCircle size={20} />
								{t('contact.message.whatsapp')}
							</button>
						</form>
					</div>
					
					<div className="space-y-8">
						{/* <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
							<h3 className="text-2xl font-bold text-black mb-6">
								{t('contact.information.title')}
							</h3>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Phone
											className="text-yellow-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-black mb-1">
											{t('contact.information.phone')}
										</h4>
										<a
											href="tel:+601164140170"
											className="text-gray-600 hover:text-yellow-600 transition-colors"
										>
											+6011 6414 0170
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Mail
											className="text-yellow-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-black mb-1">
											{t('contact.information.email')}
										</h4>
										<a
											href="mailto:admin@ezquran.my"
											className="text-gray-600 hover:text-yellow-600 transition-colors break-all"
										>
											admin@ezquran.my
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Clock
											className="text-yellow-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-black mb-1">
											{t('contact.information.hours')}
										</h4>
										<div className="text-gray-600 space-y-1">
											<p>Isnin - Jumaat: 9:00 Pagi - 10:00 Malam</p>
										</div>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<MapPin
											className="text-yellow-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-black mb-1">
											{t('contact.information.address')}
										</h4>
										<p className="text-gray-600 leading-relaxed">
											Lot 84-G, Jalan Cattleya 9,
											<br />
											Persada Cattleya,
											<br />
											70450 Seremban,
											<br />
											Negeri Sembilan, Malaysia
										</p>
									</div>
								</div>
							</div>
						</div> */}

						<div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8">
							<h3 className="text-2xl font-bold text-white mb-4">
								{t('contact.follow.title')}
							</h3>
							<div className="flex gap-4">
								<button 
									onClick={() => window.open("https://wa.me/+601164140170","_blank")}
									className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all group"
								>
									<MessageCircle
										className="text-white group-hover:scale-110 transition-transform"
										size={24}
									/>
								</button>
								<button
									onClick={() => window.open("https://www.tiktok.com/@ezquran.my?_r=1&_t=ZS-94jmukWxze9", "_blank")}
									className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all group"
								>
									<svg width="24" height="24" className="group-hover:scale-110 transition-transform" fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>tiktok</title> <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path> </g></svg>
								</button>
								<button
									onClick={() => window.open("https://www.facebook.com/share/14YcSBcRf9r/?mibextid=wwXIfr", "_blank")}
									className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all group"
								>
									<FacebookIcon
										className="text-white group-hover:scale-110 transition-transform"
										size={24}
									/>
								</button>
								<button
									onClick={() => window.open("https://www.instagram.com/ezquran.my?igsh=bDdoMmp2amY0MmJp&utm_source=qr", "_blank")}
									className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all group"
								>
									<InstagramIcon
										className="text-white group-hover:scale-110 transition-transform"
										size={24}
									/>
								</button>
							</div>
						</div>

						<div className="mt-12 rounded-2xl overflow-hidden border border-gray-200 h-96">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.4151415456486!2d101.9781725756595!3d2.692056555790959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cde11ba6541bb3%3A0x891be2ffd9a8cd7e!2sEzQuran%20Centre!5e0!3m2!1sen!2smy!4v1769445439901!5m2!1sen!2smy"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="EzQuran Centre Location"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
