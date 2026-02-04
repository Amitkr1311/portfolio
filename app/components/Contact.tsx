import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  const contactInfoItems = [
    {
      icon: Mail,
      label: 'Email',
      value: '1311amitkr@gmail.com',
      href: 'mailto:1311amitkr@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9060053989',
      href: 'tel:+919060053989',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-cyan-50/20 dark:via-blue-950/20 dark:to-cyan-950/10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full">
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                Get In Touch
              </p>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Let's Create Something
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Drop me a message and let's discuss your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Why Reach Out?
              </h3>
              <ul className="space-y-3">
                {[
                  'Project consultation',
                  'Collaboration opportunities',
                  'Technical discussions',
                  'Job inquiries',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 text-slate-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6 p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={formFieldVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-900 dark:text-gray-200 mb-3"
                >
                  Full Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-900 dark:text-gray-200 mb-3"
                >
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="john@example.com"
                />
              </motion.div>
            </div>

            <motion.div variants={formFieldVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-900 dark:text-gray-200 mb-3"
              >
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.div variants={formFieldVariants} className="flex items-center gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isLoading || isSubmitted}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-400 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 disabled:shadow-none flex items-center justify-center gap-2 min-w-max"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send size={18} />
                    </motion.div>
                  </>
                )}
              </motion.button>

              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-600 dark:text-green-400 font-medium"
                >
                  Thanks! I'll get back to you soon.
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-slate-600 dark:text-gray-400"
        >
          <p className="mb-2">Looking forward to connecting with you!</p>
          <p className="text-sm">&copy; 2026 Amit Kumar. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}

