import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            className={cn(
                'flex h-11 w-full rounded-xl border border-stone-600 bg-stone-900/50 px-3 text-sm text-white outline-none transition-all placeholder:text-stone-400 focus:border-amber-500/60 focus:shadow-[0_0_0_4px_rgba(217,119,6,0.14)]',
                className,
            )}
            {...props}
        />
    );
}

export { Input };


