import { Outlet } from "react-router-dom";
import MyFooterM from "../pages/mobile/MyFooterM";
import MyHeaderM from "../pages/mobile/MyHeaderM";
import styles from './MyLayoutM.less'

const MyLayoutM = () =>{

    return (
        <div className={styles.mLayout}>
            <div className={styles.headerWrapper}>
                <MyHeaderM />   
            </div>
            <div className={styles.contentWrapper}>
                <Outlet />
            </div>
            <div className={styles.footerWrapper}>
                <MyFooterM />
            </div>
        </div>
    )
}

export default MyLayoutM