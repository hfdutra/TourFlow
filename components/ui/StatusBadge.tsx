import React from 'react';
import { Badge } from './Badge';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusVariant = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
      case 'confirmed':
      case 'paid':
      case 'success':
      case 'read':
      case 'delivered':
        return 'success';
      case 'pending':
      case 'draft':
      case 'scheduled':
      case 'partially_paid':
      case 'invited':
        return 'warning';
      case 'cancelled':
      case 'failed':
      case 'inactive':
      case 'blocked':
      case 'voided':
      case 'overdue':
      case 'disabled':
        return 'danger';
      case 'completed':
      case 'archived':
      case 'refunded':
        return 'default';
      default:
        return 'info';
    }
  };

  const getLabel = (status: string) => {
    // Simple translation map for common statuses
    const labels: Record<string, string> = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      paid: 'Pago',
      cancelled: 'Cancelado',
      active: 'Ativo',
      inactive: 'Inativo',
      draft: 'Rascunho',
      scheduled: 'Agendada',
      completed: 'Concluído',
      partially_paid: 'Parcial',
      read: 'Lida',
      delivered: 'Entregue',
      sent: 'Enviada',
      refunded: 'Reembolsado',
      voided: 'Anulada',
      overdue: 'Vencida',
      failed: 'Falhou',
      maintenance: 'Manutenção',
      invited: 'Convidado',
      disabled: 'Desativado'
    };
    
    return labels[status.toLowerCase()] || status;
  };

  return (
    <Badge variant={getStatusVariant(status)} className={className}>
      {getLabel(status)}
    </Badge>
  );
};