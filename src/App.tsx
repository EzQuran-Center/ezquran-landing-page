import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Packages from "./components/Packages";
import Merchandise from "./components/Merchandise";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Registration from "./components/Registration";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import NotFound from "./components/NotFound";
import AffiliateRedirect from "./components/AffiliateRedirect";
import Receipt from "./components/Receipt";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { trackPageView } from "./lib/facebookPixel";

function HomePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<Hero />
			<Services />
			<Packages />
			{/* <Merchandise /> */}
			<Contact />
			<Footer />
		</div>
	);
}

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {

		trackPageView();

		window.scrollTo(0, 0);
	}, [pathname]); // Triggered whenever route changes

	return null;
}

function App() {
	console.log("env : ", import.meta.env.MODE);

	return (
		<AuthProvider>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/register"
						element={
							<>
								<Navbar />
								<Registration />
								<Footer />
							</>
						}
					/>
					<Route
						path="/polisi-privasi"
						element={
							<>
								<Navbar />
								<PrivacyPolicy />
								<Footer />
							</>
						}
					/>
					<Route
						path="/terma-dan-syarat"
						element={
							<>
								<Navbar />
								<TermsAndConditions />
								<Footer />
							</>
						}
					/>
					<Route path="/resit" element={<Receipt />} />
					<Route path="/receipt" element={<Receipt />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/:code" element={<AffiliateRedirect />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
