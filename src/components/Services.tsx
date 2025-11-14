import { BookOpen, Mic, Users, ShoppingBag } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: BookOpen,
      title: 'Kelas Al-Quran',
      description: 'Belajar membaca Al-Quran dengan tajwid yang betul dari asas hingga mahir.',
      features: ['Bacaan Asas', 'Tajwid', 'Makharijul Huruf', 'Kelas Individu & Kumpulan']
    },
    {
      icon: Mic,
      title: 'Kelas Tilawah',
      description: 'Pelajari seni tilawah Al-Quran dengan bimbingan guru berpengalaman.',
      features: ['Teknik Tilawah', 'Lagu-lagu Tilawah', 'Persembahan', 'Sijil Pengiktirafan']
    },
    {
      icon: Users,
      title: 'Seminar Dakwah',
      description: 'Sertai seminar dan program dakwah untuk memperdalam ilmu agama.',
      features: ['Kuliah Agama', 'Majlis Ilmu', 'Program Motivasi', 'Slot Q&A']
    },
    {
      icon: ShoppingBag,
      title: 'Barangan Islam',
      description: 'Pelbagai barangan dan pakaian Islam berkualiti tinggi untuk keluarga.',
      features: ['Pakaian Muslim', 'Telekung', 'Tudung', 'Aksesori']
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Perkhidmatan <span className="text-yellow-600">Kami</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan pelbagai perkhidmatan untuk membantu anda dalam perjalanan pembelajaran Al-Quran
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-500 transition-all hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="text-white" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
