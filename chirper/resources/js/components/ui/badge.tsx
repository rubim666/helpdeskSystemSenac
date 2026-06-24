import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'border-amber-400/30 bg-amber-600/15 text-amber-200',
                success: 'border-emerald-300/30 bg-emerald-500/15 text-emerald-200',
                warning: 'border-amber-300/30 bg-amber-500/15 text-amber-200',
                danger: 'border-rose-300/30 bg-rose-500/15 text-rose-200',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };