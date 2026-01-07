import { useState } from 'react';

export default function PrivacyPolicy() {
    const [language, setLanguage] = useState<'bm' | 'en'>('bm');

    const contentBM = {
        title: "Dasar Privasi",
        subtitle: "Aplikasi Mudah Alih EzQuran",
        lastUpdated: "Kemaskini Terakhir: 7 Januari 2026",
        sections: [
            {
                heading: "1. Pengenalan",
                content: `EzQuran Centre Sdn Bhd ("kami") mengendalikan aplikasi mudah alih EzQuran ("Aplikasi"). Dasar Privasi ini menerangkan bagaimana kami mengumpul, menggunakan, mendedahkan dan melindungi maklumat peribadi anda apabila anda menggunakan Aplikasi kami.

Dengan menggunakan Aplikasi ini, anda bersetuju dengan pengumpulan dan penggunaan maklumat mengikut Dasar Privasi ini.`
            },
            {
                heading: "2. Maklumat Syarikat",
                content: `Nama Syarikat: EzQuran Centre Sdn Bhd
Alamat: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia
Email: admin@ezquran.my`
            },
            {
                heading: "3. Maklumat Yang Kami Kumpul",
                content: `Kami mengumpul jenis maklumat berikut:

3.1 Maklumat Peribadi

Apabila anda mendaftar sebagai pelajar di Aplikasi kami, kami mengumpul:
• Nama Pengguna - untuk log masuk dan pengenalan akaun
• Alamat Emel - untuk pengesahan log masuk, notifikasi pembayaran dan resit
• Nombor Telefon - untuk tujuan komunikasi

3.2 Maklumat Peranti

Kami mengumpul maklumat peranti untuk membolehkan anda menerima notifikasi di pelbagai peranti yang dikaitkan dengan satu akaun.

3.3 Data Lokasi

Kami mengumpul data lokasi GPS semata-mata untuk menyediakan waktu solat yang tepat berdasarkan lokasi semasa anda. Ciri ini tersedia untuk semua pengguna, termasuk mereka yang tidak mempunyai akaun berdaftar.`
            },
            {
                heading: "4. Bagaimana Kami Menggunakan Maklumat Anda",
                content: `Kami menggunakan maklumat yang dikumpul untuk tujuan berikut:

• Untuk mencipta dan mengurus akaun pengguna anda
• Untuk memproses langganan kelas dan pembayaran
• Untuk menghantar pengesahan pembayaran dan resit melalui emel
• Untuk menghubungi anda berkaitan akaun atau kelas anda
• Untuk menyediakan waktu solat yang tepat berdasarkan lokasi anda
• Untuk menghantar notifikasi tolak ke peranti berdaftar anda
• Untuk menambah baik Aplikasi dan perkhidmatan kami`
            },
            {
                heading: "5. Pendaftaran Akaun",
                content: `Pendaftaran akaun hanya diperlukan untuk pengguna yang ingin mendaftar sebagai pelajar dalam kelas pembelajaran Al-Quran kami. Pengguna yang hanya ingin mengakses ciri-ciri awam seperti waktu solat dan bacaan Al-Quran tidak perlu membuat akaun.`
            },
            {
                heading: "6. Maklumat Pembayaran",
                content: `Aplikasi kami menawarkan langganan kelas yang boleh dibayar melalui gerbang pembayaran CHiP. Kami tidak menggunakan Apple Pay, Google Pay, atau sistem pembelian dalam aplikasi yang lain.

Pemprosesan pembayaran dikendalikan oleh CHiP, dan kami tidak menyimpan maklumat kad pembayaran lengkap di pelayan kami. Sila rujuk dasar privasi CHiP untuk maklumat tentang bagaimana mereka mengendalikan data pembayaran anda.`
            },
            {
                heading: "7. Perkhidmatan Pihak Ketiga",
                content: `Kami menggunakan perkhidmatan pihak ketiga berikut:

• Google Analytics / Firebase Analytics - untuk analitik penggunaan aplikasi dan pemantauan prestasi
• Firebase Cloud Messaging - untuk menghantar notifikasi tolak
• Gerbang Pembayaran CHiP - untuk memproses pembayaran

Perkhidmatan pihak ketiga ini mungkin mengumpul maklumat mengikut dasar privasi mereka sendiri.`
            },
            {
                heading: "8. Penyimpanan dan Keselamatan Data",
                content: `Data anda disimpan di pelayan selamat yang dihoskan oleh DigitalOcean. Kami melaksanakan langkah-langkah teknikal dan organisasi yang sesuai untuk melindungi maklumat peribadi anda daripada akses, pengubahsuaian, pendedahan atau pemusnahan yang tidak dibenarkan.`
            },
            {
                heading: "9. Perkongsian Data",
                content: `Kami tidak menjual, memperdagangkan atau berkongsi maklumat peribadi anda dengan pihak ketiga kecuali yang diperlukan untuk menyediakan perkhidmatan kami (seperti pemprosesan pembayaran) atau seperti yang dikehendaki oleh undang-undang.`
            }
        ]
    };

    const contentEN = {
        title: "Privacy Policy",
        subtitle: "EzQuran Mobile Application",
        lastUpdated: "Last Updated: 7 January 2026",
        sections: [
            {
                heading: "1. Introduction",
                content: `EzQuran Centre Sdn Bhd ("we", "us", or "our") operates the EzQuran mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.

By using the App, you agree to the collection and use of information in accordance with this Privacy Policy.`
            },
            {
                heading: "2. Company Information",
                content: `Company Name: EzQuran Centre Sdn Bhd
Address: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia
Email: admin@ezquran.my`
            },
            {
                heading: "3. Information We Collect",
                content: `We collect the following types of information:

3.1 Personal Information

When you register as a student on our App, we collect:
• Username - for account login and identification
• Email Address - for login authentication, payment notifications, and receipts
• Phone Number - for communication purposes

3.2 Device Information

We collect device information to allow you to receive notifications across multiple devices linked to a single account.

3.3 Location Data

We collect GPS location data solely to provide accurate prayer times (waktu solat) based on your current location. This feature is available to all users, including those without registered accounts.`
            },
            {
                heading: "4. How We Use Your Information",
                content: `We use the collected information for the following purposes:

• To create and manage your user account
• To process class subscriptions and payments
• To send payment confirmations and receipts via email
• To contact you regarding your account or classes
• To provide accurate prayer times based on your location
• To send push notifications across your registered devices
• To improve our App and services`
            },
            {
                heading: "5. Account Registration",
                content: `Account registration is required only for users who wish to enroll as students in our Quran learning classes. Users who only want to access public features such as prayer times and Quran reading do not need to create an account.`
            },
            {
                heading: "6. Payment Information",
                content: `Our App offers class subscriptions that can be paid through the CHiP payment gateway. We do not use Apple Pay, Google Pay, or other in-app purchase systems.

Payment processing is handled by CHiP, and we do not store your complete payment card information on our servers. Please refer to CHiP's privacy policy for information on how they handle your payment data.`
            },
            {
                heading: "7. Third-Party Services",
                content: `We use the following third-party services:

• Google Analytics / Firebase Analytics - for app usage analytics and performance monitoring
• Firebase Cloud Messaging - for sending push notifications
• CHiP Payment Gateway - for processing payments

These third-party services may collect information in accordance with their own privacy policies.`
            },
            {
                heading: "8. Data Storage and Security",
                content: `Your data is stored on secure servers hosted by DigitalOcean. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`
            },
            {
                heading: "9. Data Sharing",
                content: `We do not sell, trade, or share your personal information with third parties except as necessary to provide our services (such as payment processing) or as required by law.`
            },
            {
                heading: "10. Children's Privacy",
                content: `Our App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at admin@ezquran.my.`
            },
            {
                heading: "11. Your Rights",
                content: `You have the following rights regarding your personal data:

• Access: You can view your personal data within the App at any time.
• Deletion: You can request deletion of your account and associated data through the "Delete Account" feature within the App.

Please note that we do not currently provide the option to download a copy of your data.`
            },
            {
                heading: "12. Changes to This Privacy Policy",
                content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

You are advised to review this Privacy Policy periodically for any changes.`
            },
            {
                heading: "13. Contact Us",
                content: `If you have any questions about this Privacy Policy, please contact us:

Email: admin@ezquran.my
Address: Lot 84-G, Jalan Cattleya 9, Persada Cattleya, 70450 Seremban, Negeri Sembilan, Malaysia`
            }
        ]
    };

    const content = language === 'bm' ? contentBM : contentEN;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Language Toggle */}
                <div className="flex justify-end mb-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1 flex gap-1">
                        <button
                            onClick={() => setLanguage('bm')}
                            className={`px-4 py-2 rounded-md font-semibold transition-all ${
                                language === 'bm'
                                    ? 'bg-yellow-500 text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Bahasa Melayu
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-4 py-2 rounded-md font-semibold transition-all ${
                                language === 'en'
                                    ? 'bg-yellow-500 text-black'
                                    : 'text-gray-400 hover:text-white'
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
                        <p className="text-xl text-gray-300 mb-4">{content.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-400 mb-8">{content.lastUpdated}</p>

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
                            ← {language === 'bm' ? 'Kembali ke Halaman Utama' : 'Back to Home'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
