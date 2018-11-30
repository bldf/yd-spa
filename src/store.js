import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {sortBy,filter,find} from "lodash";

Vue.use(Vuex);

const subTree = (parentNode, allMenus) => {
    const children = sortBy(
        filter(
            allMenus,
            o =>
                o.depth === parentNode.depth + 1 &&
                o.lft > parentNode.lft &&
                o.rgt < parentNode.rgt
        ),
        ["lft"]
    );
    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        const node = { ...child, children: [] };
        parentNode.children.push(node);
        subTree(node, allMenus);
    }
};

const store = new Vuex.Store({
    state: {
        token: null,
        // 菜单列表
        menus: [],
        // 菜单树
        menuTree: [],
        // 权限点列表
        authorities: [],
        loading: false,
        // 选择日期范围
        dateRangePickerOptions: {
            shortcuts: [
                {
                    text: "最近一周",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近一个月",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近三个月",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit("pick", [start, end]);
                    }
                }
            ]
        },
        // 选择日期
        datePickerOptions: {
            shortcuts: [
                {
                    text: "今天",
                    onClick(picker) {
                        picker.$emit("pick", new Date());
                    }
                },
                {
                    text: "昨天",
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit("pick", date);
                    }
                },
                {
                    text: "一周前",
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit("pick", date);
                    }
                }
            ]
        },
        // 分页控件的每页显示条目个数
        paginationPageSizes: [10, 20, 50, 100],
        // 分页控件组件布局，子组件名用逗号分隔
        paginationLayout: "total, sizes, prev, pager, next, jumper"
    },
    mutations: {// 同步方法调用管理 $state
        setToken(state, newToken) {
            localStorage.setItem("token", newToken);
            state.token = newToken;
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setMenuTree(state, menuTree) {
            state.menuTree = menuTree;
        },
        setAuthorities(state, authorities) {
            state.authorities = authorities;
        }
    },
    actions: {//异步方法调用方法， 改变$state
        // 重新从服务器读取用户信息
        reloadUserAuthority(context) {//这里的context和我们使用的$store拥有相同的对象和方法
            return axios.get("/user/queryUserAuthority").then(response => {
                const menus = response.data.menus;
                const rootMenu = find(menus, { menuCode: "root" });
                const rootMenuNode = { ...rootMenu, children: [] };
                subTree(rootMenuNode, menus);
                context.commit("setMenus", menus);//commit 可以理解为调用的意思
                context.commit("setMenuTree", rootMenuNode.children);
                context.commit("setAuthorities", response.data.authorities);
            });
        },
        signOut(context) {
            localStorage.removeItem("token");
            context.commit("setToken", null);
            context.commit("setMenus", []);
            context.commit("setAuthorities", []);
        }
    }
});

export default store;
