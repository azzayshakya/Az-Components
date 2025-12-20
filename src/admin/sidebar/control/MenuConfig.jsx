

import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  DollarOutlined,

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