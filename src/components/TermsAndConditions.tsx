import { useState } from "react";

export default function TermsAndConditions() {
	const [language, setLanguage] = useState<"bm" | "en">("bm");

	const contentBM = {
		title: "Terma dan Syarat",
		subtitle: "Aplikasi Mudah Alih EzQuran",
		lastUpdated: "Kemaskini Terakhir: 7 Januari 2026",
		sections: [
			{
				heading: "1. Pengenalan",
				content: `Selamat datang ke EzQuran. Terma dan Syarat ("Terma") ini mengawal penggunaan anda terhadap aplikasi mudah alih EzQuran ("Aplikasi") yang dikendalikan oleh EzQuran Centre Sdn Bhd ("kami").

Dengan memuat turun, memasang, atau menggunakan Aplikasi ini, anda bersetuju untuk terikat dengan Terma ini. Jika anda tidak bersetuju dengan Terma ini, sila jangan gunakan Aplikasi ini.`,
			},
			{
				heading: "2. Maklumat Syarikat",
				content: `Nama Syarikat: EzQuran Centre Sdn Bhd
Alamat: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia
Email: admin@ezquran.my`,
			},
			{
				heading: "3. Kelayakan",
				content: `3.1 Anda mestilah berumur sekurang-kurangnya 18 tahun untuk menggunakan Aplikasi ini dan mendaftar akaun.

3.2 Pengguna di bawah umur 18 tahun hanya boleh menggunakan Aplikasi ini dengan kebenaran dan pengawasan ibu bapa atau penjaga yang sah. Ibu bapa atau penjaga mesti bersetuju dengan Terma ini bagi pihak kanak-kanak tersebut dan bertanggungjawab terhadap penggunaan Aplikasi oleh kanak-kanak.

3.3 Dengan menggunakan Aplikasi ini, anda menyatakan dan menjamin bahawa anda memenuhi syarat kelayakan yang dinyatakan di atas.`,
			},
			{
				heading: "4. Pendaftaran Akaun dan Keselamatan",
				content: `4.1 Untuk mengakses ciri-ciri tertentu dalam Aplikasi, termasuk mendaftar untuk kelas dalam talian, anda perlu membuat akaun.

4.2 Anda bertanggungjawab untuk menjaga kerahsiaan maklumat log masuk akaun anda dan untuk semua aktiviti yang berlaku di bawah akaun anda.

4.3 Perkongsian akaun adalah dilarang sama sekali. Setiap akaun adalah untuk kegunaan individu sahaja.

4.4 Setiap akaun dihadkan kepada maksimum 3 (tiga) peranti pada satu-satu masa.

4.5 Anda mesti memberitahu kami dengan segera jika terdapat sebarang penggunaan akaun anda tanpa kebenaran.`,
			},
			{
				heading: "5. Penggantungan dan Penamatan Akaun",
				content: `5.1 Kami berhak untuk menggantung atau menamatkan akaun anda jika anda melanggar mana-mana peraturan yang ditetapkan oleh EzQuran Centre.

5.2 Jika anda gagal membayar yuran kelas bulanan, akaun anda tidak akan digantung; walau bagaimanapun, anda akan kehilangan akses kepada kelas dalam talian sehingga pembayaran dibuat.

5.3 Kami boleh menamatkan akaun yang tidak aktif untuk tempoh yang lama atau atas sebab-sebab lain mengikut budi bicara kami.`,
			},
			{
				heading: "6. Langganan dan Pembayaran",
				content: `6.1 Langganan Kelas

Untuk menjadi pelajar dan menyertai kelas dalam talian, anda dikehendaki melanggan pakej kelas dengan membayar yuran pendaftaran. Selepas pendaftaran, anda akan dicaj yuran bulanan berdasarkan pakej yang telah anda langgan.

6.2 Harga

Harga berbeza mengikut pakej yang disediakan oleh EzQuran. Maklumat harga semasa boleh didapati dalam Aplikasi.

6.3 Kaedah Pembayaran

Semua pembayaran diproses melalui gerbang pembayaran CHiP. Dengan membuat pembayaran, anda bersetuju dengan terma perkhidmatan CHiP.

6.4 Polisi Tiada Pemulangan Wang

Semua pembayaran yang dibuat kepada EzQuran Centre adalah muktamad dan tidak boleh dikembalikan. Setelah pembayaran diproses, tiada pemulangan wang akan diberikan dalam apa jua keadaan. Sila pastikan anda memahami polisi ini sebelum membuat sebarang pembayaran.`,
			},
			{
				heading: "7. Hak Harta Intelek",
				content: `7.1 Semua kandungan dalam Aplikasi, termasuk tetapi tidak terhad kepada teks, grafik, logo, imej, audio, video, bahan kelas, dan perisian, adalah eksklusif milik EzQuran Centre dan dilindungi oleh undang-undang hak cipta dan harta intelek.

7.2 Anda diberi lesen terhad, tidak eksklusif, dan tidak boleh dipindah milik untuk mengakses dan menggunakan Aplikasi untuk tujuan peribadi dan bukan komersial sahaja.

7.3 Anda dilarang sama sekali daripada:

• Merakam, mengambil tangkapan skrin, atau menangkap sebarang kandungan dari Aplikasi
• Berkongsi, mengedarkan, atau menghasilkan semula sebarang kandungan dari Aplikasi kepada pihak luar
• Mengubahsuai, menyesuaikan, atau mencipta karya terbitan daripada kandungan Aplikasi
• Menggunakan kandungan untuk sebarang tujuan komersial tanpa kebenaran bertulis terlebih dahulu`,
			},
			{
				heading: "8. Tingkah Laku Pengguna",
				content: `8.1 Anda bersetuju untuk menggunakan Aplikasi dengan cara yang bertanggungjawab dan sah.

8.2 Tingkah laku berikut adalah dilarang sama sekali:

• Merakam, mengambil tangkapan skrin, atau berkongsi kandungan kelas atau sebarang data yang disediakan oleh EzQuran
• Tidak menghadiri kelas lebih daripada 3 (tiga) kali berturut-turut tanpa alasan yang munasabah atau tanpa sebarang penjelasan
• Menggunakan Aplikasi untuk sebarang tujuan yang menyalahi undang-undang atau tanpa kebenaran
• Cuba mengganggu atau mengacau fungsi Aplikasi
• Menggangu, mengancam, atau menyalahgunakan pengguna lain atau pengajar

8.3 Pelanggaran peraturan tingkah laku ini boleh mengakibatkan penggantungan atau penamatan akaun dengan serta-merta.`,
			},
			{
				heading: "9. Kelas dan Kehadiran",
				content: `9.1 Kelas yang Terlepas

Jika anda terlepas kelas yang dijadualkan, pengajar akan mengatur sesi gantian pada tarikh dan masa yang lain.

9.2 Ketidakhadiran Pengajar

Jika pengajar tidak dapat menghadiri kelas yang dijadualkan, pengajar akan memberitahu anda terlebih dahulu dan kelas akan ditangguhkan ke tarikh akan datang.

9.3 Interaksi Pengguna

Aplikasi tidak menyediakan ciri untuk pengguna berinteraksi dengan pengguna lain. Semua interaksi adalah terhad kepada komunikasi pelajar-pengajar semasa sesi kelas.`,
			},
			{
				heading: "10. Penafian Waranti",
				content: `10.1 Aplikasi disediakan atas dasar "seadanya" dan "seperti yang tersedia" tanpa sebarang waranti dalam apa jua bentuk, sama ada tersurat mahupun tersirat.

10.2 Kami tidak menjamin bahawa Aplikasi akan beroperasi tanpa gangguan, bebas ralat, atau bebas daripada virus atau komponen berbahaya yang lain.

10.3 Kami tidak membuat sebarang jaminan mengenai ketepatan, kebolehpercayaan, atau kelengkapan sebarang kandungan yang disediakan melalui Aplikasi.`,
			},
			{
				heading: "11. Had Liabiliti",
				content: `11.1 Setakat yang dibenarkan oleh undang-undang yang terpakai, EzQuran Centre Sdn Bhd tidak akan bertanggungjawab untuk sebarang ganti rugi tidak langsung, sampingan, khas, berbangkit, atau punitif yang timbul daripada atau berkaitan dengan penggunaan Aplikasi oleh anda.

11.2 Kami tidak akan bertanggungjawab untuk sebarang kehilangan data, keuntungan, atau peluang perniagaan yang disebabkan oleh penggunaan Aplikasi oleh anda.

11.3 Jumlah liabiliti kami kepada anda untuk sebarang tuntutan yang timbul daripada penggunaan Aplikasi tidak akan melebihi jumlah yang telah anda bayar kepada kami dalam tempoh 12 bulan sebelum tuntutan tersebut.`,
			},
			{
				heading: "12. Pengubahsuaian Terma",
				content: `12.1 Kami berhak untuk mengubahsuai Terma ini pada bila-bila masa.

12.2 Sebarang perubahan akan berkuat kuasa serta-merta selepas Terma yang dikemaskini disiarkan dalam Aplikasi.

12.3 Penggunaan berterusan Aplikasi oleh anda selepas sebarang pengubahsuaian menunjukkan bahawa anda telah menerima perubahan yang dikemaskini.`,
			},
			{
				heading:
					"13. Undang-Undang Pentadbir dan Penyelesaian Pertikaian",
				content: `13.1 Terma ini hendaklah ditadbir dan ditafsirkan mengikut undang-undang Malaysia.

13.2 Sebarang pertikaian yang timbul daripada atau berkaitan dengan Terma ini atau penggunaan Aplikasi oleh anda hendaklah tertakluk kepada bidang kuasa eksklusif mahkamah Negeri Sembilan, Seremban 2, Malaysia.`,
			},
			{
				heading: "14. Kebolehpisahan",
				content: `Jika mana-mana peruntukan dalam Terma ini didapati tidak sah atau tidak boleh dikuatkuasakan, peruntukan-peruntukan yang sebelihnya akan terus sah dan boleh dikuatkuasakan setakat yang dibenarkan oleh undang-undang.`,
			},
			{
				heading: "15. Hubungi Kami",
				content: `Jika anda mempunyai sebarang pertanyaan tentang Terma dan Syarat ini, sila hubungi kami:

Email: admin@ezquran.my
Alamat: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia`,
			},
			{
				heading: "16. Pengakuan",
				content: `Dengan menggunakan Aplikasi EzQuran, anda mengakui bahawa anda telah membaca, memahami, dan bersetuju untuk terikat dengan Terma dan Syarat ini.`,
			},
		],
	};

	const contentEN = {
		title: "Terms and Conditions",
		subtitle: "EzQuran Mobile Application",
		lastUpdated: "Last Updated: 7 January 2026",
		sections: [
			{
				heading: "1. Introduction",
				content: `Welcome to EzQuran. These Terms and Conditions ("Terms") govern your use of the EzQuran mobile application ("App") operated by EzQuran Centre Sdn Bhd ("we", "us", or "our").

By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.`,
			},
			{
				heading: "2. Company Information",
				content: `Company Name: EzQuran Centre Sdn Bhd
Address: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia
Email: admin@ezquran.my`,
			},
			{
				heading: "3. Eligibility",
				content: `3.1 You must be at least 18 years old to use this App and register for an account.

3.2 Users under 18 years of age may only use the App with the consent and supervision of a parent or legal guardian. The parent or guardian must agree to these Terms on behalf of the minor and is responsible for the minor's use of the App.

3.3 By using the App, you represent and warrant that you meet the eligibility requirements stated above.`,
			},
			{
				heading: "4. Account Registration and Security",
				content: `4.1 To access certain features of the App, including enrolling in online classes, you must create an account.

4.2 You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

4.3 Account sharing is strictly prohibited. Each account is for individual use only.

4.4 Each account is limited to a maximum of 3 (three) devices at any one time.

4.5 You must notify us immediately of any unauthorized use of your account.`,
			},
			{
				heading: "5. Account Suspension and Termination",
				content: `5.1 We reserve the right to suspend or terminate your account if you violate any of the rules and regulations set by EzQuran Centre.

5.2 If you fail to pay your monthly class fees, your account will not be suspended; however, you will lose access to online classes until payment is made.

5.3 We may terminate accounts that have been inactive for an extended period or for any other reason at our sole discretion.`,
			},
			{
				heading: "6. Subscription and Payment",
				content: `6.1 Class Subscription

To become a student and join online classes, you are required to subscribe to a class package by paying the registration fee. After registration, you will be charged a monthly fee based on the package you have subscribed to.

6.2 Pricing

Prices vary according to the packages provided by EzQuran. Current pricing information is available within the App.

6.3 Payment Method

All payments are processed through the CHiP payment gateway. By making a payment, you agree to CHiP's terms of service.

6.4 No Refund Policy

All payments made to EzQuran Centre are final and non-refundable. Once a payment has been processed, no refunds will be issued under any circumstances. Please ensure you understand this policy before making any payment.`,
			},
			{
				heading: "7. Intellectual Property Rights",
				content: `7.1 All content within the App, including but not limited to text, graphics, logos, images, audio, video, class materials, and software, is the property of EzQuran Centre and is protected by copyright and intellectual property laws.

7.2 You are granted a limited, non-exclusive, non-transferable license to access and use the App for personal, non-commercial purposes only.

7.3 You are strictly prohibited from:

• Recording, screenshotting, or capturing any content from the App
• Sharing, distributing, or reproducing any content from the App to external parties
• Modifying, adapting, or creating derivative works from the App's content
• Using the content for any commercial purposes without prior written consent`,
			},
			{
				heading: "8. User Conduct",
				content: `8.1 You agree to use the App in a responsible and lawful manner.

8.2 The following behaviors are strictly prohibited:

• Recording, screenshotting, or sharing class content or any data provided by EzQuran
• Missing classes more than 3 (three) consecutive times without a reasonable excuse or without any explanation
• Using the App for any illegal or unauthorized purpose
• Attempting to interfere with or disrupt the App's functionality
• Harassing, threatening, or abusing other users or instructors

8.3 Violation of these conduct rules may result in immediate account suspension or termination.`,
			},
			{
				heading: "9. Classes and Attendance",
				content: `9.1 Missed Classes

If you miss a scheduled class, the instructor will arrange a replacement session at an alternative date and time.

9.2 Instructor Absence

If an instructor is unable to attend a scheduled class, the instructor will notify you in advance and the class will be postponed to a future date.

9.3 User Interaction

The App does not provide features for users to interact with other users. All interactions are limited to student-instructor communication during class sessions.`,
			},
			{
				heading: "10. Disclaimer of Warranties",
				content: `10.1 The App is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.

10.2 We do not warrant that the App will be uninterrupted, error-free, or free from viruses or other harmful components.

10.3 We make no guarantees regarding the accuracy, reliability, or completeness of any content provided through the App.`,
			},
			{
				heading: "11. Limitation of Liability",
				content: `11.1 To the fullest extent permitted by applicable law, EzQuran Centre Sdn Bhd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the App.

11.2 We shall not be liable for any loss of data, profits, or business opportunities resulting from your use of the App.

11.3 Our total liability to you for any claims arising from your use of the App shall not exceed the amount you have paid to us in the 12 months preceding the claim.`,
			},
			{
				heading: "12. Modifications to Terms",
				content: `12.1 We reserve the right to modify these Terms at any time.

12.2 Any changes will be effective immediately upon posting the updated Terms within the App.

12.3 Your continued use of the App after any modifications indicates your acceptance of the updated Terms.`,
			},
			{
				heading: "13. Governing Law and Dispute Resolution",
				content: `13.1 These Terms shall be governed by and construed in accordance with the laws of Malaysia.

13.2 Any disputes arising from or related to these Terms or your use of the App shall be subject to the exclusive jurisdiction of the courts of Negeri Sembilan, Seremban 2, Malaysia.`,
			},
			{
				heading: "14. Severability",
				content: `If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.`,
			},
			{
				heading: "15. Contact Us",
				content: `If you have any questions about these Terms and Conditions, please contact us:

Email: admin@ezquran.my
Address: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia`,
			},
			{
				heading: "16. Acknowledgement",
				content: `By using the EzQuran App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`,
			},
		],
	};

	const content = language === "bm" ? contentBM : contentEN;

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-12">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Language Toggle */}
				<div className="flex justify-end mb-8">
					<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1 flex gap-1">
						<button
							onClick={() => setLanguage("bm")}
							className={`px-4 py-2 rounded-md font-semibold transition-all ${
								language === "bm"
									? "bg-yellow-500 text-black"
									: "text-gray-400 hover:text-white"
							}`}
						>
							Bahasa Melayu
						</button>
						<button
							onClick={() => setLanguage("en")}
							className={`px-4 py-2 rounded-md font-semibold transition-all ${
								language === "en"
									? "bg-yellow-500 text-black"
									: "text-gray-400 hover:text-white"
							}`}
						>
							English
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
						{content.title}
					</h1>
					{content.subtitle && (
						<p className="text-xl text-gray-300 mb-4">
							{content.subtitle}
						</p>
					)}
					<p className="text-sm text-gray-400 mb-8">
						{content.lastUpdated}
					</p>

					<div className="space-y-8">
						{content.sections.map((section, index) => (
							<div key={index}>
								<h2 className="text-2xl font-bold text-yellow-500 mb-4">
									{section.heading}
								</h2>
								<div className="text-gray-300 leading-relaxed whitespace-pre-line">
									{section.content}
								</div>
							</div>
						))}
					</div>

					{/* Back to Home */}
					<div className="mt-12 pt-8 border-t border-white/10">
						<a
							href="/"
							className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors font-semibold"
						>
							←{" "}
							{language === "bm"
								? "Kembali ke Halaman Utama"
								: "Back to Home"}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
