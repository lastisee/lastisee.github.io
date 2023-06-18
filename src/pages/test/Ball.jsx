import styles from './Ball.less'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { calculateIntersectionPoints } from '../../utils'

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



const Ball = ({colorIdx = 0, id = ''})=> {

    
    const ballRef = useRef()

    const [hasInit, setHasInit] = useState(false)
    //如果到达了边缘 重新生成targetLoc
    const [isToEdge, setIsToEdge] = useState(true)

    const [currentLoc, setCurrentLoc] = useState()

    const [targetLoc, setTargetLoc] = useState()

    const keyframe = useMemo(()=> {
        if(currentLoc && targetLoc){
            return `@keyframes ball-run-${id} {
                0%{
                    left: ${currentLoc?.x}px;
                    top: ${currentLoc?.y}px;
                }
                100%{
                    left: ${targetLoc?.x}px;
                    top: ${targetLoc?.y}px;
                }
            }`
        }
        return ''
    }, [currentLoc, targetLoc])

    // console.log('loc----->', currentLoc?.x, currentLoc?.y, targetLoc?.x, targetLoc?.y)

    useEffect(()=> {
        if(keyframe){
            const style = document.createElement('style');
            // 将 keyframes样式写入style内
            style.innerHTML = keyframe;
            // 将style样式存放到head标签
            style.sheet?.insertRule(keyframe)
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }, [keyframe])

    useEffect(()=> {
        if(isToEdge && currentLoc){
            const wrapper = document.querySelector(`.${styles.screenSaver}`)
            const angle = Number.parseInt(360 * Math.random())
            const {x, y} = calculateIntersectionPoints(currentLoc.x, currentLoc.y, angle, wrapper.clientWidth, wrapper.clientHeight)
            setIsToEdge(false)
            setTargetLoc({x, y})
        }
    }, [isToEdge, keyframe, currentLoc])

    //第一步 给小球一个随机的初始位置，同时给currentLoc赋值
    useEffect(() => {
        if(ballRef?.current){
            const wrapper = document.querySelector(`.${styles.screenSaver}`)
            let startX = Number.parseInt(wrapper.clientWidth * Math.random())
            let startY = Number.parseInt(wrapper.clientHeight * Math.random())
            //避免产生滚动条
            if(startX + 80 >= wrapper.clientWidth){
                startX = wrapper.clientWidth - 80
            }
            if(startY + 80 >= wrapper.clientHeight){
                startY = wrapper.clientHeight - 80
            }
            ballRef.current.style.left = `${startX}px`
            ballRef.current.style.top = `${startY}px`
            setCurrentLoc({x: startX, y: startY})
            setHasInit(true)
        }
    }, [ballRef?.current])

    
    useEffect(()=> {
        if(hasInit && ballRef?.current){
            const wrapper = document.querySelector(`.${styles.screenSaver}`)
            const observer = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    if(mutation.type === 'attributes' && mutation.attributeName === 'style' && !isToEdge){
                        //新的坐标
                        const x = mutation.target?.offsetLeft
                        const y = mutation.target?.offsetTop
                        if(x >= wrapper.clientWidth || x <= 0 || y >= wrapper.clientHeight || y <= 0){
                            //超出上下左右左右边界
                            setIsToEdge(true)
                        }
                    }
                  });
            })
            const options = {
                attributes: true,
                attributeFilter: ['style'],
            }
            observer.observe(ballRef.current, options)
            return () => observer.disconnect()
        }
    }, [hasInit, ballRef?.current]);

    return (
        <div id={id} ref={ballRef} className={classNames(styles.ball)} style={{backgroundColor: colorMap[colorIdx], animation: `ball-run-${id} 5s 1`}}>
        </div>
    )
}
export default Ball