# 使用 webpack 和 vue 制作的移动端页面
预览在dist中
组件的使用 接口的调用渲染 数据处理 组件之间的数据互相传值事件调用本地存储(购物车加减删同步 选择和计算价格)
组件配置都使用了最新版 已于官方文档资料调试完毕 
使用组件有
vue-router vue-resource vue-preview vuex
mint-ui  Vant moment ~~mui~~
## 根目录命令行下npm i 安装依赖包  npm run dev运行
### 本项目的创建日：19年 11月16号20点 结束于19号23点
### 所有文件代码都经个人手写注释 流程参考于黑马17年流出的vue教程 
1. 因为版本和使用的组件不同 修改较多 功能效果完全还原 
2. mui插件因为开头使用过所有没有删除(因严格模式下只使用了mui的css) 既tabbar 和首页的6宫格 2個位置
3. 注释已有vant版本对应的代码 大概... 
4. 图片内容均是接口提供 不具任何意义
5. 购物车功能因为组件不同 方法也和教程不同 参考部分思路独自实现效果 
### 使用的是 http://www.liulongbin.top:3005 的接口(轮播图缩略图 各个页面的评论收发和页面数据来源)
在此感谢此接口的提供者 
#### 关于git使用 更新：
#### 直接使用 vscode 推送
    git add .
    git commit -m "message"
    git push origin master