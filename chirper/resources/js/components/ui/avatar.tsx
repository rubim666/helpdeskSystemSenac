import type * as React from 'react';

import { cn } from '@/lib/utils';

function Avatar({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-500 to-orange-400 text-sm font-semibold text-white',
                className,
            )}
            {...props}
        />
    );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<'span'>) {
    return <span className={cn('uppercase', className)} {...props} />;
}

export { Avatar, AvatarFallback };