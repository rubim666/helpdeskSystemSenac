import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50',
    {
        variants: {
            variant: {
                default: 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 hover:scale-[1.02] hover:bg-amber-500',
                secondary: 'bg-stone-800 text-stone-100 hover:bg-stone-700',
                ghost: 'text-stone-200 hover:bg-stone-700/60',
                outline: 'border border-stone-600 bg-stone-800/40 text-stone-100 hover:bg-stone-700/60',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-lg px-3',
                lg: 'h-11 rounded-xl px-6 text-base',
                icon: 'size-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };


