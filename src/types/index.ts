
export interface Department {
  id: number;
  name: string;
  path: string;
}

export interface Project {
  id: number;
  name: string;
  path: string;
}

export interface ISODocument {
  id: number;
  name: string;
  path: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  path: string;
}

export interface DailyTool {
  id: number;
  name: string;
  type: string;
  path: string;
}

export interface BpmInboxItem {
  step_id: number;
  request_id: string;
  serial: string | null;
  form_name: string;
  applicant: string;
  step_name: string;
  submitted_at: string | null;
  url: string;
}

export interface BpmRequestItem {
  request_id: string;
  serial: string | null;
  form_name: string;
  status: string;
  status_display: string;
  created_at: string;
  url: string;
}

export type BpmSummary<T> =
  | { authenticated: true; user: string; count: number; items: T[] }
  | { authenticated: false };
