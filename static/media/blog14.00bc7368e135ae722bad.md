### gh-pages站点文章发布过程

1. 首先在`md`文件夹编写文章，文章命名以`blogxx`的格式，`xx`为数字，递增。
2. 然后修改同目录下的`fileList.json`文件，加上此次的文章信息，包含作者，创作年月，文章id等，文章id即为文件名后的数字。
3. 提交此次修改到`github`。
4. 在终端执行`yarn deploy`，即可完成文章发布。
- 如果需要在本地启动查看效果，直接`yarn start`即可