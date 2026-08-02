import React from 'react';

export default function AnalyticsTab() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Header ── */}
      <div>
        <h2 className="text-2xl font-bold text-[#0b1c30]">Feature Release Analytics</h2>
        <p className="text-sm text-[#45464d] mt-1">
          Evaluating the impact of the new Kanban board release on task completions and daily user engagement.
        </p>
      </div>

      {/* ── Key Impact Metrics Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Completion Rate Target"
          value="+18.4%"
          subtext="Target was +15.0%"
          status="Target Exceeded"
          statusColor="bg-[#6ffbbe]/40 text-[#005236]"
          icon="trending_up"
        />
        <MetricCard
          title="Daily Active Users (DAU)"
          value="4,820"
          subtext="+22.5% increase post-launch"
          status="High Growth"
          statusColor="bg-[#d8e2ff] text-[#004395]"
          icon="group"
        />
        <MetricCard
          title="Avg Cycle Time"
          value="3.2 Days"
          subtext="Down from 5.1 days"
          status="37% Faster"
          statusColor="bg-[#6ffbbe]/40 text-[#005236]"
          icon="timer"
        />
        <MetricCard
          title="Drag & Drop Actions"
          value="14,290"
          subtext="Total status transitions"
          status="High Engagement"
          statusColor="bg-[#d3e4fe] text-[#0b1c30]"
          icon="touch_app"
        />
      </div>

      {/* ── Swimlane Distribution & Release Impact Breakdown ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl border border-[#c6c6cd] shadow-sm">
          <h3 className="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0058be]">pie_chart</span>
            Current Swimlane Status Breakdown
          </h3>
          <div className="space-y-4">
            <ProgressBar label="Completed Tasks" percentage={45} count="9 Tasks" color="bg-[#22c55e]" />
            <ProgressBar label="In Progress Tasks" percentage={30} count="6 Tasks" color="bg-[#3b82f6]" />
            <ProgressBar label="Backlog Tasks" percentage={25} count="5 Tasks" color="bg-[#94a3b8]" />
          </div>
          <div className="mt-6 pt-4 border-t border-[#c6c6cd]/50 text-xs text-[#45464d]">
            💡 <strong>Insight:</strong> 45% of tasks are moving all the way to 'Complete' vs 27% before the drag-and-drop release.
          </div>
        </div>

        {/* Before vs After Impact */}
        <div className="bg-white p-6 rounded-xl border border-[#c6c6cd] shadow-sm">
          <h3 className="text-base font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0058be]">compare_arrows</span>
            Before vs After Kanban Board Release
          </h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[#c6c6cd] text-xs font-semibold text-[#45464d] uppercase">
                <th className="pb-2">Metric</th>
                <th className="pb-2">Before Update</th>
                <th className="pb-2">After Update</th>
                <th className="pb-2 text-right">Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6c6cd]/30 text-xs">
              <tr>
                <td className="py-2.5 font-medium text-[#0b1c30]">Tasks Marked Done</td>
                <td className="py-2.5 text-[#76777d]">240 / week</td>
                <td className="py-2.5 text-[#0b1c30] font-semibold">284 / week</td>
                <td className="py-2.5 text-right font-bold text-[#005236]">+18.3%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#0b1c30]">Status Changes / User</td>
                <td className="py-2.5 text-[#76777d]">1.2 / day</td>
                <td className="py-2.5 text-[#0b1c30] font-semibold">3.8 / day</td>
                <td className="py-2.5 text-right font-bold text-[#005236]">+216.6%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#0b1c30]">Weekly Active Users</td>
                <td className="py-2.5 text-[#76777d]">3,930</td>
                <td className="py-2.5 text-[#0b1c30] font-semibold">4,820</td>
                <td className="py-2.5 text-right font-bold text-[#005236]">+22.6%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#0b1c30]">User Satisfaction (CSAT)</td>
                <td className="py-2.5 text-[#76777d]">72 / 100</td>
                <td className="py-2.5 text-[#0b1c30] font-semibold">91 / 100</td>
                <td className="py-2.5 text-right font-bold text-[#005236]">+26.3%</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, subtext, status, statusColor, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#c6c6cd] shadow-sm flex flex-col justify-between hover:border-[#0058be] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#45464d]">{title}</span>
        <span className="material-symbols-outlined text-[#76777d] text-[20px]">{icon}</span>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-[#0b1c30]">{value}</div>
        <div className="text-xs text-[#45464d] mt-1">{subtext}</div>
        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-2 ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function ProgressBar({ label, percentage, count, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-[#0b1c30] mb-1">
        <span>{label}</span>
        <span>{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-[#eff4ff] h-2.5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
