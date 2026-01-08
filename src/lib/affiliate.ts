// Utility functions for managing affiliate codes

export const setAffiliateCode = (code: string) => {
    localStorage.setItem('ezquran_affiliate_code', code);
    
    // Set expiry (30 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    localStorage.setItem('ezquran_affiliate_expiry', expiryDate.toISOString());
};

export const getAffiliateCode = (): string | null => {
    const code = localStorage.getItem('ezquran_affiliate_code');
    const expiry = localStorage.getItem('ezquran_affiliate_expiry');
    
    if (!code || !expiry) {
        return null;
    }
    
    // Check if expired
    const expiryDate = new Date(expiry);
    const now = new Date();
    
    if (now > expiryDate) {
        // Expired, clear storage
        clearAffiliateCode();
        return null;
    }
    
    return code;
};

export const clearAffiliateCode = () => {
    localStorage.removeItem('ezquran_affiliate_code');
    localStorage.removeItem('ezquran_affiliate_expiry');
};

export const hasAffiliateCode = (): boolean => {
    return getAffiliateCode() !== null;
};
