import type * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'glass-panel rounded-2xl border border-stone-500/35 p-5 text-stone-100',
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
    return <h3 className={cn('text-base font-semibold tracking-tight text-white', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
    return <p className={cn('text-sm text-stone-300', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('space-y-4', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };


