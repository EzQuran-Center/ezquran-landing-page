import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAffiliateCode } from '../lib/affiliate';
import { CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import Avatar from './Avatar';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

export default function Registration() {

    const location              = useLocation();
    const { selectedCountry }   = useAuth();
    const { t }                 = useTranslation();

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

    const [daysSelected, setDaysSelected]       = useState<string>('');
    const weekdays = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' },
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
        setDaysSelected('');
        setSelectedSlot(null);
        setSlots([]);
    };

    const toggleDay = (day: string) => {
        // setDaysSelected(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
        setDaysSelected(day)
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
        if (!formData.fullName.trim()) return t('registration.form.validation.fullnameRequired');
        if (!formData.email.trim()) return t('registration.form.validation.emailRequired');
        if (!formData.email.includes('@')) return t('registration.form.validation.emailInvalid');
        if (!formData.username.trim()) return t('registration.form.validation.usernameRequired');
        if (!formData.password) return t('registration.form.validation.passwordRequired');
        if (formData.password.length < 6) return t('registration.form.validation.passwordMinLength');
        if (!formData.phone.trim()) return t('registration.form.validation.phoneRequired');
        if (!selectedPackage) return t('registration.form.validation.packageRequired');
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
            days: daysSelected,
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
                setError(response.message || t('registration.form.validation.packageRequired'));
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error?.message || t('registration.form.validation.packageRequired'));
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
                if (mounted) setPackagesError(err?.message || t('registration.error_package'));
            })
            .finally(() => {
                if (mounted) setPackagesLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [selectedCountry]);

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
                if (mounted) setTutorsError(err?.message || t('registration.error_tutor'));
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

        api.get(`registration/tutors/${selectedTutor.tutor_id}/schedules?package_id=${selectedPackage.id}&class_day=${daysSelected}`)
            .then((res: any) => {
                const timeSlots = res?.data?.time_slots || res?.data?.time_slots || [];
                if (mounted) setSlots(timeSlots || []);
            })
            .catch((err: any) => {
                console.error('Failed to load slots', err);
                if (mounted) setSlotsError(err?.message || t('registration.error_datetime'));
            })
            .finally(() => {
                if (mounted) setSlotsLoading(false);
            });

        return () => { mounted = false; };
    }, [step, selectedTutor, selectedPackage, daysSelected]);

    // fetch time slots when daysSelected changes
    // useEffect(() => {
    //     if (step !== 'schedule' || !selectedTutor || !selectedPackage || daysSelected.length === 0) return;
    //     let mounted = true;
    //     setSlotsLoading(true);
    //     setSlotsError(null);
        
    //     api.get(`registration/tutors/${selectedTutor.tutor_id}/schedules?package_id=${selectedPackage.id}`)
    //         .then((res: any) => {
    //             const timeSlots = res?.data?.time_slots || res?.data?.time_slots || [];
    //             if (mounted) setSlots(timeSlots || []);
    //         })
    //         .catch((err: any) => {
    //             console.error('Failed to load slots', err);
    //             if (mounted) setSlotsError(err?.message || 'Gagal memuatkan slot waktu');
    //         })
    //         .finally(() => {
    //             if (mounted) setSlotsLoading(false);
    //         });

    //     return () => { mounted = false; }
    // }, [step, selectedTutor, selectedPackage, daysSelected]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {step === 'package' && (
            <div>
                <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {t('registration.package.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{t('registration.package.highlight')}</span>
                </h1>
                <p className="text-xl text-gray-300">{t('registration.package.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                {packagesLoading ? (
                    <div className="col-span-3 text-center text-gray-300">{t('registration.loading_package')}</div>
                ) : packagesError ? (
                    <div className="col-span-3 text-center text-red-400">{packagesError}</div>
                ) : packages.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-300">{t('registration.error_package')}</div>
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
                        {t('registration.package.button')}
                        </button>
                    </div>
                    </button>
                )))}
                </div>
            </div>
            )}

            {step === 'tutor' && selectedPackage && (
            <div>
                
                <div className="flex justify-between text-center mb-6">
                    <div className="">
                        <button
                        onClick={() => {
                            setStep('package');
                            setError(null);
                        }}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold flex items-center gap-2">
                        <ArrowLeft size={24} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{t('registration.tutor.title')}</h2>
                        <p className="text-lg md:text-xl text-gray-400">{t('registration.tutor.subtitle')}</p>
                    </div>
                    <div></div>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {tutorsLoading ? (
                    <div className="col-span-3 text-center text-gray-300">{t('registration.loading_tutor')}</div>
                ) : tutorsError ? (
                    <div className="col-span-3 text-center text-red-400">{tutorsError}</div>
                ) : tutors.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-300">{t('registration.error_tutor')}</div>
                ) : (
                    tutors.map((tutor: any) => (
                    <div key={tutor.tutor_id} className="flex flex-col justify-center items-center gap-4 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-lg transition">
                        <Avatar src={tutor.tutor_image} name={tutor.tutor_fullname || tutor.tutor_name} size={120} />
                        <div className="flex-1 text-center">
                            <h3 className="font-semibold text-white text-lg">{tutor.tutor_fullname || tutor.tutor_name}</h3>
                            <p className="text-sm text-gray-400">Pemegang Sanad<br />Riwayat Hafs 'An 'Asim</p>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleTutorSelect(tutor)} 
                                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg text-sm">
                                    {t('registration.tutor.button')}
                                </button>
                        </div>
                    </div>))
                )}
                </div>
            </div>
            )}

            {step === 'schedule' && selectedTutor && (
            <div>
                <div className="flex justify-between text-center">
                    <div className="">
                        <button
                        onClick={() => {
                            setStep('tutor');
                            setError(null);
                        }}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-semibold flex items-center gap-2">
                        <ArrowLeft size={24} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{t('registration.datetime.title')}</h2>
                        <p className="text-lg md:text-xl text-gray-400">{t('registration.datetime.subtitle')}</p>
                    </div>
                    <div></div>
                </div>

                <div className="mt-12 mb-12 text-center">
                <p className="text-xl md:text-2xl text-white font-semibold mb-6">{t('registration.datetime.select_days')}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {weekdays.map((d) => (
                    <button key={d.value} onClick={() => toggleDay(d.value)} className={`px-4 py-2 max-w-[120px] rounded-full ${daysSelected.includes(d.value) ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white'}`}>{t(`registration.datetime.days.${d.label}`)}</button>
                    ))}
                </div>
                </div>

                <div className='text-center max-w-2xl mx-auto'>
                <p className="text-xl md:text-2xl text-white font-semibold mb-6">{t('registration.datetime.select_time')} ({daysSelected ? slots.filter((s: any) => s.is_available).length : 0})</p>
                {slotsLoading ? (
                    <div className="text-gray-300">{t('registration.loading_datetime')}</div>
                ) : slotsError ? (
                    <div className="text-red-400">{slotsError}</div>
                ) : slots.length === 0 ? (
                    <div className="text-gray-300">{t('registration.error_datetime')}</div>
                ) : (daysSelected && slots.length > 0 ) && (
                    <div className="grid md:grid-cols-3 gap-4">
                    {slots.map((s: any) => (
                        <button 
                            key={s.slot_id} 
                            onClick={() => handleSlotSelect(s)} 
                            className="p-4 bg-white/5 rounded-lg text-left hover:bg-white/10"
                            disabled={!s.is_available}  
                        >
                            <div className={`font-semibold text-white text-center ${s.is_available == false && 'text-red-600 line-through'}`}>{s.slot_time_12h || s.slot_time}</div>
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
                    {t('registration.form.back')}
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">{t('registration.form.title')}</h2>
                <p className="text-gray-400 mb-8">
                    {t('registration.form.selectedPackage')}: <span className="text-yellow-500 font-semibold">{selectedPackage.name}</span>
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
                            <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">{t('registration.form.username')}</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder={t('registration.form.usernamePlaceholder')}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">{t('registration.form.password')}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder={t('registration.form.passwordPlaceholder')}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">{t('registration.form.fullname')}</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={t('registration.form.fullnamePlaceholder')}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">{t('registration.form.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('registration.form.emailPlaceholder')}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">{t('registration.form.phone')}</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t('registration.form.phonePlaceholder')}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-8">
                    <h3 className="font-semibold text-yellow-500 mb-2">{t('registration.form.summary.title')}</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex justify-between">
                        <span>{t('registration.form.summary.package')}:</span>
                        <span className="font-semibold">{selectedPackage.name}</span>
                        </div>
                        <div className="flex justify-between">
                        <span>{t('registration.form.summary.price')}:</span>
                        <span className="font-semibold">{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</span>
                        </div>
                        {selectedTutor && (
                        <div className="flex justify-between">
                        <span>{t('registration.form.summary.tutor')}:</span>
                        <span className="font-semibold">{selectedTutor.tutor_fullname || selectedTutor.tutor_name}</span>
                        </div>
                        )}
                        {daysSelected.length > 0 && (
                        <div className="flex justify-between">
                        <span>{t('registration.form.summary.day')}:</span>
                        <span className="font-semibold">{daysSelected}</span>
                        </div>
                        )}
                        {selectedSlot && (
                        <div className="flex justify-between">
                        <span>{t('registration.form.summary.time')}:</span>
                        <span className="font-semibold">{selectedSlot.slot_time_12h || selectedSlot.slot_time}</span>
                        </div>
                        )}
                        <div className="flex flex-col justify-between pt-3 border-t border-yellow-500/30 space-y-3">
                        <div className="flex justify-between">
                            <span>{t('registration.form.summary.registrationFee')}</span>
                            <span className="font-semibold">{selectedPackage.currency === "MYR" ? "RM100.00" : `${selectedPackage.currency} 35.00`}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>{t('registration.form.summary.packageFee')}</span>
                            <span className="font-semibold">{selectedPackage.currency} {selectedPackage.price.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>{t('registration.form.summary.totalAmount')}</span>
                            <span className="text-yellow-400 font-bold text-lg">{selectedPackage.currency} {parseFloat(parseFloat(selectedPackage.price) + (selectedPackage.currency === "MYR" ? 100 : 35)).toFixed(2)}</span>
                        </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                        {t('registration.form.summary.paymentNote')}
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
                        {t('registration.form.submitting')}
                        </>
                    ) : (
                        t('registration.form.button')
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

                <h2 className="text-3xl font-bold text-white mb-4">{t('registration.success.title')}</h2>
                <p className="text-gray-300 mb-8">
                    {t('registration.success.thankYou').replace('{hasInvoice, select, true {Your invoice has been generated.} other {You will be redirected to confirm payment.}}', registrationData?.invoice_no ? (t('registration.success.thankYou').includes('generated') ? 'Your invoice has been generated.' : 'Invois anda telah dijana.') : (t('registration.success.thankYou').includes('redirected') ? 'You will be redirected to confirm payment.' : 'Anda akan dibawa untuk mengesahkan pembayaran.'))}
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-semibold text-yellow-500 mb-4">{t('registration.success.info')}</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                    {registrationData?.invoice_no && (
                        <div>
                            <span className="text-gray-400">{t('registration.success.invoiceNo')}:</span>
                            <p className="font-semibold">{registrationData.invoice_no}</p>
                        </div>
                    )}
                    <div>
                        <span className="text-gray-400">{t('registration.success.name')}:</span>
                        <p className="font-semibold">{formData.fullName}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">{t('registration.success.email')}:</span>
                        <p className="font-semibold">{formData.email}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">{t('registration.success.package')}:</span>
                        <p className="font-semibold">{selectedPackage.name}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">{t('registration.success.totalPayment')}:</span>
                        <p className="text-lg font-bold text-yellow-400">RM {selectedPackage.price.toFixed(2)}</p>
                    </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {registrationData?.checkout_url && (
                        <>
                            <p className="text-sm text-gray-400">
                                {t('registration.success.checkoutPrompt')}
                            </p>
                            <button
                                onClick={() => window.location.href = registrationData.checkout_url}
                                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
                            >
                                {t('registration.success.proceedPayment')}
                            </button>
                        </>
                    )}
                    <p className="text-sm text-gray-400">
                        {t('registration.success.contactPrompt')}
                    </p>
                    <button
                    onClick={() => window.open('https://wa.me/60183868296', '_blank')}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
                    >
                    {t('registration.success.contactWhatsapp')}
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
                    {t('registration.success.backToHome')}
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
