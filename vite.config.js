import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
    VueUseComponentsResolver,
    VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

import postcssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        //port: 3000,
        //open: true,
        cors: true,
        proxy: {
            '/api': {
                target: 'http://10.10.130.87:8080',    // 目标接口前缀
                // target: 'http://localhost:8080',
                //ws: true,       //  代理webscoked
                changeOrigin: true,   // 开启跨域
                rewrite: (path) => path.replace(/\/api/, '')  // 路径重写
            }
        }
    },
    plugins: [
        vue(),
        AutoImport({
            // 需要去解析的文件
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            // imports 指定自动引入的包位置（名）
            imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
            // 生成相应的自动导入json文件。
            eslintrc: {
                // 启用
                enabled: true,
                // 生成自动导入json文件位置
                filepath: './.eslintrc-auto-import.json',
                // 全局属性值
                globalsPropValue: true
            },
            resolvers: [AntDesignVueResolver()]
        }),
        Components({
            // imports 指定组件所在目录，默认为 src/components
            dirs: ['src/components/', 'src/view/'],
            // 需要去解析的文件
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [
                AntDesignVueResolver({
                    sideEffect: true
                })
            ],
            VueUseComponentsResolver,
            VueUseDirectiveResolver
        }),
    ],
    // css: {
    //     postcss: {
    //         plugins: [
    //             postcssPxToRem({
    //                 // =========???????=========
    //                 rootValue: 35,
    //                 // 允许 px 转换为 rem 精确到小数点后几位
    //                 // 存储哪些将被转换的属性列表，这里设置为 ['*'] 全部。
    //                 propList: ['*'],
    //             },)
    //         ]
    //     }
    // },
    // ...
})

