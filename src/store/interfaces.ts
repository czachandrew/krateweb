export interface Progression {
  id: number;
  level: number;
  lifetime_xp: number;
  current_xp: number;
  redeemed_xp: number;
  next_level: number;
  gifts: number;
}
export interface NewKrateSpace {
  name: string;
  description: string;
  user_id: number;
  joinable: boolean;
  photo_url?: string;
}

export enum JoinMethod {
  invite = 'invite_only',
  request = 'request',
  open = 'open'
}

export enum Status {
  active = 'active',
  pending = 'pending',
  suspended = 'suspended',
  closed = 'closed'
}

export interface NewExperienceTask {
  description: string;
  details: string;
  xp_value: number;
  zonegroup_id: number | string;
  user_id: number;
  limited: boolean;
  limit: number;
  media_required: boolean;
  media_type: string;
  media_requirements: any;
  location: string;
  coordinates: string;
}

export interface NewKratespaceGroup {
  name: string;
  description: string;
  type: string;
  join_method: JoinMethod;
  kratespace_id: number;
  status: Status;
}

export interface Kratespace {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  status: string;
  joinable: boolean;
  link: string;
  photo_url: string;
  space_xp: number;
  krate_xp: number;
}

export interface User {
  name: string;
  email: string;
  id: number | null;
  photo_url: string | null;
  progression: Progression;
  rewards: [Reward] | any;
  type: string;
}

export interface KrateInfo {
  title: string;
  description: string;
  image: string;
}

export interface UserKrate {
  id: number;
  user_id: number;
  krate: KrateInfo;
}

export interface UserKrates {
  [index: number]: UserKrate;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  redeemable: number;
  redeemed: number;
  type: string;
  status: string;
}

export interface XpEvent {
  id: number;
  value: number;
  event: string;
  type: string;
  timestamp: string;
}

export interface EventsObject {
  [key: number]: XpEvent;
}
