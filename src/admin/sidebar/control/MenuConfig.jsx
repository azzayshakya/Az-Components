import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  UserOutlined,
  CommentOutlined,
  QuestionCircleOutlined,
  ProjectOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import MENU_KEYS from '../constants/MenuKeys';
import MENU_LABELS from '../constants/MenuLabels';

export const MENU_CONFIG = [
  {
    key: MENU_KEYS.DASHBOARD,
    label: MENU_LABELS.dashboard,
    icon: DashboardOutlined,
  },
{
    key: MENU_KEYS.MY_PROFILE,
    label: MENU_LABELS.myProfile,
    icon: UserOutlined,
  },

  {
    key: MENU_KEYS.ALL_USERS,
    label: MENU_LABELS.allUsers,
    icon: UsergroupAddOutlined,
  },
   {
    key: MENU_KEYS.PROJECTS,
    label: MENU_LABELS.projects,
    icon: ProjectOutlined,
    children: [
      {
        key: MENU_KEYS.ADD_PROJECT,
        label: MENU_LABELS.addProject,
        icon: PlusOutlined,
      },
      {
        key: MENU_KEYS.ALL_PROJECTS,
        label: MENU_LABELS.allProjects,
        icon: UnorderedListOutlined,
      },
    ],
  },
  {
    key: MENU_KEYS.USER_QUERIES,
    label: MENU_LABELS.userQueries,
    icon: QuestionCircleOutlined,
  },
  
  {
    key: MENU_KEYS.USER_COMMENTS,
    label: MENU_LABELS.userComments,
    icon: CommentOutlined,
  },

  {
    key: MENU_KEYS.EMPLOYEE_MANAGEMENT,
    label: MENU_LABELS.employeeManagement,
    icon: TeamOutlined,
    children: [
      {
        key: MENU_KEYS.ADD_EMPLOYEE,
        label: MENU_LABELS.addEmployee,
        icon: UserAddOutlined,
      },
      {
        key: MENU_KEYS.ALL_EMPLOYEES,
        label: MENU_LABELS.allEmployees,
        icon: UsergroupAddOutlined,
      },
    ],
  },
  {
    key: MENU_KEYS.SALARY_MANAGEMENT,
    label: MENU_LABELS.salaryManagement,
    icon: DollarOutlined,
  },
 
];

export default MENU_CONFIG;
