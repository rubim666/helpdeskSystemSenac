import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('animate-pulse rounded-xl bg-gradient-to-r from-stone-700/60 to-stone-600/40', className)}
            {...props}
        />
    );
}

export { Skeleton };