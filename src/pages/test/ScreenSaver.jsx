import { generateRandomString } from "../../utils";
import Ball from "./Ball"
import styles from './Ball.less'

const idxList = Array.from({length: 1}, () => ({num: Math.floor(Math.random() * 10), key: generateRandomString(8)}));

const ScreenSaver = () => {
    return (
        <div className={styles.screenSaver}>
            {idxList.map(item => <Ball key={item.key} id={item.key} colorIdx={item.num} />)}
        </div>
    )
}

export default ScreenSaver