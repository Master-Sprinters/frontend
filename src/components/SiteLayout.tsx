import { FC, useEffect, useState } from "react";
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
    const [padLeft, setPadLeft] = useState("250px");
    const { Content, Sider } = Layout;

    useEffect(() => {
        
        if(collapsed){
            setPadLeft("80px")
        }else{
            setPadLeft("250px")
        }
      });

    return (
        <Layout className="content" style={{ minHeight: '100vh' }}>
            <Sider style={{height:"100vh", position:"fixed"}} width="250px" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="image-wrapper"><img id="eth-legacy-logo" src={EthMiras} alt="eth"/></div>
                <Menu onClick={handleContent} defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
                <div className="image-wrapper"><img id="eth-logo" src={EthLogo} alt="eth"/></div>
            </Sider>
            <Layout className="site-layout" style={{paddingLeft:padLeft, transition:"all .2s"}}>
                <Content >
                    {child}
                </Content>
            </Layout>
        </Layout>
    );
}

export default SiteLayout;
