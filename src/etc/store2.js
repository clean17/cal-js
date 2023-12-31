class Store {
    constructor() {
        this._store = {};
        this._observer = {};
        this.currentObserve = null;
        this._observeTask = [];
    }
    watch(callback) {
        this.currentObserve = callback;
        callback();
        this.currentObserve = null;
    }
    useSelector(callback) {
        return callback(this._store);
    }
    dispatch(action) {
        const { type, payload } = action;
        this._store[type] = payload;
    }
    /**
     * 1. 간단히 selector 와 dispatch를 구현하고
     * 2. 그를 useState훅 처럼 가져다가 쓰는 것을 구현하자.
     * 3. state를 selector하거나 dispatch하는 경우에 해당 Node를 구독하게 만드는 로직이 필요할 거 같다.
     */
    useState(initState) {
        if (typeof initState === 'string' && this._store[initState] === undefined) {
            return console.error('스토어에 등록 되지 않은 상태는 호출 할 수 없습니다.');
        }

        let key = initState;
        if (typeof initState !== 'string') {
            for (const [__key, value] of Object.entries(initState)) {
                key = __key;
                if (!this._store[__key]) {
                    const that = this;
                    const _key = `_${key}`;
                    Object.defineProperty(this._store, key, {
                        get() {
                            if (checkObserver()) that._observer[key].push(that.currentObserve);
                            return this[_key];

                            function checkObserver() {
                                return that.currentObserve &&
                                    !that._observer[key].filter((prev) => that.checkSameFunction(prev, that.currentObserve))[0];
                            }
                        },
                        set(value) {
                            if (JSON.stringify(value) !== JSON.stringify(this[_key])) {
                                this[_key] = value;
                                that._observer[key].forEach((callbak) => that._observeTask.push(callbak));
                                setTimeout(() => that.publishObserver(), 0);
                            }
                        }
                    });
                    this._store[_key] = value;
                    this._observer[key] = [];
                }
            }
        }

        return [
            this.useSelector((state) => state[key]),
            (state) => this.dispatch({ type: key, payload: state }),
        ];
    }
    publishObserver() {
        while (this._observeTask.length > 0) {
            const currentTask = this._observeTask.shift();
            this._observeTask = this._observeTask.filter((nextTask) => !this.checkSameFunction(currentTask, nextTask));
            currentTask();
        }
    }
    checkSameFunction(a, b) {
        return a.toString() === b.toString();
    }
}
function Main() {
    const store = new Store();
    function App() {
        const root = document.createElement('main');
        root.appendChild(Index());
        root.appendChild(Sub());

        return root;
    }
    function Index() {
        const root = document.createElement('div');
        root.style.background = 'cyan';
        const renderIndex = () => {
            const [Test, setTest] = store.useState({ test: 'a' });
            const [Test2, setTest2] = store.useState({ test2: 'b' });
            root.innerText = `${Test} : ${Test2}`;
            console.log('인덱스가 렌더링 되었다.');
            root.onclick = () => {
                setTest('sss');
                setTest2(Math.random());
            };
        };
        store.watch(renderIndex);

        return root;
    }
    function Sub() {
        const root = document.createElement('div');
        store.watch(() => {
            const [Test2, setTest2] = store.useState('test2');
            const [Test3, setTest3] = store.useState({ test3: 'c' });
            root.innerText = `${Test3} : ${Test2}`;
            console.log('서브가 렌더링 되었다.');
            root.onclick = () => {
                setTest3('공유 되지 않는 상태 변화');
            };
        });

        return root;
    }

    render(document.querySelector('#app'), App());

    function render(root, components) {
        root.appendChild(components);
    }
}

Main();