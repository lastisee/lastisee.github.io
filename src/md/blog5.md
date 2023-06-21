### 使用react高阶组件，实现避免第一次请求重定向影响页面体验的问题
在项目中，存在一种情况，登录了之后，前端取请求接口，后台对于第一次请求，仍然会重定向到登录页去走一遭，虽然最后只是在登录页停留一刹那便回到了系统首页，但是这样的跳转还是影响用户使用体验，因此想到使用react的高阶组件，来对layout文件进行包裹，使访问layout组件下的所有子组件，都会替子组件解决第一次重定向的操作，使得子组件不受重定向的影响，主要思路是使用一个隐藏的iframe来进行第一次请求，请求完成之后，删除iframe即可
``` javascript
import {useRef, useState, useEffect} from 'react'

const withFetchRedirect = (WrappedComp) => {
    function WrapperComp (props) {
        const iframeRef = useRef()
        const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            iframeRef.current.src = 'http://xxx.com' //随意请求后台一个接口即可
            iframeRef.current.onload = () => {
                //iframe加载完成之后，这个iframe自动移除，不影响性能
                setLoaded(false)
            }
        }, [])

        if(!loaded) {
            return (
                <>
                    <iframe ref={iframeRef} styly={{display: 'none'}} />
                    <div>loading...</div>
                </>
            )
        }

        return <WrappedComp {...props} />
    }

    return WrapperComp
}
```