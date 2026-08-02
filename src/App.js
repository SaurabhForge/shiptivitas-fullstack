import React, { Component } from 'react';
import Board from './Board';
import AnalyticsTab from './AnalyticsTab';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'shipping-requests',
      searchQuery: '',
    };
  }

  renderTabContent() {
    switch (this.state.selectedTab) {
      case 'home':
        return (
          <div className="bg-white p-8 rounded-xl border border-[#c6c6cd] shadow-sm">
            <h2 className="text-2xl font-bold text-[#0b1c30] mb-2">Welcome to Shiptivitas</h2>
            <p className="text-sm text-[#45464d]">
              Manage shipping requests, track task priorities, and analyze team productivity.
            </p>
          </div>
        );
      case 'analytics':
        return <AnalyticsTab />;
      case 'shipping-requests':
      default:
        return (
          <>
            {/* Page heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0b1c30]">Shipping Requests</h2>
                <p className="text-sm text-[#45464d] mt-1">Manage incoming shipping requests using Kanban workflow.</p>
              </div>
              <div className="flex items-center gap-2">
                <ActionBtn icon="filter_list" label="Filter" />
                <ActionBtn icon="sort" label="Sort" />
                <ActionBtn icon="file_download" label="Export" />
              </div>
            </div>

            {/* KPI Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <KpiCard icon="all_inbox"      label="Total Requests"  value="1,284" badge="+12% vs LY"  badgeColor="green" />
              <KpiCard icon="check_circle"   label="Completed Today" value="42"    badge="On Track"   badgeColor="green" />
              <KpiCard icon="pending"        label="In Progress"     value="156"   badge="Active"     badgeColor="blue"  />
              <KpiCard icon="hourglass_empty"label="Backlog"         value="89"    badge="Critical"   badgeColor="red"   />
              <KpiCard icon="trending_up"    label="Completion Rate" value="94.2%" progress={94}      badgeColor="none"  />
            </div>

            {/* Kanban Board */}
            <Board searchQuery={this.state.searchQuery} />
          </>
        );
    }
  }

  render() {
    return (
      <div className="flex min-h-screen bg-[#f8f9ff]">

        {/* ── Sidebar ── */}
        <nav className="fixed left-0 top-0 h-full w-[240px] flex flex-col bg-white border-r border-[#c6c6cd] z-50">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#131b2e] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[22px]">local_shipping</span>
            </div>
            <div>
              <h1 className="text-[16px] font-bold text-[#0b1c30] leading-tight">Shiptivitas</h1>
              <p className="text-[11px] text-[#45464d] opacity-70">Productivity Platform</p>
            </div>
          </div>

          {/* Nav items */}
          <div className="flex-1 px-4 space-y-1 overflow-y-auto">
            <NavItem icon="dashboard" label="Dashboard"
              active={this.state.selectedTab === 'home'}
              onClick={() => this.setState({ selectedTab: 'home' })} />
            <NavItem icon="local_shipping" label="Shipping Requests"
              active={this.state.selectedTab === 'shipping-requests'}
              onClick={() => this.setState({ selectedTab: 'shipping-requests' })} />
            <NavItem icon="analytics" label="Analytics"
              active={this.state.selectedTab === 'analytics'}
              onClick={() => this.setState({ selectedTab: 'analytics' })} />
            <NavItem icon="archive" label="Archive"
              active={false}
              onClick={() => {}} />
            <NavItem icon="settings" label="Settings"
              active={false}
              onClick={() => {}} />
          </div>

          {/* User profile at bottom */}
          <div className="p-4 border-t border-[#c6c6cd]">
            <NavItem icon="account_circle" label="User Profile" active={false} onClick={() => {}} />
          </div>
        </nav>

        {/* ── Main area ── */}
        <div className="ml-[240px] flex-1 flex flex-col">

          {/* ── Top Header ── */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 bg-white border-b border-[#c6c6cd] shadow-sm">
            {/* Search */}
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d] text-[20px]">search</span>
              <input
                className="w-full bg-[#eff4ff] border-none rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0058be]/20"
                placeholder="Search shipments..."
                type="text"
                value={this.state.searchQuery}
                onChange={e => this.setState({ searchQuery: e.target.value })}
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 ml-4">
              <button className="bg-[#0b1c30] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                + New Request
              </button>
              <div className="flex items-center gap-1 pl-3 border-l border-[#c6c6cd]">
                <button className="p-2 rounded-full hover:bg-[#e5eeff] transition-colors relative">
                  <span className="material-symbols-outlined text-[#45464d] text-[20px]">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 rounded-full hover:bg-[#e5eeff] transition-colors">
                  <span className="material-symbols-outlined text-[#45464d] text-[20px]">help</span>
                </button>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#d3e4fe] border border-[#c6c6cd] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0b1c30] text-[20px]">person</span>
              </div>
            </div>
          </header>

          {/* ── Page content ── */}
          <main className="flex-1 p-8 space-y-6">
            {this.renderTabContent()}
          </main>
        </div>

        {/* ── Floating Action Button ── */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="flex items-center gap-2 bg-[#0b1c30] text-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
            <span className="material-symbols-outlined">add</span>
            <span className="text-sm font-semibold max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">New Request</span>
          </button>
        </div>
      </div>
    );
  }
}

/* ── Small reusable components ── */

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left
        ${active
          ? 'bg-[#2170e4] text-white'
          : 'text-[#45464d] hover:bg-[#eff4ff]'}`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {label}
    </button>
  );
}

function ActionBtn({ icon, label }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm text-[#45464d] hover:bg-[#eff4ff] transition-colors">
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {label}
    </button>
  );
}

function KpiCard({ icon, label, value, badge, badgeColor, progress }) {
  const badgeStyles = {
    green: 'bg-[#6ffbbe]/30 text-[#005236]',
    blue:  'bg-[#d8e2ff] text-[#004395]',
    red:   'bg-[#ffdad6] text-[#93000a]',
    none:  '',
  };
  return (
    <div className="bg-white p-4 rounded-xl border border-[#c6c6cd] shadow-sm flex flex-col justify-between hover:border-[#0058be] transition-colors group">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-[#45464d] opacity-60 font-semibold">{label}</span>
        <span className="material-symbols-outlined text-[#76777d] text-[20px] group-hover:text-[#0058be] transition-colors">{icon}</span>
      </div>
      <div className="mt-2">
        <h4 className="text-2xl font-bold text-[#0b1c30]">{value}</h4>
        {badge && (
          <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        )}
        {progress !== undefined && (
          <div className="w-full bg-[#dce9ff] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#0058be] h-full rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
