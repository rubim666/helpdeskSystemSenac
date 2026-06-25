import { motion } from 'framer-motion';

import { OctopusMascot } from '@/components/mascot/octopus-mascot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmptyStateProps {
    title: string;
    description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="relative overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                    <OctopusMascot className="h-32 w-32" interactive />
                </CardContent>
            </Card>
        </motion.div>
    );
}

