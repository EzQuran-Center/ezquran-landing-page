import { Menu, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/logo-ezquran2.svg";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "../hooks/useTranslation";

export default function Navbar() {

	const [isOpen, setIsOpen] = useState(false);
	const [showRegionModal, setShowRegionModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { regions, selectedCountry, setSelectedCountry, loadingRegions, isCountrySelected } = useAuth();

	const { t } = useTranslation()

	const selectedRegion = regions.find(r => r.region_id.toString() === selectedCountry);

	const scrollToSection = (id: string) => {
		if (location.pathname !== "/") {
			navigate("/");
			setTimeout(() => {
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
					setIsOpen(false);
				}
			}, 100);
		} else {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				setIsOpen(false);
			}
		}
	};

	// Disable body scroll when modal is open
	useEffect(() => {
		if (showRegionModal) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [showRegionModal]);

	return (
		<>
		<nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-yellow-600/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					<button
						onClick={() => navigate("/")}
						className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
					>
						<img src={logo} alt="" className="max-w-16 max-h-16" />
						{/* <div>
							<h1 className="text-xl font-bold text-white">
								EzQuran
							</h1>
						</div> */}
					</button>

					<div className="hidden md:flex space-x-8">
						<button
							onClick={() => scrollToSection("home")}
							className="text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.home')}
						</button>
						{/* <button
							onClick={() => scrollToSection("merchandise")}
							className="text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.products')}
						</button> */}
						<button
							onClick={() => navigate("/polisi-privasi")}
							className="text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.privacy')}
						</button>
						<button
							onClick={() => navigate("/terma-dan-syarat")}
							className="text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.terms')}
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.contact')}
						</button>
						<button
							onClick={() => setShowRegionModal(true)}
							className="flex items-center gap-2 text-white hover:text-yellow-500 transition-colors"
						>
							<Globe size={18} />
							{selectedRegion ? selectedRegion.region_code : 'Region'}
						</button>
						<button
							onClick={() => navigate("/register")}
							className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
						>
							{t('navbar.register')}
						</button>
					</div>

					<div className="md:hidden flex items-center gap-2">
						<button
							onClick={() => navigate("/register")}
							className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg text-sm hover:from-yellow-400 hover:to-yellow-500 transition-all"
						>
							{t('navbar.register')}
						</button>
						<button
							className="text-white"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden bg-black border-t border-yellow-600/20">
					<div className="px-4 pt-2 pb-4 space-y-3">
						<button
							onClick={() => scrollToSection("home")}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.home')}
						</button>
						{/* <button
							onClick={() => scrollToSection("merchandise")}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.products')}
						</button> */}
						<button
							onClick={() => navigate("/polisi-privasi")}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.privacy')}
						</button>
						<button
							onClick={() => navigate("/terma-dan-syarat")}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.terms')}
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors"
						>
							{t('navbar.contact')}
						</button>
						<button
							onClick={() => {
								setShowRegionModal(true);
								setIsOpen(false);
							}}
							className="block w-full text-left py-2 text-white hover:text-yellow-500 transition-colors items-center gap-2"
						>
							<Globe size={18} />
							{selectedRegion ? `${selectedRegion.region_name} (${selectedRegion.region_code})` : 'Change Region'}
						</button>
						<button
							onClick={() => navigate("/register")}
							className="block w-full text-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
						>
							{t('navbar.register')}
						</button>
					</div>
				</div>
			)}
		</nav>
		{/* Region Selection Modal */}
		{showRegionModal && (
			<div 
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4 overflow-y-auto"
				onClick={() => setShowRegionModal(false)}
			>
				<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
					<h2 className="text-2xl font-bold text-gray-900 mb-1">{t('modal.welcome')}</h2>
					<p className="text-sm text-gray-600 mb-6">{t('modal.selectCountry')}</p>
					{loadingRegions ? (
						<div className="flex items-center justify-center py-8">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
						</div>
					) : regions.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>{t('modal.error')}</p>
						</div>
					) : (
						<div className="space-y-2 max-h-96 overflow-y-auto">
							{regions.map((region) => (
								<button
									key={region.region_id}
									onClick={() => {
										setSelectedCountry(region.region_id.toString());
										setShowRegionModal(false);
									}}
									className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
										selectedCountry === region.region_id.toString()
											? 'border-emerald-500 bg-emerald-50'
											: 'border-gray-200 hover:border-emerald-500 hover:bg-emerald-50'
									}`}
								>
									<img
										src={region.region_flag}
										alt={`${region.region_name} flag`}
										className="w-10 h-7 object-cover rounded"
									/>
									<div className="flex-1 text-left">
										<span className="text-lg font-medium text-gray-900 block">
											{region.region_name}
										</span>
										<span className="text-xs text-gray-500">
											{region.region_currency}
										</span>
									</div>
									{selectedCountry === region.region_id.toString() && (
										<span className="text-emerald-600 font-semibold">✓</span>
									)}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		)}

		{/* Overlay to prevent interaction when country not selected */}
		{!isCountrySelected && (
			<div className="fixed inset-0 bg-transparent z-[999] overflow-hidden" />
		)}
		</>
	);
}
