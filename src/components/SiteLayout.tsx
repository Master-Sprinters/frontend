import { FC, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import EthLogo from "../images/EthLogo.png"
import EthMiras from "../images/EtherMiras.png"

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
            <div className="image-wrapper"><img id="eth-legacy-logo" src={EthMiras} alt="eth"/></div>
                <Menu onClick={handleContent} defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
                <div className="image-wrapper"><img id="eth-logo" src={EthLogo} alt="eth"/></div>
            </Sider>
            <Layout className="site-layout">
                <Content className="content">
                    {child}
                </Content>
            </Layout>
        </Layout>
    );
}

export default SiteLayout;
