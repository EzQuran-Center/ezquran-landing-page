import { useState } from 'react';
import { supabase, packages, malaysianStates } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function Registration() {
    const [step, setStep] = useState<'package' | 'form' | 'success'>('package');
    const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        state: '',
    });

    const handlePackageSelect = (pkg: typeof packages[0]) => {
        setSelectedPackage(pkg);
        setStep('form');
        setError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) return 'Sila masukkan nama lengkap';
        if (!formData.email.trim()) return 'Sila masukkan email';
        if (!formData.email.includes('@')) return 'Email tidak sah';
        if (!formData.phone.trim()) return 'Sila masukkan nombor telefon';
        if (!formData.state) return 'Sila pilih negeri';
        if (!selectedPackage) return 'Sila pilih pakej';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
        setError(validationError);
        return;
        }

        if (!selectedPackage) return;

        try {
        setLoading(true);
        setError(null);

        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', formData.email)
            .maybeSingle();

        let userId;

        if (existingUser) {
            userId = existingUser.id;
            const { error: updateError } = await supabase
            .from('users')
            .update({
                full_name: formData.fullName,
                phone: formData.phone,
                state: formData.state,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

            if (updateError) throw updateError;
        } else {
            const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                state: formData.state,
            })
            .select('id')
            .single();

            if (insertError) throw insertError;
            userId = newUser.id;
        }

        const { error: enrollmentError } = await supabase
            .from('enrollments')
            .insert({
            user_id: userId,
            package: selectedPackage.name.replace('Pakej ', ''),
            price: selectedPackage.price,
            status: 'pending',
            payment_method: 'WhatsApp',
            });

        if (enrollmentError) throw enrollmentError;

        const whatsappMessage = `Halo! Saya ingin mendaftar dengan pakej berikut:%0A%0ANama: ${formData.fullName}%0AEmail: ${formData.email}%0ATelefon: ${formData.phone}%0ANegeri: ${formData.state}%0APakej: ${selectedPackage.name}%0AHarga: RM${selectedPackage.price}`;

        window.open(`https://wa.me/60183868296?text=${whatsappMessage}`, '_blank');

        setStep('success');
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Ralat semasa mendaftar');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {step === 'package' && (
            <div>
                <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Pakej Anda</span>
                </h1>
                <p className="text-xl text-gray-300">
                    Pilih pakej pembelajaran yang sesuai dengan keperluan anda
                </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                {packages.map((pkg) => (
                    <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 rounded-2xl p-8 transition-all transform hover:scale-105 text-left"
                    >
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-yellow-500 mb-4">
                        {pkg.currency}{pkg.price.toFixed(2)}
                    </div>
                    <p className="text-gray-400">sebulan</p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <button
                        onClick={() => handlePackageSelect(pkg)}
                        className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all"
                        >
                        Pilih Pakej Ini
                        </button>
                    </div>
                    </button>
                ))}
                </div>
            </div>
            )}

            {step === 'form' && selectedPackage && (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="mb-8">
                    <button
                    onClick={() => {
                        setStep('package');
                        setError(null);
                    }}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold"
                    >
                    ← Kembali ke Pemilihan Pakej
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">Maklumat Pendaftaran</h2>
                <p className="text-gray-400 mb-8">
                    Pakej dipilih: <span className="text-yellow-500 font-semibold">{selectedPackage.name}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <p className="text-red-400">{error}</p>
                    </div>
                    )}

                    <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ahmad bin Ali"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                        E-mel
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ahmad@email.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                    </div>

                    <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                        Nombor Telefon
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+60 12-345 6789"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                    </div>

                    <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-white mb-2">
                        Negeri
                    </label>
                    <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                        <option value="">Pilih Negeri</option>
                        {malaysianStates.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-8">
                    <h3 className="font-semibold text-yellow-500 mb-2">Ringkasan Pesanan</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex justify-between">
                        <span>Pakej:</span>
                        <span className="font-semibold">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                        <span>Harga:</span>
                        <span className="font-semibold">RM {selectedPackage.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-yellow-500/30">
                        <span>Jumlah:</span>
                        <span className="text-yellow-400 font-bold text-lg">RM {selectedPackage.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                        Pembayaran akan diproses melalui WhatsApp selepas anda menghantar borang ini.
                    </p>
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-2 mt-8"
                    >
                    {loading ? (
                        <>
                        <Loader className="animate-spin" size={20} />
                        Sedang Memproses...
                        </>
                    ) : (
                        'Lanjut ke Pembayaran'
                    )}
                    </button>
                </form>
                </div>
            </div>
            )}

            {step === 'success' && selectedPackage && (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="text-white" size={40} />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Pendaftaran Berjaya!</h2>
                <p className="text-gray-300 mb-8">
                    Terima kasih telah memilih EzQuran Centre. Anda akan dibawa ke WhatsApp untuk mengesahkan pembayaran.
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-semibold text-yellow-500 mb-4">Maklumat Pendaftaran Anda</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                    <div>
                        <span className="text-gray-400">Nama:</span>
                        <p className="font-semibold">{formData.fullName}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Email:</span>
                        <p className="font-semibold">{formData.email}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Pakej:</span>
                        <p className="font-semibold">{selectedPackage.name}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Jumlah Pembayaran:</span>
                        <p className="text-lg font-bold text-yellow-400">RM {selectedPackage.price.toFixed(2)}</p>
                    </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-gray-400">
                    Jika tetingkap WhatsApp tidak terbuka, sila klik butang di bawah:
                    </p>
                    <button
                    onClick={() => window.open('https://wa.me/60183868296', '_blank')}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
                    >
                    Hubungi Kami di WhatsApp
                    </button>
                    <button
                    onClick={() => {
                        setStep('package');
                        setFormData({ fullName: '', email: '', phone: '', state: '' });
                        setSelectedPackage(null);
                        setError(null);
                    }}
                    className="w-full py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                    >
                    Kembali ke Halaman Utama
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
