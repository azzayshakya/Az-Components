import { useState, useMemo } from "react";
import { Layout, Menu, theme, Typography } from "antd";


import { buildMenuItems } from "../utilities/MenuBuilder";
import { buildBreadcrumbs } from "../utilities/breadCrumbBuilder";

import { USER_ROLES } from "../constants/Permission";
import MENU_CONFIG from "../control/MenuConfig";

import AdminFooterComponent from "@/admin/components/Footer";
import AdminHeaderComponent from "@/admin/components/AdminHeaderComponent";
import { Outlet } from "react-router-dom";
import useMenu from "../hooks/useMenu";

const { Sider } = Layout;
const { Text } = Typography;

const AdminMain = ({ userRole = USER_ROLES.ADMIN, userData = null }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { selectedKeys, openKeys, handleMenuClick, handleOpenChange } = useMenu(
    {
      defaultSelectedKey: "dashboard",
      persistState: true,
    },
  );

  const menuItems = useMemo(() => {
    return buildMenuItems(MENU_CONFIG, userRole);
  }, [userRole]);
  console.log(menuItems);

  const breadcrumbItems = useMemo(() => {
    return buildBreadcrumbs(selectedKeys[0]);
  }, [selectedKeys]);

  return (
    <Layout style={{ minHeight: "100vh"  }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.1)",
            margin: "16px",
            borderRadius: "8px",
          }}
        >
          <Text
            strong
            style={{
              color: "white",
              fontSize: collapsed ? "16px" : "20px",
              transition: "font-size 0.3s",
            }}
          >
            {collapsed ? "EIE" : "Elmech"}
          </Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuItems}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.2s",
        }}
      >
        <AdminHeaderComponent
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          userData={userData}
          breadcrumbItems={breadcrumbItems}
        />

        <div
          style={{
            // minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            
          }}
        >
          <Outlet />
        </div>

        <AdminFooterComponent color={colorBgContainer} />
      </Layout>
    </Layout>
  );
};

export default AdminMain;
