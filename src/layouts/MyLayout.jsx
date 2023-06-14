import { Layout as AntdLayout } from "antd";
import MyHeader from "../pages/MyHeader";
import { Outlet } from "react-router-dom";
import styles from './MyLayout.less';
import MyFooter from "../pages/MyFooter";

const {Header, Footer, Content} = AntdLayout

const MyLayout = (props)=> {
    return (
        <AntdLayout className={styles.layoutWrapper}>
            <Header className={styles.headerWrapper}>
                <MyHeader />
            </Header>
            <Content className={styles.contentWrapper}>
                <Outlet />
            </Content>
            <Footer className={styles.footerWrapper}>
                <MyFooter />
            </Footer>
        </AntdLayout>
    )
}

export default MyLayout