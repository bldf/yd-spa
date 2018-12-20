const test = require('../unit/menu.js');
const tableRouter = require('../unit/tableRouter.js');
module.exports ={
        output:{//为啥这里只有js的输出文件， 因为webpack只是对js打包
            filename: "scripts/[name].bundles.js"
        },
        devServer: {//配置测试的假数据
            port:8080,
            before(app) {
                tableRouter(app) ;//获取数据表格所需要的测试数据
                test(app);
             
            }
        }
}