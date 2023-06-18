import { generateRandomString } from "../../utils";
import Ball from "./Ball"
import styles from './Ball.less'

const idxList = Array.from({length: 20}, () => ({num: Math.floor(Math.random() * 10), key: generateRandomString(8)}));
console.log("🚀 ~ file: ScreenSaver.jsx ~ line 6 ~ idxList", idxList)

const ScreenSaver = () => {
    return (
        <div className={styles.screenSaver}>
              <h1 className="text-3xl font-bold underline">
                Hello world!
              </h1>
            {idxList.map(item => <Ball key={item.key} colorIdx={item.num} />)}
        </div>
    )
}

export default ScreenSaver