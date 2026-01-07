// import { createClient } from '@supabase/supabase-js';

const supabaseUrl       = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey   = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // throw new Error('Missing Supabase environment variables');
}

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    state: string;
    created_at: string;
    updated_at: string;
}

export interface Enrollment {
    id: string;
    user_id: string;
    package: 'Asas' | 'Pro' | 'Premium';
    price: number;
    status: 'pending' | 'active' | 'cancelled';
    payment_method: string;
    enrollment_date: string;
    expiry_date: string | null;
    created_at: string;
}

export const malaysianStates = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Penang',
    'Perak',
    'Perlis',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Wilayah Persekutuan Kuala Lumpur',
    'Wilayah Persekutuan Labuan',
    'Wilayah Persekutuan Putrajaya',
];

export const packages = [
    {
        id: 'asas',
        name: 'Pakej Asas',
        price: 55.00,
        currency: 'RM'
    },
    {
        id: 'pro',
        name: 'Pakej Pro',
        price: 89.90,
        currency: 'RM'
    },
    {
        id: 'premium',
        name: 'Pakej Premium',
        price: 99.90,
        currency: 'RM'
    }
];
