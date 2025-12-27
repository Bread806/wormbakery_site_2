import { motion } from 'framer-motion';
import { Twitter, Youtube, Instagram, Twitch, Music, Mail } from 'lucide-react';

const OfficialSNS = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      handle: '@cyberpop_artist',
      description: 'Daily updates, art posts, and community interactions',
      color: 'neon-cyan',
      url: 'https://twitter.com',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      handle: 'CyberPop Channel',
      description: 'Speedpaints, tutorials, and behind-the-scenes content',
      color: 'neon-pink',
      url: 'https://youtube.com',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@cyberpop.art',
      description: 'Portfolio highlights and daily art inspiration',
      color: 'neon-lime',
      url: 'https://instagram.com',
    },
    {
      name: 'Twitch',
      icon: Twitch,
      handle: 'CyberPopLive',
      description: 'Live drawing sessions and gaming streams',
      color: 'neon-cyan',
      url: 'https://twitch.tv',
    },
    {
      name: 'TikTok',
      icon: Music,
      handle: '@cyberpop.creates',
      description: 'Quick art tips and fun creative challenges',
      color: 'neon-pink',
      url: 'https://tiktok.com',
    },
    {
      name: 'Email',
      icon: Mail,
      handle: 'contact@cyberpop.art',
      description: 'For commissions and business inquiries',
      color: 'neon-lime',
      url: 'mailto:contact@cyberpop.art',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-neon-pink">Follow </span>
            <span className="text-neon-cyan">Me</span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join the cyber-pop community! Connect with me across various platforms for updates, exclusive content, and creative adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glass-card p-8 rounded-2xl border-2 border-${social.color} hover:shadow-neon-${social.color} transition-all duration-300 group`}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <social.icon className={`w-16 h-16 text-${social.color} group-hover:scale-110 transition-transform`} />
              </motion.div>

              <h2 className={`text-2xl font-black text-${social.color} mb-2`}>
                {social.name}
              </h2>

              <p className="text-white/60 text-sm mb-3 font-mono">
                {social.handle}
              </p>

              <p className="text-white/80 leading-relaxed">
                {social.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                <span>Visit Profile</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-2xl border-2 border-neon-pink text-center"
        >
          <h2 className="text-3xl font-black text-neon-pink mb-4">
            Stay Connected!
          </h2>

          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Don't miss out on exclusive content, early access to new works, and community events. Follow me on your favorite platform and become part of the cyber-pop family!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-neon-cyan bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 font-bold"
            >
              Join Discord Community
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-neon-lime bg-neon-lime/20 text-neon-lime hover:bg-neon-lime hover:text-black transition-all duration-300 font-bold"
            >
              Subscribe to Newsletter
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            All social media links are official. Beware of impersonators!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OfficialSNS;
