import React from 'react';
import Card from './Card';

export default class Swimlane extends React.Component {
  render() {
    const { name, laneKey, clients, dragulaRef, count, countColor } = this.props;

    const cards = clients.map(client => (
      <Card
        key={client.id}
        id={client.id}
        name={client.name}
        description={client.description}
        status={client.status}
      />
    ));

    return (
      <div
        className="Swimlane-column flex-shrink-0 w-[340px] bg-[#eff4ff] rounded-xl flex flex-col p-4"
        data-lane={laneKey}
      >
        {/* Column header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-[#0b1c30]">{name}</h3>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${countColor}`}>
              {count}
            </span>
          </div>
          <button className="p-1 hover:bg-[#dce9ff] rounded transition-colors">
            <span className="material-symbols-outlined text-[#45464d] text-[20px]">more_horiz</span>
          </button>
        </div>

        {/* Drag column */}
        <div
          className="Swimlane-dragColumn swimlane-scroll flex-1 space-y-3 overflow-y-auto"
          style={{ minHeight: 120, maxHeight: 'calc(100vh - 420px)' }}
          ref={dragulaRef}
        >
          {cards}
        </div>

        {/* Add card button */}
        <button className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#45464d] hover:bg-[#dce9ff] transition-colors border border-dashed border-[#c6c6cd]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add card
        </button>
      </div>
    );
  }
}
