### 在umi项目中，实现前端文件更新之后页面进行提示

由于前端文件频繁更新，用户可能在使用过程中请求的是旧的前端资源，这样会导致用户不能及时地使用最新的系统功能，同时还会遇到旧版本的某些功能漏洞等问题，这里在不配置nginx的情况下，实现对前端资源更新的提示。实现这个功能需要在umi的配置文件里面开启hash.

> https://umijs.org/docs/api/config#hash

开启hash之后，每次打包的文件名里面包含8位随机字符串，通过这8位字符串来判断系统是否更新。

```javascript
const autoUpdate = () => {
    fetch('https://umijs.org/', {method: 'GET'})
            .then(res => res.text())
            .then(html => {
            //这里的data是umi框架的网页源代码，由于react是前端框架，其主要运行在浏览器中，不同于以往的后端直接返回HTML代码，
            //所以这里的代码片段只是一小段而已，只包含了HTML模板文件及js文件链接而已
            //<!DOCTYPE html><html><head>
            //xxxxxx...
            //<script src="/umi.js"></script>
            //</body></html>
            //通过正则 匹配到这段文本里面的umi.xxxxxxxx.js所在的标签，umi官网没有开启hash,所以文件名里面不含随机字符串
            const regex = /<script src="\/umi\.([a-zA-Z0-9]{8})\.js"><\/script>/;
            const match = html.match(regex);
            if (match) {
                // match[0] 匹配到的整个字符串：'<script src="/umi.abcdefg1.js"></script>'
                // match[1] 第一个括号捕获到的结果：'abcdefg1'
                console.log(match[0]); // '<script src="/umi.abcdefg1.js"></script>'
                console.log(match[1]); // 'abcdefg1'
                const newKey = match[1]
                const oldKey = localStorage?.getItem('updateKey')
                if(oldKey && oldKey !== newKey){
 					//alert放在最后，避免updateKey的更新被阻塞，可能会导致updateKey异常
                    localStorage.setItem('updateKey', newKey)
                    alert('系统已更新，请刷新后使用')
                }else{
                    localStorage.setItem('updateKey', newKey)
                }
            }
        })
}

在layout文件里面引用这个方法，定时2分钟检测一次这个key即可。
```

