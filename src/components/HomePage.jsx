import { useState } from 'react';
import emailjs from '@emailjs/browser';
import rosePhoto from '/assets/img/Rose_Photo.png';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP = 'https://wa.me/639665633441';

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '50+', label: 'Families Protected' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '₱5M+', label: 'Claims Assisted' },
];

const WHY_CHOOSE = [
  {
    icon: '🎯',
    title: 'Personalised Strategies',
    desc: 'No cookie-cutter plans. Every recommendation is built around your income, goals, and family situation — not a generic template.',
  },
  {
    icon: '🏛️',
    title: 'Sun Life Backed',
    desc: 'Sun Life has been protecting Filipino families since 1895 — over 130 years of trust, stability, and proven financial strength.',
  },
  {
    icon: '🤝',
    title: 'Lifetime Partnership',
    desc: "My job doesn't end when you sign your policy. I'm with you through life changes, claims, and every financial milestone along the way.",
  },
];

const STEPS = [
  {
    number: '01',
    icon: '📅',
    title: 'Free Consultation',
    desc: "Book a no-obligation 30-minute session. We talk about where you are now, where you want to be, and what's standing in the way.",
  },
  {
    number: '02',
    icon: '📋',
    title: 'Financial Assessment',
    desc: 'I review your current situation — income, dependents, existing coverage, and future goals — to identify gaps and opportunities.',
  },
  {
    number: '03',
    icon: '📝',
    title: 'Your Personal Plan',
    desc: 'You receive a clear, actionable financial roadmap tailored to you — with the right products, amounts, and timeline to match your life.',
  },
];

