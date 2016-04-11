
class Head {
    constructor(Service, $rootScope, UserService) {
        this.service = Service;
        this.root = $rootScope;
        this.userService = UserService;
        this.init();
    }
    init() {
        this.nav = [
            {
                url: '/',
                txt: '首页'
            },
            {
                url: '/config',
                txt: '配置模块'
            },
            {
                url: '/blacklist',
                txt: '黑名单'
            },
            {
               url: '/maven',
               txt: 'Maven模块'
            }
        ];
        this.getUsername();

        this.root.$on('logined', this.getUsername.bind(this));
    }
    getUsername() {
        this.userService.getUser().then(res => {
            res = res.data;
            if (res) {
                this.setUsername(res);
            }
        }).catch(res => {});
    }
    setUsername(res) {
        this.username = res.userName;
        this.admin = res.admin;
    }
    onLogout() {
        this.service.logout().then(res => {
            res = res.data;
            if (res.success) {
                this.root.logined = 0;
            }
        })
    }
}

export default Head;
