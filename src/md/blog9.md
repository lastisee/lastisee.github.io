### 在wangeditor5中，从wps粘贴的内容字号丢失的问题解决

- 如下是官网文档

  ```javascript
  editorConfig.MENU_CONF['fontSize'] = {
      fontSizeList: [
          // 元素支持两种形式
          //   1. 字符串；
          //   2. { name: 'xxx', value: 'xxx' }
  
          '12px',
          '16px',
          { name: '24px', value: '24px' },
          '40px',
      ]
  }
  ```

- 由于wps对于字体大小是以磅为单位，所以此时配置也应该使用`pt`作为字号单位.通过在`customPaste`事件里面进行查看，

  ```javascript
  const html = event.clipboardData.getData('text/html')
  ```

  发现粘贴内容的HTML代码里面字号样式为`font-size: 28.0000pt`，此时如果对`editorConfig`里面的`fontSizeList`进行设置:`{name: '一号', value: '28pt'}`,你会发现粘贴的内容字号样式依然丢失，注意这里`value`的值应当严格和从wps复制的内容匹配，配置的格式应当按照如下代码：

  ```javascript
  {name: '一号', value: '28.0000pt'}
  ```

- 如果需要兼容word的内容复制，需要将word里面的常用字号按照上述步骤找到字号名称对应的磅数再进行配置。