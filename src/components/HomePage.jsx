import React, { useState } from 'react';
import rosePhoto from '/assets/img/Rose_Photo.png';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.message) {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Roselyn Adanza
              </h1>
              <p className="text-2xl mb-6 text-yellow-100">
                Sun Life Financial Advisor | Customer Service Representative
              </p>
              <p className="text-lg mb-8 text-yellow-50">
                Helping families and individuals achieve financial security and peace of mind through comprehensive financial planning and insurance solutions.
              </p>
              <a 
                href="#contact" 
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors shadow-lg"
              >
                Get in Touch
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-3xl"></div>
                <img 
                  src={rosePhoto}
                  alt="Financial Advisor" 
                  className="relative rounded-full w-80 h-80 object-cover border-8 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With over 10 years of experience in the financial services industry, I am dedicated to helping individuals and families build a brighter financial future. As a certified Sun Life Financial Advisor, I specialize in creating personalized financial strategies that align with your goals and values.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                My approach is built on trust, transparency, and a deep understanding of your unique needs. Whether you're planning for retirement, protecting your family's future, or building wealth, I'm here to guide you every step of the way.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="ml-4 text-gray-700">Certified Financial Planner</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="ml-4 text-gray-700">10+ Years Industry Experience</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <p className="ml-4 text-gray-700">500+ Satisfied Clients</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To empower every client with the knowledge and tools needed to achieve financial independence and security, while building lasting relationships based on integrity and excellence.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-orange-600 font-semibold text-xl mb-2">
                  "Financial security isn't just about numbers—it's about peace of mind and the freedom to live your best life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your unique needs and goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                💼
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Life Insurance</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Protect your loved ones with comprehensive life insurance coverage that ensures their financial security, no matter what happens.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Term Life Insurance</li>
                <li>• Whole Life Insurance</li>
                <li>• Variable Life Insurance</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Planning</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Build wealth for the future with strategic investment plans designed to help you reach your financial goals.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Mutual Funds</li>
                <li>• VUL Plans</li>
                <li>• Education Plans</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🏥
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Insurance</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safeguard your health and finances with comprehensive medical and critical illness coverage.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Medical Insurance</li>
                <li>• Critical Illness Coverage</li>
                <li>• Accident Insurance</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🏖️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Retirement Planning</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Prepare for a comfortable retirement with customized plans that ensure financial independence in your golden years.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Pension Plans</li>
                <li>• Retirement Funds</li>
                <li>• Annuities</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Education Planning</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Secure your children's educational future with specialized savings and investment plans.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Education Insurance</li>
                <li>• College Savings Plans</li>
                <li>• Scholarship Programs</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🏠
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wealth Management</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Comprehensive financial strategies to grow, protect, and preserve your wealth for future generations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Estate Planning</li>
                <li>• Asset Protection</li>
                <li>• Tax Planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ready to take control of your financial future? Let's start the conversation today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="juan@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+63 912 345 6789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell me about your financial goals..."
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                    📧
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <p className="text-lg text-gray-900">adanza921@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                    📱
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Phone</p>
                    <p className="text-lg text-gray-900">+63 966 563 3441</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                    📍
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 font-medium">Office</p>
                    <p className="text-lg text-gray-900">Sun Life Financial Center<br/>Pasig, Philippines</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-orange-200">
                <p className="text-gray-700 mb-4 font-medium">Office Hours</p>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 3:00 PM</p>
                <p className="text-gray-600">Sunday: By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">&copy; 2026 Roselyn Adanza - Sun Life Financial Advisor</p>
          <p className="mt-2 text-yellow-100">Building Brighter Futures Together</p>
        </div>
      </footer>
    </div>
  );
}
