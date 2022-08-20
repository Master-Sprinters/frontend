import { FC, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
): MenuItem {
    return {
        key,
        icon,
        label,
    } as MenuItem;
}

type Props = {
    child: JSX.Element[];
    menuItems: MenuItem[];
    handleContent: (e: MenuItem) => void;
}

const SiteLayout: FC<Props> = ({ child, menuItems, handleContent }) => {

    const [collapsed, setCollapsed] = useState(false);
    const { Content, Sider } = Layout;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width="250px" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu onClick={handleContent} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    {child}
                </Content>
            </Layout>
        </Layout>
    );
}

export default SiteLayout;
