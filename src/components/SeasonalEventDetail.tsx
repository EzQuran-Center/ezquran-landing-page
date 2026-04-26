import { useParams, useNavigate } from "react-router-dom";
import { getEventBySlug } from "../config/seasonalEvents";
import { useTranslation } from "../hooks/useTranslation";
import {
	ArrowLeft,
	Check,
	Calendar,
	MessageCircle,
	Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../lib/api";

export default function SeasonalEventDetail() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const { language } 									= useTranslation();
	const [selectedImage, setSelectedImage] 			= useState(0);
    const [packages, setPackages] 						= useState<any[]>([]);
    const [paymentPlans, setPaymentPlans] 				= useState<any[]>([]);
    const [paymentPlansLoading, setPaymentPlansLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] 				= useState<any | null>(null);

	const event = slug ? getEventBySlug(slug) : undefined;

    const handleSelectPackage = (pkg: any) => {
		navigate('/register-seasonal', { state: { selectedPackage: pkg, paymentPlans, selectedPlan } });
	};

    useEffect(() => {
        let mounted = true;

        api.get(`region/1/packages/4`)
            .then((res: any) => {
                const items = res?.data || [];
                console.log("Log Package Items : ", items.filter(a => a.package_id == '4'))
                if (mounted) setPackages(items.filter(a => a.package_id == '4')[0]);
            })
            .catch((err: any) => {
                console.error("Failed to load packages", err);
                // if (mounted) setError(err?.message || "Gagal memuatkan pakej");
            })
            .finally(() => {
                // if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

	useEffect(() => {
		let mounted = true;
		const packageId = 4;

		setPaymentPlansLoading(true);
		api.get(`registration/payment-plans/${packageId}`)
			.then((res: any) => {
				if (mounted && res?.data?.payment_plans) {
					setPaymentPlans(res.data.payment_plans);
				}
			})
			.catch((err: any) => {
				console.error("Failed to load payment plans", err);
			})
			.finally(() => {
				if (mounted) setPaymentPlansLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, [])

	if (!event) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-white mb-4">
						{language === "ms"
							? "Acara Tidak Dijumpai"
							: "Event Not Found"}
					</h1>
					<button
						onClick={() => navigate("/")}
						className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all"
					>
						{language === "ms"
							? "Kembali ke Halaman Utama"
							: "Back to Home"}
					</button>
				</div>
			</div>
		);
	}

	const handleWhatsAppContact = () => {
		if (event.whatsappLink) {
			window.open(event.whatsappLink, "_blank");
		}
	};

	const handleShare = async () => {
		const shareData = {
			title: event.title[language],
			text: event.shortDescription[language],
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				// Fallback: copy to clipboard
				await navigator.clipboard.writeText(window.location.href);
				alert(language === "ms" ? "Pautan disalin!" : "Link copied!");
			}
		} catch (err) {
			console.error("Error sharing:", err);
		}
	};

	return (
		<div className="min-h-screen bg-black">
			<Navbar />

			<div className="pt-24 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Back Button */}
					<button
						onClick={() => navigate("/")}
						className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors mb-8 group"
					>
						<ArrowLeft
							size={20}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						<span className="font-semibold">
							{language === "ms" ? "Kembali" : "Back to Home"}
						</span>
					</button>

					<div className="grid lg:grid-cols-2 gap-12">
						{/* Image Gallery */}
						<div>
							{/* Main Image */}
							<div className="relative rounded-2xl overflow-hidden mb-4 shadow-2xl">
								<img
									src={event.images.gallery[selectedImage]}
									alt={event.title[language]}
									className="w-full h-[500px] object-cover"
								/>

								{/* Featured Badge */}
								{event.isFeatured && (
									<div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
										{language === "ms"
											? "TERHAD"
											: "LIMITED SEATS"}
									</div>
								)}
							</div>

							{/* Thumbnail Gallery */}
							{event.images.gallery.length > 1 && (
								<div className="grid grid-cols-4 gap-4">
									{event.images.gallery.map(
										(image, index) => (
											<button
												key={index}
												onClick={() =>
													setSelectedImage(index)
												}
												className={`rounded-lg overflow-hidden border-2 transition-all ${
													selectedImage === index
														? "border-yellow-500 scale-105"
														: "border-transparent hover:border-yellow-500/50"
												}`}
											>
												<img
													src={image}
													alt={`${event.title[language]} ${index + 1}`}
													className="w-full h-24 object-cover"
												/>
											</button>
										),
									)}
								</div>
							)}
						</div>

						{/* Event Details */}
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
								{event.title[language]}
							</h1>

							<p className="text-xl text-gray-300 mb-8 leading-relaxed">
								{event.fullDescription[language]}
							</p>

							{/* Date Info */}
							{(event.startDate || event.endDate) && (
								<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
									<div className="flex items-center gap-2 text-yellow-500 mb-2">
										<Calendar size={20} />
										<span className="font-semibold">
											{language === "ms"
												? "Maklumat Tarikh"
												: "Date Information"}
										</span>
									</div>
									{event.startDate && (
										<p className="text-gray-300 text-sm">
											{language === "ms"
												? "Bermula"
												: "Starts"}
											:{" "}
											{new Date(
												event.startDate,
											).toLocaleDateString(
												language === "ms"
													? "ms-MY"
													: "en-US",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)}
										</p>
									)}
									{event.endDate && (
										<p className="text-gray-300 text-sm">
											{language === "ms"
												? "Pendaftaran Tutup"
												: "Registration Closes"}
											:{" "}
											{new Date(
												event.endDate,
											).toLocaleDateString(
												language === "ms"
													? "ms-MY"
													: "en-US",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)}
										</p>
									)}
								</div>
							)}

							{/* Payment Plans */}
							<div className="mb-8">
								<h3 className="text-2xl font-bold text-white mb-4">
									{language === "ms" ? "Pelan Pembayaran" : "Payment Plans"}
								</h3>
								{paymentPlansLoading ? (
									<div className="text-gray-400 text-sm">
										{language === "ms" ? "Memuatkan pelan..." : "Loading plans..."}
									</div>
								) : paymentPlans.length > 0 ? (
									<div className="space-y-3">
										{paymentPlans.map((plan) => {
											const isSelected = selectedPlan?.plan_id === plan.plan_id;
											return (
												<button
													key={plan.plan_id}
													onClick={() => {
														// setSelectedPlan(plan)
														navigate('/register-seasonal', { 
															state: { 
																packages, 
																selectedPackage: packages,
																selectedPlan: plan
															} 
														});
													}}
													className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
														isSelected
															? "border-yellow-500 bg-yellow-500/10"
															: "border-white/10 bg-white/5 hover:border-yellow-500/50 hover:bg-white/10"
													}`}
												>
													<div className="flex items-start justify-between gap-4">
														<div className="flex-1">
															<p className={`font-semibold text-base mb-1 ${ isSelected ? "text-yellow-400" : "text-white" }`}>
																{plan.plan_name}
															</p>
															<p className="text-gray-400 text-sm">{plan.plan_description}</p>
															{/* {plan.plan_type === "installment" && (
																<p className="text-gray-400 text-xs mt-1">
																	{plan.currency} {Number(plan.installment_amount).toFixed(2)}{" "}
																	× {plan.installment_count}{" "}
																	{language === "ms" ? "bayaran" : "payments"}
																</p>
															)} */}
														</div>
														<div className="text-right shrink-0">
															<p className={`text-2xl font-bold ${ isSelected ? "text-yellow-400" : "text-white" }`}>
																{/* {plan.currency} 
																{Number(plan.installment_amount).toFixed(2)} */}
																{Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR'}).format(plan.installment_amount)}
															</p>
															<p className="text-gray-400 text-xs">
																{language === "ms" ? "jumlah" : "total"}
															</p>
														</div>
													</div>
													{isSelected && (
														<div className="mt-3 flex items-center gap-1 text-yellow-400 text-xs font-semibold">
															<Check size={14} />
															{language === "ms" ? "Dipilih" : "Selected"}
														</div>
													)}
												</button>
											);
										})}
									</div>
								) : (
									<div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 shadow-2xl">
										<div className="text-black">
											<p className="text-sm font-semibold mb-2 opacity-80">
												{language === "ms" ? "Yuran Program" : "Program Fee"}
											</p>
											<div className="text-5xl font-bold mb-2">
												{event.price.currency} {event.price.amount}
											</div>
											{event.price.period && (
												<p className="text-sm opacity-80">{event.price.period}</p>
											)}
										</div>
									</div>
								)}
							</div>

							{/* Features List */}
							<div className="mb-8">
								<h3 className="text-2xl font-bold text-white mb-4">
									{language === "ms"
										? "Apa Yang Anda Dapat"
										: "What You Get"}
								</h3>
								<div className="space-y-3">
									{event.features[language].map(
										(feature, index) => (
											<div
												key={index}
												className="flex items-start gap-3"
											>
												<div className="bg-yellow-500 rounded-full p-1 mt-1">
													<Check
														size={16}
														className="text-black"
													/>
												</div>
												<span className="text-gray-300 flex-1">
													{feature}
												</span>
											</div>
										),
									)}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="space-y-4">

                                {Object.keys(packages).length > 0 && (
                                    <button
                                        onClick={() => handleSelectPackage(packages)}
                                        disabled={paymentPlans.length > 0 && !selectedPlan}
                                        className={`w-full py-4 rounded-lg font-semibold transition-all ${
                                            paymentPlans.length > 0 && !selectedPlan
                                                ? "bg-yellow-500/40 text-black/50 cursor-not-allowed"
                                                : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500"
                                        }`}
                                    >
                                        {paymentPlans.length > 0 && !selectedPlan
                                            ? (language === "ms" ? "Pilih Pelan Dahulu" : "Select a Plan First")
                                            : (language === "ms" ? "Daftar Sekarang" : "Register Now")
                                        }
                                    </button>
                                )}

								{event.whatsappLink && (
									<button
										onClick={handleWhatsAppContact}
										className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
									>
										<MessageCircle size={24} />
										{language === "ms"
											? "Hubungi Kami di WhatsApp"
											: "Contact Us on WhatsApp"}
									</button>
								)}

								<button
									onClick={handleShare}
									className="w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-3"
								>
									<Share2 size={20} />
									{language === "ms"
										? "Kongsi Program Ini"
										: "Share This Program"}
								</button>
							</div>

							{/* Additional Info */}
							<div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
								<p className="text-gray-400 text-sm text-center">
									{language === "ms"
										? "Tempat terhad. Daftar sekarang untuk menjamin tempat anda!"
										: "Limited seats available. Register now to secure your spot!"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
