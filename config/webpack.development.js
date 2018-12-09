const test = require('../unit/menu.js');
module.exports ={
        output:{//为啥这里只有js的输出文件， 因为webpack只是对js打包
            filename: "scripts/[name].bundles.js"
        },
        devServer: {//配置测试的假数据
            port:4000,
            before(app) {
                test(app);
            }
        }
}