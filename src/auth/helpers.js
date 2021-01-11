import cookie from 'js-cookie';

//クッキーを保存
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            //1日で破棄される
            expires: 1
        });
    }
};

//クッキーの削除
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key);
    }
};

//クッキーから保存されたtokenを取り出す
//サーバーへtoken付きのリクエストを作成するときに使える
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

//localstrageを保存
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

//localstrageの削除
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

//signinのときにデータをcookieとlocalstrageに保存する
export const authenticate = (response, next) => {
    //response.dataはtokenとuser:{ _id, name, email, role }が含まれる
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response.data);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

//localstrageからuserにアクセスする
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) { //'token'名のcookieがあった場合
            if (localStorage.getItem('user')) {
                //localstrageのuserアイテム(JSONオブジェクト)をオブジェクトに変換して返す
                //user:{ _id, name, email, role }
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

//signOutのときはクッキーとストレージデータを削除する
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

//localStorageの情報をアップデート
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};