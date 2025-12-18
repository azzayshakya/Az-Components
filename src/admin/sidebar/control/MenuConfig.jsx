import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  SettingOutlined,
  FileOutlined,
  FileTextOutlined,
  SafetyOutlined,
  BellOutlined,
  FolderOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  InboxOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  KeyOutlined,
} from '@ant-design/icons';

import MENU_LABELS from '../constants/MenuLabels';
import MENU_KEYS from '../constants/MenuKeys';

export const MENU_CONFIG = [
  {
    key: MENU_KEYS.DASHBOARD,
    label: MENU_LABELS.dashboard,
    icon: DashboardOutlined,
  },
  {
    key: MENU_KEYS.ANALYTICS,
    label: MENU_LABELS.analytics,
    icon: BarChartOutlined,
  },
  {
    key: MENU_KEYS.USERS,
    label: MENU_LABELS.users,
    icon: UserOutlined,
    children: [
      {
        key: MENU_KEYS.USER_LIST,
        label: MENU_LABELS.userList,
        icon: UnorderedListOutlined,
      },
      {
        key: MENU_KEYS.USER_ROLES,
        label: MENU_LABELS.userRoles,
        icon: KeyOutlined,
      },
      {
        key: MENU_KEYS.USER_PERMISSIONS,
        label: MENU_LABELS.userPermissions,
        icon: SafetyOutlined,
      },
    ],
  },
  {
    key: MENU_KEYS.TEAMS,
    label: MENU_LABELS.teams,
    icon: TeamOutlined,
    children: [
      {
        key: MENU_KEYS.TEAM_MANAGEMENT,
        label: MENU_LABELS.teamManagement,
        icon: UsergroupAddOutlined,
      },
      {
        key: MENU_KEYS.TEAM_ANALYTICS,
        label: MENU_LABELS.teamAnalytics,
        icon: LineChartOutlined,
      },
    ],
  },
  {
    key: MENU_KEYS.PROJECTS,
    label: MENU_LABELS.projects,
    icon: ProjectOutlined,
    children: [
      {
        key: MENU_KEYS.PROJECT_LIST,
        label: MENU_LABELS.projectList,
        icon: FolderOutlined,
      },
      {
        key: MENU_KEYS.PROJECT_CREATE,
        label: MENU_LABELS.projectCreate,
        icon: PlusCircleOutlined,
      },
      {
        key: MENU_KEYS.PROJECT_ARCHIVE,
        label: MENU_LABELS.projectArchive,
        icon: InboxOutlined,
      },
    ],
  },
  {
    key: MENU_KEYS.FILES,
    label: MENU_LABELS.files,
    icon: FileOutlined,
  },
  {
    key: MENU_KEYS.REPORTS,
    label: MENU_LABELS.reports,
    icon: FileTextOutlined,
  },
  {
    key: MENU_KEYS.SETTINGS,
    label: MENU_LABELS.settings,
    icon: SettingOutlined,
    divider: true,
    children: [
      {
        key: MENU_KEYS.GENERAL_SETTINGS,
        label: MENU_LABELS.generalSettings,
      },
      {
        key: MENU_KEYS.SECURITY,
        label: MENU_LABELS.security,
        icon: SafetyOutlined,
      },
      {
        key: MENU_KEYS.NOTIFICATIONS,
        label: MENU_LABELS.notifications,
        icon: BellOutlined,
      },
    ],
  },
];

export default MENU_CONFIG;