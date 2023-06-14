import { Layout as AntdLayout } from "antd";
import MyHeader from "../pages/MyHeader";
import { Outlet } from "react-router-dom";
import styles from './MyLayout.less';

const {Header, Footer, Content} = AntdLayout

const MyLayout = (props)=> {
    return (
        <AntdLayout className={styles.myLayout}>
            <Header>
                <MyHeader />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </AntdLayout>
    )
}

export default MyLayout