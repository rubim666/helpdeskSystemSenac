import { motion } from 'framer-motion';

const bubbles = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    size: 8 + (index % 5) * 6,
    left: `${(index * 7.3) % 100}%`,
    duration: 10 + (index % 4) * 4,
    delay: index * 0.6,
}));

export function FloatingBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className="octopus-grid absolute inset-0 opacity-30"
                animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
                transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            />
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,119,6,0.22),transparent_48%),radial-gradient(circle_at_80%_15%,rgba(194,85,58,0.15),transparent_40%)]"
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
            {bubbles.map((bubble) => (
                <span
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: bubble.left,
                        bottom: '-30px',
                        animationDuration: `${bubble.duration}s`,
                        animationDelay: `${bubble.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}


