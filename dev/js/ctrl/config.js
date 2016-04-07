export default class configCtrl {
    constructor(Service, $rootScope, $timeout) {

        this.service = Service;
        this.$timeout = $timeout;
        this.root = $rootScope;

        this.initData();
        this.state = {};
    }
    initData() {
        this.getConfig();
        this.getparentconfig();
        this.getservicesname();
    }
    getservicesname() {
        this.service.getservicesname().then(res => {
            res = res.data;
            if (res.success) {
                this.servicesName = res.data;
            }
        });
    }
    getparentconfig() {
        this.service.getparentconfig().then(res => {
            res = res.data;
            if (res.success) {
                this.parentCfg = res.data;
            }
        });
    }
    getConfig() {
        this.root.loading = 1;
        this.service.getconfig().then(res => {
            res = res.data;
            this.root.loading = 0;
            if (res.success) {
                this.list = this.parse(res.data);
            }
        });
    }
    parse(d) {
        var a0 = [],
            b0;
        var ct = [];

        for (var i = 0; i < d.length; i++) {
            b0 = {};
            var __tl = 0;
            b0.tcscrBean = d[i].tcscrBean;

            //处理二级为空情况
            if (!d[i].children.length) {
                __tl++;
                // b0._is1Rs = 0;
                a0.push(Object.assign({}, b0));
            }

            for (var j = 0, _1 = d[i].children; j < _1.length; j++) {
                __tl++;
                if (j !== 0) {
                    b0._is0Rs = 1;
                } else {
                    b0._is0Rs = 0;
                }
                b0.createdAt = _1[j].createdAt;
                b0.updateAt = _1[j].updateAt;
                b0.id = _1[j].id;
                b0.categoryName = _1[j].categoryName;
                b0.parentId  = _1[j].parentId;
                b0.principalName = _1[j].principalName;
                b0.remark = _1[j].remark;
                a0.push(Object.assign({}, b0));
            }
            ct.push(__tl);
        }

        var plus = 0;
        for (var s = 0; s < ct.length; s++) {
            a0[plus].__tl = ct[s];
            plus += ct[s];
        }
        // console.log(a0);
        return a0
    }
    // onEdit(d) {
    //     // console.log(d);
    // }
    onDel(id) {
        this._id_ = id;
        // console.log(id);
        // console.log(this);
        this.state._active_ = 1;
        this.state._active_2 = 1;
        this.popupText = '删除成功';
    }
    doDel() {
        this.doHide();
        this.service.deleteconfig(this._id_).then(res => {
            res = res.data;
            if (res.success) {
                this.state._active_0 = 1;
                this.initData();
                this.$timeout(e => {
                    this.doHide();
                },2000)
            } else {
                this.state._active_ = 1;
                this.state._active_3 = 1;
                this.popupText = res.data;
            }
        })
    }
    doShow() {
        Object.assign(this.state, {
            _active_ : 1,

        });
    }
    doHide() {
        Object.assign(this.state, {
            _active_ : 0,
            _active_0 : 0,
            _active_2 : 0,
            _active_1 : 0,
            _active_3: 0
        });
        // this.popupText = '';
    }
    clearForm() {
        this.form = {};
    }
    onAddOrEdit(bool, mod) {
        let obj = {};
        if (bool) {
            obj.categoryName = mod.categoryName;
            obj.parentId = String(mod.tcscrBean.id);
            obj.remark = mod.remark;
            obj.principalName = mod.principalName;
            obj.id = mod.id;
        }
        this.state.isEdit = bool;
        this.popupText = bool ? '编辑成功' : '添加成功';
        this.state._active_ = 1;
        this.state._active_1 = 1;
        this.form = obj;
        // console.log(this.form)
        this._mod = mod;
    }
    doAdd() {

        this.state.submitting = 1;
        this.service[this.state.isEdit ? 'editconfig' :'addconfig'](this.form).then(res => {
            res = res.data;
            this.state.submitting = 0;
            if (res.success) {
                this.doHide();
                this.state._active_0 = 1;
                this.initData();
                this.$timeout(e => {
                    this.doHide();
                },2000)
            } else {
                this.state.isSubmitError = 1;
                // this.state._active_ = 1;
                // this.state._active_3 = 1;
                this.isSubmitErrorText = res.data;
            }
        })
    }
}
