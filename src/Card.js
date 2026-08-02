import React from 'react';

const STATUS_META = {
  'backlog': {
    icon:      'hourglass_empty',
    label:     'Pending',
    iconColor: 'text-[#76777d]',
    badgeClass:'bg-[#d3e4fe] text-[#0b1c30]',
  },
  'in-progress': {
    icon:      'navigation',
    label:     'In Transit',
    iconColor: 'text-[#0058be]',
    badgeClass:'bg-[#d8e2ff] text-[#004395]',
  },
  'complete': {
    icon:      'task_alt',
    label:     'Delivered',
    iconColor: 'text-[#009668]',
    badgeClass:'bg-[#6ffbbe]/40 text-[#005236]',
  },
};

export default class Card extends React.Component {
  render() {
    const { id, name, description, status } = this.props;
    const meta = STATUS_META[status] || STATUS_META['backlog'];

    // Generate a short fake ticket ID from the numeric id
    const ticketId = `SHP-${String(4800 + parseInt(id, 10)).padStart(4, '0')}`;

    return (
      <div
        className="kanban-card p-4 rounded-xl border border-[#c6c6cd] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-grab active:cursor-grabbing"
        data-id={id}
        data-status={status}
      >
        {/* Ticket ID row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider">
            {ticketId}
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${meta.badgeClass}`}>
            {meta.label}
          </span>
        </div>

        {/* Company name */}
        <h4 className="text-[13px] font-semibold text-[#0b1c30] leading-snug mb-1">
          {name}
        </h4>

        {/* Description */}
        <p className="text-[12px] text-[#45464d] leading-snug line-clamp-2 mb-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#c6c6cd]/40">
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${meta.iconColor}`}>
            <span className="material-symbols-outlined text-[14px]">{meta.icon}</span>
            {meta.label}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#45464d]">
            <span className="material-symbols-outlined text-[13px]">calendar_month</span>
            <span>Oct {(parseInt(id, 10) % 28) + 1}</span>
          </div>
        </div>
      </div>
    );
  }
}