import { Check, Star } from 'lucide-react';

export default function Packages() {
  const packages = [
    {
      name: 'Pakej Asas',
      price: 'RM 55.00',
      period: 'sebulan',
      popular: false,
      features: [
        'Kelas Al-Quran Asas',
        '2 sesi seminggu',
        'Kelas berkumpulan (max 10 pelajar)',
        'Bahan pembelajaran digital',
        'Akses portal pelajar',
        'Sijil penyertaan'
      ]
    },
    {
      name: 'Pakej Pro',
      price: 'RM 89.90',
      period: 'sebulan',
      popular: true,
      features: [
        'Semua ciri Pakej Asas',
        '3 sesi seminggu',
        'Kelas kumpulan kecil (max 5 pelajar)',
        'Kelas tilawah asas',
        'Penilaian bulanan',
        'Sesi 1-on-1 bulanan',
        'Diskaun 10% barangan',
        'Akses seminar dakwah'
      ]
    },
    {
      name: 'Pakej Premium',
      price: 'RM 99.90',
      period: 'sebulan',
      popular: false,
      features: [
        'Semua ciri Pakej Pro',
        'Kelas individu (1-on-1)',
        'Jadual fleksibel',
        'Kelas tilawah lanjutan',
        'Penilaian setiap 2 minggu',
        'Bimbingan peribadi',
        'Diskaun 20% barangan',
        'Keahlian VIP seminar',
        'Sijil bertauliah'
      ]
    }
  ];

  return (
    <section id="packages" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2Q3YjMzZSIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Pakej Anda</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pilihan pakej yang sesuai dengan keperluan pembelajaran anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all transform hover:scale-105 ${
                pkg.popular
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/30'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  {pkg.name}
                </h3>
                <div className={`mb-2 ${pkg.popular ? 'text-black' : 'text-white'}`}>
                  <span className="text-5xl font-bold">{pkg.price}</span>
                </div>
                <p className={pkg.popular ? 'text-black/70' : 'text-gray-400'}>
                  {pkg.period}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-1 ${pkg.popular ? 'bg-black/20' : 'bg-yellow-500/20'}`}>
                      <Check className={pkg.popular ? 'text-black' : 'text-yellow-500'} size={16} />
                    </div>
                    <span className={pkg.popular ? 'text-black' : 'text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.open('https://wa.me/60183868296?text=Saya berminat dengan ' + pkg.name, '_blank')}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  pkg.popular
                    ? 'bg-black text-yellow-400 hover:bg-black/90'
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500'
                }`}
              >
                Pilih Pakej
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Tidak pasti pakej mana yang sesuai?
            <button
              onClick={() => window.open('https://wa.me/60183868296', '_blank')}
              className="text-yellow-500 hover:text-yellow-400 ml-2 font-semibold"
            >
              Hubungi kami untuk konsultasi percuma
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
