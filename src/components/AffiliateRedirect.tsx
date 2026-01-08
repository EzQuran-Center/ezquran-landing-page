import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

export default function AffiliateRedirect() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (code) {
            // Validate affiliate code (should be numeric and reasonable length)
            const isValidCode = /^\d+$/.test(code) && code.length >= 8 && code.length <= 20;
            
            if (!isValidCode) {
                // Not a valid affiliate code, redirect to 404
                navigate('/404', { replace: true });
                return;
            }
            
            // Store affiliate code in localStorage
            localStorage.setItem('ezquran_affiliate_code', code);
            
            // Optional: Set expiry (e.g., 30 days)
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            localStorage.setItem('ezquran_affiliate_expiry', expiryDate.toISOString());
            
            console.log('Affiliate code stored:', code);
            
            // Redirect to home page after a brief delay
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);
        } else {
            navigate('/', { replace: true });
        }
    }, [code, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
            <div className="text-center">
                <Loader className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-white mb-2">
                    Memproses...
                </h2>
                <p className="text-gray-400">
                    Sila tunggu sebentar
                </p>
            </div>
        </div>
    );
}
