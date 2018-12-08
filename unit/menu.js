function menu(app){

    app.get('/api/test', (req, res) => {
        res.json({
            code: '200',
            message: {aa: "23中的   "}
        });
    });

    /**
     * 获取用户菜单
     */
    app.get('/user/queryUserAuthority', (req, res) => {

        res.json({
  menus: [
    {
      menuId: 1,//菜单id
      menuName: "根节点",//菜单名称
      menuCode: "root",//菜单代码
      link: "/root",//菜单路径
      icon: "el-icon-menu",//菜单图标
      lft: 1,//从上往下的顺序
      rgt: 14,//
      depth: 0 // 0 一级  1 二级  2 三级
    },
    {
      menuId: 2,
      menuName: "首页",
      menuCode: "dashboard",
      link: "/dashboard",
      icon: "el-icon-menu",
      lft: 2,
      rgt: 3,
      depth: 1
    },
    {
      menuId: 3,
      menuName: "权限管理",
      menuCode: "system",
      link: "/system",
      icon: "el-icon-menu",
      lft: 4,
      rgt: 9,
      depth: 1
    },
    {
      menuId: 4,
      menuName: "个人设定",
      menuCode: "profile",
      link: "/system/profile",
      icon: "el-icon-menu",
      lft: 5,
      rgt: 7,
      depth: 3
    },
    {
      menuId: 5,
      menuName: "用户管理",
      menuCode: "user",
      link: "/system/user",
      icon: "el-icon-menu",
      lft: 6,
      rgt: 6,
      depth: 2
    },
    {
      menuId: 6,
      menuName: "角色管理",
      menuCode: "role",
      link: "/system/role",
      icon: "el-icon-menu",
      lft: 7,
      rgt: 8,
      depth: 2
    },
      {
          menuId: 7,
          menuName: "资源管理",
          menuCode: "resourcesList",
          link: "/system/resourcesList",
          icon: "el-icon-menu",
          lft: 7,
          rgt: 8,
          depth: 2
      },
      {
          menuId: 8,
          menuName: "物资出门记录",
          menuCode: "outList",
          link: "/record/outList",
          icon: "el-icon-menu",
          lft: 7,
          rgt: 13,
          depth: 1
      },
      {
          menuId: 9,
          menuName: "访客记录",
          menuCode: "inList",
          link: "/record/inList",
          icon: "el-icon-menu",
          lft: 8,
          rgt: 12,
          depth: 1
      }
  ],
  authorities: [
    { authority_id: 1, authority_code: "AddUser", authority_name: "新增用户" },
    { authority_id: 2, authority_code: "EditUser", authority_name: "修改用户" },
    {
      authority_id: 3,
      authority_code: "DeleteUser",
      authority_name: "删除用户"
    },
    {
      authority_id: 4,
      authority_code: "QueryUser",
      authority_name: "查询用户"
    },
    {
      authority_id: 5,
      authority_code: "QueryReport",
      authority_name: "查询报告"
    }
  ]
});
    });

};

module.exports =  menu ;
