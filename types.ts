
export enum AppTab {
  SPLASH = 'splash',
  DASHBOARD = 'dashboard',
  FIRE_DETAIL = 'fire_detail',
  WATER_DETAIL = 'water_detail',
  ALERTS = 'alerts',
  DEVICES = 'devices',
  BUSINESS = 'business',
  SETTINGS = 'settings',
  RISK_ANALYZER = 'risk_analyzer',
  VISUAL_EDITOR = 'visual_editor',
  AUTOMATION = 'automation',
  COMMUNITY = 'community',
  ACADEMY = 'academy',
  LIVE_EXPERT = 'live_expert',
  MANUAL = 'manual'
}

export interface SafetyAlert {
  id: string;
  type: 'FIRE' | 'WATER';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: Date;
  location: string;
  description: string;
}

export interface SensorData {
  id: string;
  name: string;
  type: 'FIRE' | 'WATER';
  status: 'ONLINE' | 'OFFLINE' | 'ALERT';
  primaryValue: number; // smoke or humidity
  secondaryValue: number; // temperature or flow
  lastSync: Date;
}
