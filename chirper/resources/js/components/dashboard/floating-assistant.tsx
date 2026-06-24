import { motion } from 'framer-motion';
import { MessageCircleMore } from 'lucide-react';

import { OctopusMascot } from '@/components/mascot/octopus-mascot';

export function FloatingAssistant() {
    return (
        <motion.div
            className="fixed bottom-5 right-5 z-40 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.04 }}
        >
            <div className="glass-panel brand-glow flex items-center gap-3 rounded-2xl px-3 py-2">
                <OctopusMascot className="h-14 w-14" interactive />
                <div className="pr-2">
                    <p className="text-xs text-stone-300">Assistente Octopus</p>
                    <p className="text-sm font-medium text-white">Posso resumir seus chamados</p>
                </div>
                <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-xl bg-amber-600/25 text-amber-100 transition-all hover:bg-amber-600/45"
                >
                    <MessageCircleMore className="size-4" />
                </button>
            </div>
        </motion.div>
    );
}


