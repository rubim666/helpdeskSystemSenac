import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { HelpdeskTicket } from '@/types/helpdesk';

function priorityVariant(priority: HelpdeskTicket['prioridade']) {
    if (priority === 'muito alta' || priority === 'alta') {
        return 'danger';
    }

    if (priority === 'media') {
        return 'warning';
    }

    return 'default';
}

export function AnimatedTable({ rows }: { rows: HelpdeskTicket[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Chamados recentes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-xs uppercase tracking-wide text-stone-400">
                            <tr>
                                <th className="px-3 py-2 font-medium">Título</th>
                                <th className="px-3 py-2 font-medium">Categoria</th>
                                <th className="px-3 py-2 font-medium">Prioridade</th>
                                <th className="px-3 py-2 font-medium">Status</th>
                                <th className="px-3 py-2 font-medium">Responsável</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-700/60">
                            {rows.map((row, index) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.07 }}
                                    className="hover:bg-stone-800/45"
                                >
                                    <td className="px-3 py-3 text-stone-100">{row.titulo}</td>
                                    <td className="px-3 py-3 text-stone-300">{row.categoria}</td>
                                    <td className="px-3 py-3">
                                        <Badge variant={priorityVariant(row.prioridade)}>{row.prioridade}</Badge>
                                    </td>
                                    <td className="px-3 py-3 capitalize text-stone-200">{row.status}</td>
                                    <td className="px-3 py-3 text-stone-300">{row.responsavel ?? 'A definir'}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}