const SERVICES = [
  {
    icon: '💼',
    title: 'Life Insurance',
    desc: 'Protect your loved ones with comprehensive life insurance coverage that ensures their financial security, no matter what happens.',
    items: ['Term Life Insurance', 'Whole Life Insurance', 'Variable Life Insurance'],
  },
  {
    icon: '📊',
    title: 'Investment Planning',
    desc: 'Build wealth for the future with strategic investment plans designed to help you reach your financial goals.',
    items: ['Mutual Funds', 'VUL Plans', 'Education Plans'],
  },
  {
    icon: '🏥',
    title: 'Health Insurance',
    desc: 'Safeguard your health and finances with comprehensive medical and critical illness coverage.',
    items: ['Medical Insurance', 'Critical Illness Coverage', 'Accident Insurance'],
  },
  {
    icon: '🏖️',
    title: 'Retirement Planning',
    desc: 'Prepare for a comfortable retirement with customised plans that ensure financial independence in your golden years.',
    items: ['Pension Plans', 'Retirement Funds', 'Annuities'],
  },
  {
    icon: '🎓',
    title: 'Education Planning',
    desc: "Secure your children's educational future with specialised savings and investment plans.",
    items: ['Education Insurance', 'College Savings Plans', 'Scholarship Programs'],
  },
  {
    icon: '🏠',
    title: 'Wealth Management',
    desc: 'Comprehensive financial strategies to grow, protect, and preserve your wealth for future generations.',
    items: ['Estate Planning', 'Asset Protection', 'Tax Planning'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Maria S.',
    location: 'Quezon City',
    quote:
      'Roselyn helped me set up a life insurance plan I could actually afford on my salary. When my husband was hospitalised last year, the critical illness benefit covered most of the bills. I don\'t know what we would have done without it.',
    service: 'Life & Health Insurance',
  },
  {
    name: 'Roberto T.',
    location: 'Makati',
    quote:
      'I always thought investing was only for rich people. Roselyn showed me how to start a VUL plan with an amount I was comfortable with. Three years in and I\'m already seeing my fund grow. She made it simple and never pressured me.',
    service: 'Investment Planning',
  },
  {
    name: 'Ana M.',
    location: 'Pasig',
    quote:
      'I have three kids and was worried about their college funds. Roselyn laid out an education plan that covers all three at different ages. She follows up regularly and I always feel like I\'m a priority, not just a client.',
    service: 'Education Planning',
  },
];

const FAQS = [
  {
    q: 'Do I need a big salary to start?',
    a: 'Not at all. Sun Life has plans starting from a few hundred pesos a month. The important thing is to start — even a small, consistent plan grows significantly over time. I\'ll find something that fits your current budget.',
  },
  {
    q: 'What is the difference between insurance and investment?',
    a: 'Insurance protects you from financial loss when something bad happens (death, illness, accident). Investment grows your money over time. A VUL (Variable Universal Life) plan combines both — you get life insurance coverage while also building an investment fund.',
  },
  {
    q: 'What is a VUL plan and is it safe?',
    a: 'A VUL is a life insurance policy with an investment component. Part of your premium goes to life coverage, part is invested in funds (equity, balanced, or bond funds). Like any investment, returns vary with the market — but Sun Life\'s fund managers actively manage the risk. It\'s best suited for long-term goals of 10 years or more.',
  },
  {
    q: 'How quickly can I make a claim if something happens?',
    a: 'Sun Life has a dedicated claims team and a straightforward process. For life insurance claims, the standard turnaround is 5–10 business days once all documents are submitted. I personally assist all my clients through the claims process to make it as smooth as possible.',
  },
  {
    q: 'Why Sun Life and not another insurance company?',
    a: 'Sun Life has been in the Philippines since 1895 — longer than most other insurers. It consistently receives top financial strength ratings and has paid out billions in claims. As an advisor, I chose Sun Life because I trust the products I recommend.',
  },
  {
    q: 'What happens during the free consultation?',
    a: 'We talk — that\'s it. No forms, no commitments, no pressure to buy anything. I ask about your situation, explain your options, and answer your questions. If you decide to move forward, great. If not, you still leave with useful financial knowledge.',
  },
];

const SERVICE_OPTIONS = [
  'Life Insurance',
  'Investment Planning',
  'Health Insurance',
  'Retirement Planning',
  'Education Planning',
  'Wealth Management',
  'Not sure yet',
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim() || !EMAIL_RE.test(email)) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          phone: phone,
          service: formData.service || 'Not specified',
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('send_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-yellow-100 text-sm font-semibold uppercase tracking-widest mb-3">
                Sun Life Certified Financial Advisor
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Roselyn Adanza
              </h1>
              <p className="text-2xl mb-6 text-yellow-100">
                Securing Futures, Building Dreams — One Family at a Time
              </p>
              <p className="text-lg mb-8 text-yellow-50">
                Helping Filipino families achieve financial security and peace of mind through personalised insurance, investment, and financial planning solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors shadow-lg"
                >
                  Book a Free Consultation
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-3xl"></div>
                <img
                  src={rosePhoto}
                  alt="Roselyn Adanza — Sun Life Financial Advisor"
                  className="relative rounded-full w-80 h-80 object-cover border-8 border-white shadow-2xl"
                  width="320"
                  height="320"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold text-orange-500 mb-1">{value}</p>
                <p className="text-gray-600 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                As a Sun Life Financial Advisor based in Dumaguete City, I am dedicated to helping families and individuals in Negros Oriental build a stronger financial future. I specialise in creating personalised financial strategies that align with your goals, your income, and your family's needs.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                My approach is built on trust, transparency, and a genuine care for the people I work with. Whether you're planning for retirement, protecting your family's future, or investing for your children's education, I'm here to guide you every step of the way.
              </p>
              <div className="space-y-4">
                {[
                  'Sun Life Certified Financial Advisor',
                  '2+ Years Industry Experience',
                  '50+ Satisfied Clients in Negros Oriental',
                  'Specialist in Family & OFW Financial Planning',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ✓
                    </div>
                    <p className="ml-4 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To empower every family in Dumaguete and Negros Oriental with the knowledge and tools needed to achieve financial independence and security, while building lasting relationships based on integrity and genuine care.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-orange-600 font-semibold text-xl">
                  "Financial security isn't just about numbers — it's about peace of mind and the freedom to live your best life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              There are many financial advisors out there. Here's what makes working with me different.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_CHOOSE.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Getting started is simple. Here's what the journey looks like from first contact to having your plan in hand.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {STEPS.map(({ number, icon, title, desc }, i) => (
              <div key={title} className="text-center relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-3xl mb-6 shadow-lg">
                  {icon}
                </div>
                <div className="absolute top-8 left-3/4 w-1/2 h-0.5 bg-orange-200 hidden md:block" style={{ display: i === 2 ? 'none' : undefined }} />
                <p className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-2">Step {number}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg text-lg"
            >
              Start with a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your unique needs and goals
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ icon, title, desc, items }) => (
              <div key={title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl mb-6">
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-2 text-gray-600">
                  {items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Real stories from real families who took control of their financial future.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(({ name, location, quote, service }) => (
              <div key={name} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl shadow-md flex flex-col">
                <div className="text-orange-400 text-4xl mb-4">"</div>
                <p className="text-gray-700 leading-relaxed flex-1 mb-6">{quote}</p>
                <div className="border-t border-orange-200 pt-4">
                  <p className="font-bold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{location}</p>
                  <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                    {service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700">
              Answers to the questions I hear most often from new clients.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-900 hover:bg-orange-50 transition-colors"
                >
                  <span>{q}</span>
                  <span className="ml-4 text-orange-500 text-xl flex-shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions? I'm happy to answer them directly.</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              💬 Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ready to take control of your financial future? Let's start the conversation today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="juan@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    placeholder="+63 912 345 6789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I'm interested in</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Select a service...</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                    placeholder="Tell me about your financial goals or any questions you have..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                    Message sent! Rose will be in touch with you shortly.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    Please fill in all required fields and provide a valid email address.
                  </div>
                )}
                {submitStatus === 'send_error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    Something went wrong sending your message. Please try WhatsApp or email directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>

                <p className="text-center text-gray-500 text-sm">or</p>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  💬 Message me on WhatsApp
                </a>
              </div>
            </form>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl">📧</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <a href="mailto:adanza921@gmail.com" className="text-lg text-gray-900 hover:text-orange-500 transition-colors">
                      adanza921@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl">📱</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Phone / WhatsApp</p>
                    <a href="tel:+639665633441" className="text-lg text-gray-900 hover:text-orange-500 transition-colors block">
                      +63 966 563 3441
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:text-green-700 font-medium">
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl">📍</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Office</p>
                    <p className="text-lg text-gray-900">Sun Life Financial Center<br />Pasig, Philippines</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-orange-200">
                <p className="text-gray-700 mb-4 font-medium">Office Hours</p>
                <p className="text-gray-600">Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM – 3:00 PM</p>
                <p className="text-gray-600">Sunday: By Appointment</p>
              </div>
              <div className="mt-6 pt-6 border-t border-orange-200">
                <p className="text-gray-700 mb-3 font-medium">Response Time</p>
                <p className="text-gray-600 text-sm">
                  I aim to respond to all enquiries within <strong>24 hours</strong>. For urgent matters, WhatsApp is the fastest way to reach me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-bold text-lg mb-2">Roselyn Adanza</p>
              <p className="text-yellow-100 text-sm">Sun Life Financial Advisor<br />Pasig, Philippines</p>
            </div>
            <div>
              <p className="font-bold mb-2">Quick Links</p>
              <div className="space-y-1 text-yellow-100 text-sm">
                <a href="#about" className="block hover:text-white transition-colors">About</a>
                <a href="#services" className="block hover:text-white transition-colors">Services</a>
                <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <p className="font-bold mb-2">Get in Touch</p>
              <div className="space-y-1 text-yellow-100 text-sm">
                <a href="mailto:adanza921@gmail.com" className="block hover:text-white transition-colors">adanza921@gmail.com</a>
                <a href="tel:+639665633441" className="block hover:text-white transition-colors">+63 966 563 3441</a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="border-t border-yellow-300 pt-6 text-center">
            <p className="text-sm text-yellow-100 mb-1">
              Roselyn Adanza is a licensed Sun Life Financial Advisor. Insurance products are underwritten by Sun Life of the Philippines Assurance Corporation.
            </p>
            <p className="text-sm font-medium">&copy; 2026 Roselyn Adanza — Building Brighter Futures Together</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 text-2xl"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
