import styles from './Ball.less'
import classNames from 'classnames'

const colorMap = {
    0: '#CCFFFF',
    1: '#FFFFCC',
    2: '#0099CC',
    3: '#FF9999',
    4: '#FFCCCC',
    5: '#336633',
    6: '#CC9999',
    7: '#CC9966',
    8: '#CCCC99',
    9: '#99CCCC',
}

const startX = Number.parseInt(1920 * Math.random())
const startY = Number.parseInt(1080 * Math.random())

const Ball = ({colorIdx = 0})=> {



    return (
        <div className={classNames(styles.ball)} style={{backgroundColor: colorMap[colorIdx]}}>

        </div>
    )
}
export default Ball