export default class indexCtrl {
    constructor(Service, $rootScope) {
        this.service = Service;
        this.root = $rootScope;
        this.initData();
    }
    refresh() {
        this.root.loading = 1;
        this.service.synData().then(res => {
            res = res.data;
            this.root.loading = 0;
            if (res.success) {
                this.initData();
            }
        });
    }
    initData() {
        this.root.loading = 1;
        this.service.getconsul().then(res => {
            res = res.data;
            this.root.loading = 0;
            if (res.success) {
                this.list = this.parse(res.data);
            }
        });
    }
    status(status) {
        switch (status) {
            case 'passing':
                return 'green'
                break;
            case 'critical':
                return 'red'
                break;
            default:
                return 'yellow'
                break;
        }
    }
    parse(d) {
        var a0 = [],
            b0;
        var ct = [];
        for (var i = 0; i < d.length; i++) {
            b0 = {};
            b0.moduleName = d[i].moduleName;
            var __tl = 0;
            for(var j = 0, _1 = d[i].consulAppViewDtos; j < _1.length; j++) {
                b0.serviceName = _1[j].serviceName;
                b0.principalName = _1[j].principalName;
                b0.reMark = _1[j].reMark;
                b0.__l = _1[j].consulNodeViewDtos.length || 1;

                //处理三级为空情况
                if (!_1[j].consulNodeViewDtos.length) {
                    __tl++;
                    b0._is1Rs = 0;
                    a0.push(Object.assign({},b0));
                }
                for (var k = 0, _2 = _1[j].consulNodeViewDtos; k < _2.length; k++) {
                    __tl++;

                    if( k === 0 && j ===0) {
                         b0._is0Rs = 0;
                    } else {
                         b0._is0Rs = 1;
                    }
                    if (k !== 0) {
                        b0._is1Rs = 1;
                    } else {
                        b0._is1Rs = 0;
                    }
                    b0.status = _2[k].status;
                    // b0.updateTime = _2[k].updateTime;
                    b0.tag = _2[k].tag;
                    b0.sysContinueTime = _2[k].sysContinueTime;
                    b0.swaggerUiUrl = _2[k].swaggerUiUrl;

                    a0.push(Object.assign({},b0));
                }

            }
            ct.push(__tl);

        }
        var plus = 0;
        for (var s = 0; s < ct.length; s++) {
            a0[plus].__tl = ct[s];
            plus += ct[s];
        }

        return a0
    }
}
