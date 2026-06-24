import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardContent>
                        <Skeleton className="mb-3 h-4 w-2/5" />
                        <Skeleton className="mb-3 h-7 w-1/3" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

