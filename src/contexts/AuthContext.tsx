import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { api } from "../lib/api";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Region {
	region_id: number;
	region_code: string;
	region_name: string;
	region_currency: string;
	region_flag: string;
	region_status: string;
	created_at: string;
	last_modified: string;
}

interface RegionResponse {
	status_code: number;
	status: string;
	message: string;
	data: Region[];
}

interface AuthContextType {
	selectedCountry: string | null;
	setSelectedCountry: (country: string) => void;
	isCountrySelected: boolean;
	regions: Region[];
	loadingRegions: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

	const [regions, setRegions]                         = useState<Region[]>([]);
	const [loadingRegions, setLoadingRegions]           = useState(true);

	const [selectedCountry, setSelectedCountryState]    = useState<string | null>(
		() => {
			// Check localStorage for previously selected country
			return localStorage.getItem("selectedCountry") || "1"; // default to "1" if not found
		}
	);
	const [showCountryModal, setShowCountryModal] = useState(!selectedCountry);

	// Fetch regions from API
	useEffect(() => {
		const fetchRegions = async () => {
			try {
				setLoadingRegions(true);
				const response = (await api.get("region")) as RegionResponse;
				if (response.status_code === 200 && response.data) {
					// Filter only active regions
					const activeRegions = response.data.filter(
						(r) => r.region_status === "Active"
					);
					setRegions(activeRegions);
				}
			} catch (err) {
				console.error("Failed to fetch regions:", err);
				// Set empty array on error so modal doesn't break
				setRegions([]);
			} finally {
				setLoadingRegions(false);
			}
		};

		fetchRegions();
	}, []);

	const setSelectedCountry = (country: any) => {
		setSelectedCountryState(country);
		localStorage.setItem("selectedCountry", country);
		setShowCountryModal(false);

		if(country !== selectedCountry) {
			// Reload the page to apply changes based on new country
			window.location.href = "/register"
		}		
	};

	const isCountrySelected = selectedCountry !== null;

	// Disable body scroll when modal is open
	useEffect(() => {
		if (showCountryModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [showCountryModal]);

	// useEffect(() => {
	//     const loadUser = async () => {
	//     try {
	//         setLoading(true);
	//         const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

	//         if (authError) throw authError;

	//         if (authUser?.email) {
	//         const { data, error: fetchError } = await supabase
	//             .from('users')
	//             .select('*')
	//             .eq('email', authUser.email)
	//             .maybeSingle();

	//         if (fetchError) throw fetchError;
	//         setUser(data);
	//         }
	//     } catch (err) {
	//         setError(err instanceof Error ? err.message : 'An error occurred');
	//     } finally {
	//         setLoading(false);
	//     }
	//     };

	//     loadUser();
	// }, []);

	return (
		<AuthContext.Provider
			value={{
				selectedCountry,
				setSelectedCountry,
				isCountrySelected,
				regions,
				loadingRegions,
			}}
		>
			{/* Country Selection Modal */}
			{showCountryModal && (
			<button onClick={() => setShowCountryModal(false)} className="fixed inset-0 bg-black bg-opacity-50 z-50 p-4 flex items-center justify-center overflow-y-auto">
				<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative my-auto">
						<h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome to EzQuran</h2>
						<p className="text-sm text-gray-600 mb-6">Please select your country to continue</p>

						{loadingRegions ? (
							<div className="flex items-center justify-center py-8">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
							</div>
						) : regions.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<p  className="text-sm text-slate-600">Unable to load regions. Please refresh the page.</p>
							</div>
						) : (
							<div className="space-y-2 max-h-96 overflow-y-auto">
								{regions.map((region) => (
									<button
										key={region.region_id}
										onClick={() => setSelectedCountry(region.region_id)}
										className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
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
									</button>
								))}
							</div>
						)}

						<p className="text-sm text-gray-500 mt-4 text-center">
							You can change this later in settings
						</p>
					</div>
				</button>
			)}

			{/* Overlay to prevent interaction when country not selected */}
			{!isCountrySelected && (
				<div className="fixed inset-0 bg-transparent z-40" />
			)}

			{/* Fixed Action Button - Bottom Right */}
			{isCountrySelected && (
				<button
					onClick={() => setShowCountryModal(true)}
					className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group print:hidden z-[999]"
					aria-label="Change Region"
				>
					<Globe size={24} className="group-hover:rotate-12 transition-transform" />
				</button>
			)}

			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
