// ensido product chrome (sidebar, top bar, footer) around the test screen.
// Not part of the Trianglz design system: it has no sidebar, top bar or navigation components, and these
// ensido colors have no Trianglz token, so this file uses the Figma values directly. Step 6 finding.
import type { ReactNode } from 'react';
import { Avatar } from '../../components';
import avatarPhoto from './assets/avatar.png';
import ensidoMateSparkle from './assets/ensidomate-sparkle.svg';
import hamburger from './assets/hamburger.svg';
import logoMark from './assets/logo-mark.svg';
import logoWordmark from './assets/logo-wordmark.svg';
import navChevron from './assets/nav-chevron.svg';
import navDashboard from './assets/nav-dashboard.svg';
import navEmployees from './assets/nav-employees.svg';
import navEvaluation from './assets/nav-evaluation.svg';
import navGoals from './assets/nav-goals.svg';
import navPolicies from './assets/nav-policies.svg';
import navProjects from './assets/nav-projects.svg';
import navSettings from './assets/nav-settings.svg';
import navStructure from './assets/nav-structure.svg';
import navWorkGroups from './assets/nav-work-groups.svg';
import notification from './assets/notification.svg';
import orgIcon from './assets/org-icon.svg';
import profileChevron from './assets/profile-chevron.svg';

function NavItem({ icon, label, chevron }: { icon: string; label: string; chevron?: boolean }) {
  return (
    <a href="#" className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm text-base-white">
      <img src={icon} alt="" width={24} height={24} />
      <span className="flex-1">{label}</span>
      {chevron && <img src={navChevron} alt="" width={24} height={24} />}
    </a>
  );
}

function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[16.875rem] shrink-0 flex-col bg-[#010a33]">
      <div className="flex flex-col items-center gap-[0.43rem] border-b border-[#383893] px-3 pt-6 pb-[1.5625rem]">
        <img src={logoMark} alt="" width={27.481} height={30.219} />
        <img src={logoWordmark} alt="ensido" width={70.418} height={16.91} />
      </div>
      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-6">
        <a
          href="#"
          className="flex h-12 items-center gap-2 rounded-lg border-2 border-[#ff2c2c] bg-base-white/10 px-4 text-base font-medium text-base-white shadow-[12px_-10.4px_85.6px_0_rgba(255,0,0,0.28),-11.2px_13.2px_64px_0_rgba(143,0,255,0.23)]"
        >
          <img src={ensidoMateSparkle} alt="" width={20} height={20} />
          ensidoMate
        </a>
        <NavItem icon={navDashboard} label="Dashboard" />
        <NavItem icon={navStructure} label="Organization Structure" />
        <NavItem icon={navEmployees} label="Employees" />
        <NavItem icon={navGoals} label="Team Goals" />
        <div className="flex w-full flex-col items-end gap-2">
          <a href="#" className="flex h-12 w-full items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-base-white">
            <img src={navWorkGroups} alt="" width={24} height={24} />
            <span className="flex-1">Work Groups</span>
            <img src={navChevron} alt="" width={24} height={24} />
          </a>
          <a href="#" aria-current="page" className="flex w-[13.875rem] items-center gap-2 rounded-lg bg-[#5d5dda] px-4 py-3 text-sm text-base-white">
            <span className="size-[0.5625rem] rounded-full bg-base-white" />
            Projects
            <span className="rounded-[0.25rem] bg-[#3b82f6] px-2 py-0.5 text-xs leading-[1.125rem]">New</span>
          </a>
        </div>
        <NavItem icon={navProjects} label="Projects" />
        <NavItem icon={navPolicies} label="Policies" />
        <NavItem icon={navEvaluation} label="Performance Management" chevron />
        <NavItem icon={navSettings} label="configurations" />
        <NavItem icon={navSettings} label="configurations" chevron />
      </nav>
      <div className="flex items-center gap-2 border-t border-[#383893] p-4">
        <span className="flex size-[2.5rem] items-center justify-center rounded-lg bg-[#383893]">
          <img src={orgIcon} alt="" width={20} height={19} />
        </span>
        <span className="flex flex-col">
          <span className="text-xs leading-[1.125rem] text-[#b5b5f0]">Organization</span>
          <span className="text-sm text-base-white">Acme Corporation</span>
        </span>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-10 h-14 border-b border-[#d4d4d4] bg-[#010a33]">
      <div className="flex h-full items-center justify-between rounded-tl-2xl bg-base-white px-6">
        <button type="button" aria-label="Menu">
          <img src={hamburger} alt="" width={24} height={24} />
        </button>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Notifications">
            <img src={notification} alt="" width={44} height={44} />
          </button>
          <div className="flex w-[12.5rem] items-center justify-end gap-2">
            <span className="flex flex-col items-end">
              <span className="text-sm text-[#404040]">Ahmed Samy</span>
              <span className="text-xs leading-[1.125rem] text-[#737373]">Admin</span>
            </span>
            <Avatar variant="photo" size="sm" src={avatarPhoto} name="Ahmed Samy" />
            <img src={profileChevron} alt="" width={24} height={24} />
          </div>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1">{children}</main>
        <footer className="flex h-10 items-center justify-center text-sm text-[#010a33]">© Ensido 2025 - All Rights Reserved</footer>
      </div>
    </div>
  );
}
