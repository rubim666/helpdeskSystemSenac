import { motion } from 'framer-motion';

import { OctopusMascot } from '@/components/mascot/octopus-mascot';

export function LoadingOctopus() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 py-10">
            <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <OctopusMascot className="h-28 w-28" />
            </motion.div>
            <motion.p
                className="text-sm text-stone-300"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            >
                Sincronizando tentáculos de dados...
            </motion.p>
        </div>
    );
}