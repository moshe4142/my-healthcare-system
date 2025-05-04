'use client';
import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-white p-6 sm:p-12 text-[#0D47A1]">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">📞 Contact Us</h1>

        <p className="text-lg mb-4">
          Have questions, feedback, or need assistance? Our support team is here to help you.
          Whether you're a new customer, a returning user, or just want to say hello — we'd love to hear from you!
        </p>

        <div className="text-md space-y-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">📧 Email Support</h2>
            <p>support@firemaster.com — Send us a message and we’ll get back to you within 24 hours.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📞 Phone Support</h2>
            <p>+1 234 567 8900 — Available Sunday to Thursday, 9:00 AM – 5:00 PM.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📍 Office Location</h2>
            <p>123 Firemaster Avenue, Tel Aviv, Israel</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">🕒 Working Hours</h2>
            <ul className="list-disc list-inside">
              <li>Sunday – Thursday: 9:00 AM to 5:00 PM</li>
              <li>Friday: 9:00 AM to 12:00 PM</li>
              <li>Saturday: Closed</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">🌐 Social Media</h2>
            <p>
              Follow us on Instagram, Facebook and Twitter to stay updated with news and offers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">💬 Live Chat</h2>
            <p>
              Our live chat is available on the bottom right corner of the screen during working hours.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-bold mb-3">Looking for technical support?</h2>
          <p className="text-md">
            If you're experiencing issues with our products or website, visit our <a href="/help-center" className="text-blue-700 underline">Help Center</a> or contact our technical team directly at <strong>tech@firemaster.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
