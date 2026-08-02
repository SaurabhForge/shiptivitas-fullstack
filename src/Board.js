import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog:    clients.filter(c => !c.status || c.status === 'backlog'),
        inProgress: clients.filter(c => c.status === 'in-progress'),
        complete:   clients.filter(c => c.status === 'complete'),
      },
    };
    this.swimlanes = {
      backlog:    React.createRef(),
      inProgress: React.createRef(),
      complete:   React.createRef(),
    };
  }

  getClients() {
    return [
      ['1',  'Stark, White and Abbott',           'Cloned Optimal Architecture',                        'in-progress'],
      ['2',  'Wiza LLC',                          'Exclusive Bandwidth-Monitored Implementation',        'complete'],
      ['3',  'Nolan LLC',                         'Vision-Oriented 4Thgeneration Graphicaluserinterface','backlog'],
      ['4',  'Thompson PLC',                      'Streamlined Regional Knowledgeuser',                  'in-progress'],
      ['5',  'Walker-Williamson',                 'Team-Oriented 6Thgeneration Matrix',                  'in-progress'],
      ['6',  'Boehm and Sons',                    'Automated Systematic Paradigm',                       'backlog'],
      ['7',  'Runolfsson, Hegmann and Block',      'Integrated Transitional Strategy',                    'backlog'],
      ['8',  'Schumm-Labadie',                    'Operative Heuristic Challenge',                       'backlog'],
      ['9',  'Kohler Group',                      'Re-Contextualized Multi-Tasking Attitude',            'backlog'],
      ['10', 'Romaguera Inc',                     'Managed Foreground Toolset',                          'backlog'],
      ['11', 'Reilly-King',                       'Future-Proofed Interactive Toolset',                  'complete'],
      ['12', 'Emard, Champlin and Runolfsdottir', 'Devolved Needs-Based Capability',                     'backlog'],
      ['13', 'Fritsch, Cronin and Wolff',         'Open-Source 3Rdgeneration Website',                   'complete'],
      ['14', 'Borer LLC',                         'Profit-Focused Incremental Orchestration',            'backlog'],
      ['15', 'Emmerich-Ankunding',                'User-Centric Stable Extranet',                        'in-progress'],
      ['16', 'Willms-Abbott',                     'Progressive Bandwidth-Monitored Access',              'in-progress'],
      ['17', 'Brekke PLC',                        'Intuitive User-Facing Customerloyalty',               'complete'],
      ['18', 'Bins, Toy and Klocko',              'Integrated Assymetric Software',                      'backlog'],
      ['19', 'Hodkiewicz-Hayes',                  'Programmable Systematic Securedline',                 'backlog'],
      ['20', 'Murphy, Lang and Ferry',            'Organized Explicit Access',                           'backlog'],
    ].map(r => ({ id: r[0], name: r[1], description: r[2], status: r[3] }));
  }

  getLaneKey(container) {
    if (container === this.swimlanes.backlog.current)    return 'backlog';
    if (container === this.swimlanes.inProgress.current) return 'inProgress';
    if (container === this.swimlanes.complete.current)   return 'complete';
    return null;
  }

  getStatusForKey(key) {
    return { backlog: 'backlog', inProgress: 'in-progress', complete: 'complete' }[key] || 'backlog';
  }

  async fetchClientsFromBackend() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/clients`);
      if (res.ok) {
        const data = await res.json();
        this.setState({
          clients: {
            backlog:    data.filter(c => !c.status || c.status === 'backlog'),
            inProgress: data.filter(c => c.status === 'in-progress'),
            complete:   data.filter(c => c.status === 'complete'),
          }
        });
      }
    } catch (e) {
      console.warn('Backend API unavailable, using local client store.', e);
    }
  }

  async updateBackendStatus(cardId, newStatus) {
    try {
      await fetch(`${API_BASE_URL}/api/clients/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Failed to sync status update with backend', e);
    }
  }

  componentDidMount() {
    this.fetchClientsFromBackend();

    const drake = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ]);

    drake.on('drop', (el, target, source, sibling) => {
      const cardId    = el.getAttribute('data-id');
      const srcKey    = this.getLaneKey(source);
      const tgtKey    = this.getLaneKey(target);
      if (!srcKey || !tgtKey) return;

      if (srcKey === tgtKey) {
        // Same lane reorder — sync state to new DOM order
        const newOrder = Array.from(target.children).map(n => n.getAttribute('data-id'));
        this.setState(prev => ({
          clients: {
            ...prev.clients,
            [srcKey]: newOrder.map(id => prev.clients[srcKey].find(c => c.id === id)).filter(Boolean),
          },
        }));
      } else {
        // Cross-lane move — cancel DOM change, let React re-render with new status
        drake.cancel(true);
        const newStatus = this.getStatusForKey(tgtKey);
        
        // Sync with backend API
        this.updateBackendStatus(cardId, newStatus);

        this.setState(prev => {
          const srcList = prev.clients[srcKey];
          const card    = srcList.find(c => c.id === cardId);
          if (!card) return null;
          const updated = { ...card, status: newStatus };
          const tgtList = [...prev.clients[tgtKey]];
          if (sibling) {
            const idx = tgtList.findIndex(c => c.id === sibling.getAttribute('data-id'));
            tgtList.splice(idx !== -1 ? idx : tgtList.length, 0, updated);
          } else {
            tgtList.push(updated);
          }
          return {
            clients: {
              ...prev.clients,
              [srcKey]: srcList.filter(c => c.id !== cardId),
              [tgtKey]: tgtList,
            },
          };
        });
      }
    });
  }

  render() {
    const q = (this.props.searchQuery || '').toLowerCase();
    const filter = list => q ? list.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) : list;

    return (
      <div className="flex gap-5 overflow-x-auto pb-4">
        <Swimlane
          name="Backlog"
          laneKey="backlog"
          clients={filter(this.state.clients.backlog)}
          dragulaRef={this.swimlanes.backlog}
          count={this.state.clients.backlog.length}
          countColor="bg-[#d3e4fe] text-[#0b1c30]"
        />
        <Swimlane
          name="In Progress"
          laneKey="in-progress"
          clients={filter(this.state.clients.inProgress)}
          dragulaRef={this.swimlanes.inProgress}
          count={this.state.clients.inProgress.length}
          countColor="bg-[#d8e2ff] text-[#004395]"
        />
        <Swimlane
          name="Complete"
          laneKey="complete"
          clients={filter(this.state.clients.complete)}
          dragulaRef={this.swimlanes.complete}
          count={this.state.clients.complete.length}
          countColor="bg-[#6ffbbe]/40 text-[#005236]"
        />
      </div>
    );
  }
}
