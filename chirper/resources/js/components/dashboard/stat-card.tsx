import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardMetric } from '@/types/helpdesk';

interface StatCardProps {
    metric: DashboardMetric;
    index: number;
}

export function StatCard({ metric, index }: StatCardProps) {
    const isPositive = metric.growth >= 0;
    const max = Math.max(...metric.trend);

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.35 }}
        >
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-sm text-stone-300">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', isPositive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-rose-500/15 text-rose-200')}>
                            {isPositive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                            {Math.abs(metric.growth).toFixed(1)}%
                        </span>
                    </div>
                    <div className="flex h-10 items-end gap-1">
                        {metric.trend.map((point, trendIndex) => (
                            <motion.div
                                key={`${metric.key}-${trendIndex}`}
                                className="w-full rounded-sm bg-gradient-to-t from-amber-600/80 to-orange-400/80"
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(16, (point / max) * 100)}%` }}
                                transition={{ delay: 0.35 + trendIndex * 0.03, duration: 0.25 }}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}


