import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { CheckCircle, Download, Mail, Phone, Calendar, CreditCard, Package, FileText } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

interface ReceiptData {
	account_name: string;
	account_fullname: string;
	account_email: string;
	account_phone: string;
	invoice_description: string;
	payment_reference_no: string;
	package_name: string;
	payment_method: string;
	payment_status: string;
	invoice_type: string;
	invoice_total_amount: string;
	invoice_paid_date: string;
	invoice_status: string;
}

interface ReceiptResponse {
	status_code: number;
	status: string;
	message: string;
	data: ReceiptData;
}

export default function Receipt() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [receipt, setReceipt] = useState<ReceiptData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const receiptNumber = searchParams.get("a");

	useEffect(() => {
		const fetchReceipt = async () => {
			if (!receiptNumber) {
				setError("Receipt number is missing");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await api.get(
					`receipt?type=Payment&ref_no=${receiptNumber}`
				) as ReceiptResponse;

				if (response.status_code === 200 && response.data) {
					setReceipt(response.data);
					setError(null);
				} else {
					setError(response.message || "Failed to load receipt");
				}
			} catch (err) {
				console.error("Failed to fetch receipt:", err);
				setError("Unable to load receipt. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchReceipt();
	}, [receiptNumber]);

	const handlePrint = () => {
		window.print();
	};

	const formatCurrency = (amount: string) => {
		const num = parseFloat(amount);
		return `MYR ${num.toFixed(2)}`;
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-MY", {
			day: "2-digit",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusColor = (status: string) => {
		const statusLower = status.toLowerCase();
		if (statusLower === "success" || statusLower === "paid" || statusLower === "completed") {
			return "text-green-600 bg-green-50";
		}
		if (statusLower === "pending") {
			return "text-yellow-600 bg-yellow-50";
		}
		return "text-red-600 bg-red-50";
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto"></div>
					<p className="mt-4 text-gray-600 font-medium">{t('modal.loading')}</p>
				</div>
			</div>
		);
	}

	if (error || !receipt) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
				<div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<FileText className="w-8 h-8 text-red-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						{t('receipt.receiptNotFound')}
					</h2>
					<p className="text-gray-600 mb-6">{error}</p>
					<button
						onClick={() => navigate("/")}
						className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all"
					>
						{t('receipt.backToHome')}
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 print:bg-white">
			<div className="max-w-4xl mx-auto">
				{/* Success Header */}
				<div className="text-center mb-8 print:hidden">
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-12 h-12 text-green-600" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Payment Successful!
					</h1>
					<p className="text-gray-600">
						Thank you for your payment. Your receipt is ready.
					</p>
				</div>

				{/* Receipt Card */}
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
					{/* Header */}
					<div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-black print:bg-gray-100">
						<div className="flex justify-between items-start">
							<div>
								<h2 className="text-3xl font-bold mb-2">EzQuran Centre</h2>
								<p className="text-black/80">Official Payment Receipt</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-black/80 mb-1">Receipt No.</p>
								<p className="text-xl font-bold">{receipt.payment_reference_no}</p>
							</div>
						</div>
					</div>

					{/* Receipt Body */}
					<div className="p-8">
						{/* Status Badge */}
						<div className="mb-6 flex items-center justify-between">
							<span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(receipt.payment_status)}`}>
								{receipt.payment_status}
							</span>
							<button
								onClick={handlePrint}
								className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all print:hidden"
							>
								<Download size={18} />
								Download PDF
							</button>
						</div>

						{/* Customer Information */}
						<div className="mb-8 pb-8 border-b border-gray-200">
							<h3 className="text-lg font-bold text-gray-900 mb-4">
								Customer Information
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Mail size={20} className="text-gray-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">Full Name</p>
										<p className="font-semibold text-gray-900">
											{receipt.account_fullname}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Mail size={20} className="text-gray-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">Email</p>
										<p className="font-semibold text-gray-900">
											{receipt.account_email}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Phone size={20} className="text-gray-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">Phone</p>
										<p className="font-semibold text-gray-900">
											{receipt.account_phone}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<FileText size={20} className="text-gray-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">Username</p>
										<p className="font-semibold text-gray-900">
											{receipt.account_name}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Payment Details */}
						<div className="mb-8 pb-8 border-b border-gray-200">
							<h3 className="text-lg font-bold text-gray-900 mb-4">
								Payment Details
							</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Package size={20} className="text-gray-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">Package</p>
										<p className="font-semibold text-gray-900">
											{receipt.package_name}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<FileText size={20} className="text-gray-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">Description</p>
										<p className="font-semibold text-gray-900">
											{receipt.invoice_description}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<CreditCard size={20} className="text-gray-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">Payment Method</p>
										<p className="font-semibold text-gray-900">
											{receipt.payment_method}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<Calendar size={20} className="text-gray-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">Payment Date</p>
										<p className="font-semibold text-gray-900">
											{formatDate(receipt.invoice_paid_date)}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Total Amount */}
						<div className="bg-gray-50 rounded-xl p-6">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-gray-600 mb-1">Total Amount</p>
									<p className="text-sm text-gray-500">
										Invoice Type: {receipt.invoice_type}
									</p>
								</div>
								<div className="text-right">
									<p className="text-3xl font-bold text-gray-900">
										{formatCurrency(receipt.invoice_total_amount)}
									</p>
								</div>
							</div>
						</div>

						{/* Footer Note */}
						<div className="mt-8 pt-6 border-t border-gray-200">
							<p className="text-sm text-gray-600 text-center">
								This is a computer-generated receipt and does not require a signature.
								For any inquiries, please contact EzQuran Centre support.
							</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="mt-8 flex justify-center gap-4 print:hidden">
					<button
						onClick={() => navigate("/")}
						className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-all"
					>
						Back to Home
					</button>
					<button
						onClick={handlePrint}
						className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all flex items-center gap-2"
					>
						<Download size={20} />
						Download Receipt
					</button>
				</div>
			</div>
		</div>
	);
}
