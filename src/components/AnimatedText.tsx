import { motion } from 'motion/react';
interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({
  text,
  className = '',
}: AnimatedTextProps) {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`inline-block leading-relaxed whitespace-pre-wrap ${className}`}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {[...text].map((char, index) =>
        char === '\n' ? (
          <br key={index} />
        ) : (
          <motion.span key={index} variants={child}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      )}
    </motion.div>
  );
}
