//zumis
const path = require('path')
//在内存中生成 html页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//只要是插件都要放到plugins里面?

const VueLoaderPlugin = require('vue-loader/lib/plugin')
//声明了才能进plugin 这些都是插件 下面的规则是加载器


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output:{
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    //配置dev-server 命令参数的第二种方式  wp 4.0 只需要hot true就好了  第一种方法 在package。json中的dev2里面
    devServer:{
        open: true,//自动打开浏览器
        port: 1551,//设置允许端口
        contentBase: 'src',//托管的目录
        hot: true//热更新 大多数还是需要刷新 包括样式 类如父子级冲突的时候
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),//指定的模板页面生成 内存中的页面
        new VueLoaderPlugin()
    ],
    module:{//第三方模块加载器
        rules:[//所以第三方的匹配规制
            {  test: /\.css$/, use: ['style-loader', 'css-loader']  },//test 匹配 正则表达式  从右到左调用加载器
            {  test: /\.less$/, use: ['style-loader', 'css-loader','less-loader']  },
            {  test: /\.scss$/, use: ['style-loader', 'css-loader','sass-loader']  },
            {  test: /\.(jpg|png|gif|bmp|jpeg|svg)$/, use: 'url-loader?limit=50000&[hash:8]-name=[].[ext]' },//只需要一个loader 所以不用数组 参数是最大值 低于会转换base64 高于等于就是原图 是字节大小 1kb是1024字节  第二个参数是不改名和不该后缀（2涨不一样位置不一样的图片但是同名的图片 后面会自动替换前面同名的（因为都在根目录的内存中）所以加上哈希值 4.0可能不需要了
            {  test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'  },          
            //字体文件匹配
            { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ },//排除了node_modules 
            { test: /\.vue$/, loader: 'vue-loader' } ,//这是vue 模块的配置
        ]
    },
    resolve:{
        alias:{//修改vue被导入包的路径  对象包裹对象
        //"vue$":  "vue/dist/vue.js"
        }//配置vue结尾的 地址在哪里
    }//导入vue。js
}
//使用 webpack-dev-server 工具 来实现自动打包编译功能
// npm i webpack-dev-server -D

//根目录运行 npm run dev