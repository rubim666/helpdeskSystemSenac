import { motion } from 'framer-motion';

import octalpus from '@/assets/octalpus.svg';
import { cn } from '@/lib/utils';

interface OctopusMascotProps {
    className?: string;
    interactive?: boolean;
}

export function OctopusMascot({ className, interactive = false }: OctopusMascotProps) {
    return (
        <motion.div
            className={cn('relative', className)}
            animate={{ y: [0, -8, 0], scale: [1, 1.015, 1] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            whileHover={interactive ? { scale: 1.03 } : undefined}
        >
            <motion.img
                src={octalpus}
                alt="Octalpus mascot"
                className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.45)]"
                animate={interactive ? { rotate: [0, 1.5, -1.5, 0] } : undefined}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
        </motion.div>
    );
}
