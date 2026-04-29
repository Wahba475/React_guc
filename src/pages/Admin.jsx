import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { Filter, Edit2, Plus } from 'lucide-react'

const adminData = [
  {
    id: 1,
    name: 'Eleanor Vance',
    identifier: 'eleanor.v@example.com',
    role: 'Platform Admin',
    status: 'Active',
    lastActive: '2 mins ago',
  },
  {
    id: 2,
    name: 'Acme Innovations Ltd.',
    identifier: 'ORG-9928',
    role: 'Enterprise Partner',
    status: 'Pending',
    lastActive: '14 hours ago',
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    identifier: 'm.sterling@agency.io',
    role: 'External Contributor',
    status: 'Active',
    lastActive: '3 days ago',
  },
  {
    id: 4,
    name: 'Project Q4 Rebrand',
    identifier: 'PRJ-2024-X',
    role: 'Internal Initiative',
    status: 'Archived',
    lastActive: 'Oct 12, 2023',
  },
]

export default function Admin({ currentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('Users')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#f1edec] text-[#111111]'
      case 'Pending':
        return 'bg-[#D97706] text-white'
      case 'Archived':
        return 'bg-[#f1edec] text-[#747878]'
      default:
        return 'bg-[#f1edec] text-[#111111]'
    }
  }

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto w-full space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex flex-col gap-2">
            <h2
              className="text-4xl font-bold text-[#111111]"
              style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.01em', lineHeight: '1.2' }}
            >
              System Administration
            </h2>
            <p className="text-base text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Manage global entities, user access, and platform configurations.
            </p>
          </div>
          <button
            className="bg-[#111111] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity active:translate-y-[2px] active:translate-x-[2px] active:shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="flex items-center gap-1">
              <Plus size={16} /> New Entity
            </span>
          </button>
        </div>

        {/* Data Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 border border-[#e5e2e1]">
          {/* Tabs */}
          <div className="flex gap-2">
            {['Users', 'Companies', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border
                  ${
                    activeTab === tab
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#f7f3f2] border-[#e5e2e1] text-[#747878] hover:text-[#111111] hover:border-[#111111]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Filters */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Filter size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#747878]" />
              <select
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#e5e2e1] focus:outline-none focus:border-[#111111] text-sm appearance-none cursor-pointer text-[#111111]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Contributor</option>
              </select>
            </div>
          </div>
        </div>

        {/* High Density Data Table */}
        <div className="bg-white border border-[#e5e2e1] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f3f2] border-b border-[#e5e2e1]">
                <th
                  className="py-3 px-4 text-xs font-semibold text-[#747878] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Name & Identifier
                </th>
                <th
                  className="py-3 px-4 text-xs font-semibold text-[#747878] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Role / Type
                </th>
                <th
                  className="py-3 px-4 text-xs font-semibold text-[#747878] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Status
                </th>
                <th
                  className="py-3 px-4 text-xs font-semibold text-[#747878] uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Last Active
                </th>
                <th
                  className="py-3 px-4 text-xs font-semibold text-[#747878] uppercase tracking-wider text-right"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#111111]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {adminData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-[#f7f3f2] transition-colors group ${
                    idx !== adminData.length - 1 ? 'border-b border-[#e5e2e1]' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#111111]">{row.name}</span>
                      <span className="text-[#747878] text-xs mt-0.5">{row.identifier}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{row.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getStatusColor(
                        row.status
                      )}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#747878]">{row.lastActive}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="p-1.5 text-[#747878] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#111111]"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="bg-white border-t border-[#e5e2e1] px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Showing 1 to 4 of 240 entries
            </span>
            <div className="flex gap-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <button className="px-3 py-1 border border-[#e5e2e1] text-[#747878] hover:text-[#111111] hover:border-[#111111] disabled:opacity-50 transition-colors text-sm" disabled>
                Prev
              </button>
              <button className="px-3 py-1 border border-[#111111] bg-[#f7f3f2] text-[#111111] text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-[#e5e2e1] text-[#747878] hover:text-[#111111] hover:border-[#111111] transition-colors text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-[#e5e2e1] text-[#747878] hover:text-[#111111] hover:border-[#111111] transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
