import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAffiliateCode } from '../lib/affiliate';
import { CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import Avatar from './Avatar';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function Registration() {

    const location              = useLocation();
    const { selectedCountry }   = useAuth();

    const [step, setStep]                       = useState<'package' | 'tutor' | 'schedule' | 'form' | 'success'>('package');
    const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
    const [loading, setLoading]                 = useState(false);
    const [error, setError]                     = useState<string | null>(null);
    const [formData, setFormData]               = useState({ fullName: '', email: '', username: '', password: '', phone: ''});
    const [registrationData, setRegistrationData] = useState<any | null>(null);

    const [packages, setPackages]               = useState<any[]>([]);
    const [packagesLoading, setPackagesLoading] = useState<boolean>(true);
    const [packagesError, setPackagesError]     = useState<string | null>(null);

    const [tutors, setTutors]                   = useState<any[]>([]);
    const [tutorsLoading, setTutorsLoading]     = useState<boolean>(false);
    const [tutorsError, setTutorsError]         = useState<string | null>(null);
    const [selectedTutor, setSelectedTutor]     = useState<any | null>(null);

    const [slots, setSlots]                     = useState<any[]>([]);
    const [slotsLoading, setSlotsLoading]       = useState<boolean>(false);
    const [slotsError, setSlotsError]           = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot]       = useState<any | null>(null);

    const [daysSelected, setDaysSelected]       = useState<string[]>([]);
    const weekdays = [
        { value: 'Monday', label: 'Isnin' },
        { value: 'Tuesday', label: 'Selasa' },
        { value: 'Wednesday', label: 'Rabu' },
        { value: 'Thursday', label: 'Khamis' },
        { value: 'Friday', label: 'Jumaat' },
        { value: 'Saturday', label: 'Sabtu' },
        { value: 'Sunday', label: 'Ahad' },
    ];

    const dayLabel = (val: string) => weekdays.find((w) => w.value === val)?.label || val;

    const handlePackageSelect = (pkg: any) => {
        const mapped = {
            id: pkg.package_id,
            name: pkg.package_name,
            price: parseFloat(pkg.final_price || '0'),
            currency: pkg.region_currency,
            raw: pkg,
        };
        setSelectedPackage(mapped);
        setStep('tutor');
        setError(null);
    };

    const handleTutorSelect = (tutor: any) => {
        setSelectedTutor(tutor);
        setStep('schedule');
        setDaysSelected([]);
        setSelectedSlot(null);
        setSlots([]);
    };

    const toggleDay = (day: string) => {
        setDaysSelected(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    const handleSlotSelect = (slot: any) => {
        setSelectedSlot(slot);
        setStep('form');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) return 'Sila masukkan nama lengkap';
        if (!formData.email.trim()) return 'Sila masukkan email';
        if (!formData.email.includes('@')) return 'Email tidak sah';
        if (!formData.username.trim()) return 'Sila masukkan nama pengguna';
        if (!formData.password) return 'Sila masukkan kata laluan';
        if (formData.password.length < 6) return 'Kata laluan mesti sekurang-kurangnya 6 aksara';
        if (!formData.phone.trim()) return 'Sila masukkan nombor telefon';
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

        setLoading(true);
        setError(null);
        
        // Get affiliate code from localStorage if exists
        const affiliateCode = getAffiliateCode();

        const payload = {
            username: formData.username,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            package: selectedPackage.id,
            tutor: selectedTutor.tutor_id,
            days: daysSelected[0],
            slot: selectedSlot,
            class_start_at: selectedSlot ? selectedSlot.slot_start : null, 
            class_end_at: selectedSlot ? selectedSlot.slot_end : null,
            affiliateCode: affiliateCode || null,
            isWeb: true,
            region_id: selectedCountry || '1',
        };
        
        try {
            const response = await api.post('registration/web-enroll', payload);
            console.log('Registration response:', response);

            if(response && response.success) {
                setRegistrationData(response.data);
                
                // Redirect to checkout URL
                if (response.data.checkout_url) {
                    window.location.href = response.data.checkout_url;
                } else {
                    setStep('success');
                }
            } else {
                setError(response.message || 'Pendaftaran gagal. Sila cuba lagi.');
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error?.message || 'Ralat semasa mendaftar. Sila cuba lagi.');
            setLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;
        setPackagesLoading(true);
        setPackagesError(null);

        api.get(`region/${selectedCountry}/packages`)
            .then((res: any) => {
                const items = res?.data || [];
                if (mounted) setPackages(items);
            })
            .catch((err: any) => {
                console.error('Failed to load packages', err);
                if (mounted) setPackagesError(err?.message || 'Gagal memuatkan pakej');
            })
            .finally(() => {
                if (mounted) setPackagesLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Check for pre-selected package from navigation state
    useEffect(() => {
        const state = location.state as any;
        if (state?.selectedPackage) {
            const pkg = state.selectedPackage;
            const mapped = {
                id: pkg.package_id,
                name: pkg.package_name,
                price: parseFloat(pkg.package_price || '0'),
                raw: pkg,
            };
            setSelectedPackage(mapped);
            setStep('tutor');
        }
    }, [location]);

    // fetch tutors when entering tutor step
    useEffect(() => {
        if (step !== 'tutor' || !selectedPackage) return;
        let mounted = true;
        setTutorsLoading(true);
        setTutorsError(null);

        api.get('registration/tutors')
            .then((res: any) => {
                const items = res?.data || res || [];
                if (mounted) setTutors(items);
            })
            .catch((err: any) => {
                console.error('Failed to load tutors', err);
                if (mounted) setTutorsError(err?.message || 'Gagal memuatkan tutor');
            })
            .finally(() => {
                if (mounted) setTutorsLoading(false);
            });

        return () => { mounted = false; };
    }, [step, selectedPackage]);

    // fetch slots when entering schedule step
    useEffect(() => {
        if (step !== 'schedule' || !selectedTutor || !selectedPackage) return;
        let mounted = true;
        setSlotsLoading(true);
        setSlotsError(null);

        api.get(`registration/tutors/${selectedTutor.tutor_id}/schedules?package_id=${selectedPackage.id}`)
            .then((res: any) => {
                const timeSlots = res?.data?.time_slots || res?.data?.time_slots || [];
                if (mounted) setSlots(timeSlots || []);
            })
            .catch((err: any) => {
                console.error('Failed to load slots', err);
                if (mounted) setSlotsError(err?.message || 'Gagal memuatkan slot waktu');
            })
            .finally(() => {
                if (mounted) setSlotsLoading(false);
            });

        return () => { mounted = false; };
    }, [step, selectedTutor, selectedPackage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                {packagesLoading ? (
                    <div className="col-span-3 text-center text-gray-300">Memuatkan pakej...</div>
                ) : packagesError ? (
                    <div className="col-span-3 text-center text-red-400">{packagesError}</div>
                ) : packages.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-300">Tiada pakej ditemui</div>
                ) : (
                    packages.map((pkg) => (
                    <button
                    key={pkg.package_id}
                    onClick={() => handlePackageSelect(pkg)}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 rounded-2xl p-8 transition-all transform hover:scale-105 text-left"
                    >
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.package_name}</h3>
                    <div className="text-4xl font-bold text-yellow-500 mb-4">
                        {pkg.region_currency} {parseFloat(pkg.final_price || '0').toFixed(2)}
                    </div>
                    <p className="text-gray-400">{pkg.package_commitment_type || 'sebulan'}</p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <button
                        onClick={() => handlePackageSelect(pkg)}
                        className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all"
                        >
                        Pilih Pakej Ini
                        </button>
                    </div>
                    </button>
                )))}
                </div>
            </div>
            )}

            {step === 'tutor' && selectedPackage && (
            <div>
                <div className="mb-8">
                    <button
                    onClick={() => {
                        setStep('package');
                        setError(null);
                    }}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Kembali
                    </button>
                </div>

                <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Pilih Guru</h2>
                <p className="text-gray-400">Pilih guru yang anda inginkan untuk sesi kelas</p>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {tutorsLoading ? (
                    <div className="col-span-3 text-center text-gray-300">Memuatkan guru...</div>
                ) : tutorsError ? (
                    <div className="col-span-3 text-center text-red-400">{tutorsError}</div>
                ) : tutors.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-300">Tiada guru ditemui</div>
                ) : (
                    tutors.map((t: any) => (
                    <div key={t.tutor_id} className="flex flex-col justify-center items-center gap-4 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-lg transition">
                        <Avatar src={t.tutor_image} name={t.tutor_fullname || t.tutor_name} size={56} />
                        <div className="flex-1 text-center">
                            <h3 className="font-semibold text-white text-lg">{t.tutor_fullname || t.tutor_name}</h3>
                            <p className="text-sm text-gray-400">Pemegang Sanad Riwayat Hafs 'An 'Asim</p>
                        </div>
                        <div>
                            <button onClick={() => handleTutorSelect(t)} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg text-sm">Pilih Guru</button>
                        </div>
                    </div>))
                )}
                </div>
            </div>
            )}

            {step === 'schedule' && selectedTutor && (
            <div>
                <div className="mb-8">
                    <button
                    onClick={() => {
                        setStep('tutor');
                        setError(null);
                    }}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                    <ArrowLeft size={16} />
                    Kembali
                    </button>
                </div>

                <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Pilih Hari & Waktu</h2>
                <p className="text-gray-400">Pilih hari yang sesuai, kemudian pilih slot waktu tersedia</p>
                </div>

                <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Pilih Hari</h3>
                <div className="flex flex-wrap gap-2">
                    {weekdays.map((d) => (
                    <button key={d.value} onClick={() => toggleDay(d.value)} className={`px-4 py-2 w-[100px] rounded-full ${daysSelected.includes(d.value) ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white'}`}>
                        {d.label}
                    </button>
                    ))}
                </div>
                </div>

                <div>
                <h3 className="text-white font-semibold mb-3">Pilih Waktu</h3>
                {slotsLoading ? (
                    <div className="text-gray-300">Memuatkan slot...</div>
                ) : slotsError ? (
                    <div className="text-red-400">{slotsError}</div>
                ) : slots.length === 0 ? (
                    <div className="text-gray-300">Tiada slot tersedia</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                    {slots.filter((s: any) => s.is_available).map((s: any) => (
                        <button key={s.slot_id} onClick={() => handleSlotSelect(s)} className="p-4 bg-white/5 rounded-lg text-left hover:bg-white/10">
                        <div className="font-semibold text-white text-center">{s.slot_time_12h || s.slot_time}</div>
                        </button>
                    ))}
                    </div>
                )}
                </div>
            </div>
            )}

            {step === 'form' && selectedPackage && (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="mb-8">
                    <button
                    onClick={() => {
                        setStep('schedule');
                        setError(null);
                    }}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                    <ArrowLeft size={16} />
                    Kembali
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

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">Nama Pengguna (username)</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="nama_pengguna"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">Kata Laluan</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Minimum 6 aksara"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">Nama Lengkap</label>
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
                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">E-mel</label>
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
                        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">Nombor Telefon</label>
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

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-8">
                    <h3 className="font-semibold text-yellow-500 mb-2">Ringkasan Pesanan</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex justify-between">
                        <span>Pakej:</span>
                        <span className="font-semibold">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                        <span>Harga:</span>
                        <span className="font-semibold">{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</span>
                        </div>
                        {selectedTutor && (
                        <div className="flex justify-between">
                        <span>Tutor:</span>
                        <span className="font-semibold">{selectedTutor.tutor_fullname || selectedTutor.tutor_name}</span>
                        </div>
                        )}
                        {daysSelected.length > 0 && (
                        <div className="flex justify-between">
                        <span>Hari:</span>
                        <span className="font-semibold">{daysSelected.map(dayLabel).join(', ')}</span>
                        </div>
                        )}
                        {selectedSlot && (
                        <div className="flex justify-between">
                        <span>Waktu:</span>
                        <span className="font-semibold">{selectedSlot.slot_time_12h || selectedSlot.slot_time}</span>
                        </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-yellow-500/30">
                        <span>Jumlah:</span>
                        <span className="text-yellow-400 font-bold text-lg">{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</span>
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
                    Terima kasih telah memilih EzQuran Centre. {registrationData?.invoice_no ? 'Invois anda telah dijana.' : 'Anda akan dibawa untuk mengesahkan pembayaran.'}
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-semibold text-yellow-500 mb-4">Maklumat Pendaftaran Anda</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                    {registrationData?.invoice_no && (
                        <div>
                            <span className="text-gray-400">No. Invois:</span>
                            <p className="font-semibold">{registrationData.invoice_no}</p>
                        </div>
                    )}
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
                    {registrationData?.checkout_url && (
                        <>
                            <p className="text-sm text-gray-400">
                                Sila klik butang di bawah untuk melengkapkan pembayaran:
                            </p>
                            <button
                                onClick={() => window.location.href = registrationData.checkout_url}
                                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
                            >
                                Teruskan ke Pembayaran
                            </button>
                        </>
                    )}
                    <p className="text-sm text-gray-400">
                        Atau hubungi kami untuk bantuan:
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
                        setFormData({ fullName: '', email: '', username: '', password: '', phone: '' });
                        setSelectedPackage(null);
                        setRegistrationData(null);
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
