import {
  BadgeCheck,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  FileSearch,
  Handshake,
  ListChecks,
  MailCheck,
  Receipt,
  Scale,
  ShieldCheck,
  Wrench,
  type LucideIcon
} from 'lucide-react';

// Íconos que se pueden nombrar desde src/data/site.ts
export const icons = {
  badgeCheck: BadgeCheck,
  calendarCheck: CalendarCheck,
  calendarClock: CalendarClock,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  fileSearch: FileSearch,
  handshake: Handshake,
  listChecks: ListChecks,
  mailCheck: MailCheck,
  receipt: Receipt,
  scale: Scale,
  shieldCheck: ShieldCheck,
  wrench: Wrench
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
