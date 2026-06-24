import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                'peer size-5 shrink-0 rounded-md border border-stone-500 bg-stone-800/70 shadow-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-amber-500/50 data-[state=checked]:border-amber-400 data-[state=checked]:bg-amber-600',
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
                <Check className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };


