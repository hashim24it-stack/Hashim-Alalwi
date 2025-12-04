export enum PageView {
  HOME = 'HOME',
  VISION = 'VISION',
  SCHEDULE = 'SCHEDULE',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
  RESULTS = 'RESULTS',
  CONTACT = 'CONTACT',
  LOGIN = 'LOGIN',
  TEACHERS = 'TEACHERS'
}

export interface NavigationProps {
  onNavigate: (page: PageView) => void;
  activePage?: PageView;
}