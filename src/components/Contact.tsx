import {
	MapPin,
	Mail,
	Phone,
	Clock,
	Facebook,
	Instagram,
	MessageCircle,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function Contact() {
	
	const { t } = useTranslation();

	return (
		<section id="contact" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
						{t('contact.title')} <span className="text-yellow-600">{t('contact.highlight')}</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					<div className="space-y-8">
						<div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
							<h3 className="text-2xl font-bold text-black mb-6">
								{t('contact.information.title')}
							</h3>

							<div className="space-y-6">
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
											<p>
												Isnin - Jumaat: 9:00 AM - 6:00
												PM
											</p>
											<p>
												Sabtu - Ahad: 10:00 AM - 5:00 PM
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8">
							<h3 className="text-2xl font-bold text-white mb-4">
								{t('contact.follow.title')}
							</h3>
							<p className="text-gray-300 mb-6">
								{t('contact.follow.description')}
							</p>
							<div className="flex gap-4">
								<button
									onClick={() =>
										window.open(
											"https://wa.me/+601164140170",
											"_blank"
										)
									}
									className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all group"
								>
									<MessageCircle
										className="text-white group-hover:scale-110 transition-transform"
										size={24}
									/>
								</button>
							</div>
						</div>
					</div>

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
		</section>
	);
}
