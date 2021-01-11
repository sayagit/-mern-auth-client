import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

////Router.jsのBrowserRouterが持ってるmatchを直接挿入できる
//(react-router v4以降ではparamsの代わりにmatch.paramsを使う)
//history: react-routerでの履歴
//history.push: 画面遷移する。前居た画面を履歴に追加し、ブラウザの戻るボタンで戻れるようにする
const Layout = ({ children, match, history }) => {

    //routerでルーティングされたpathとリンクのpathが一致したら黒、しなかったら白
    const isActive = path => {
        if (match.path === path) {
            return { cursor: 'pointer', color: '#000' };
        } else {
            return { cursor: 'pointer', color: '#fff' };
        }
    };

    //matchの値確認
    //{JSON.stringfy(match)}

    //※signoutでLinkではなくspanを使用しているのは、ページ遷移ではなくonClick制御をしたいため
    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
            </li>
            {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={isActive('/private')}
                            onClick={() => {
                                history.push('/private');
                            }}>
                            {/* {isAuth().name} */}Private
                    </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={isActive('/update')}
                            onClick={() => {
                                history.push('/update');
                            }}>
                            {/* {isAuth().name} */}Update
                    </span>
                    </li>
                </Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link to="/admin" className="nav-link" style={isActive('/admin')}>
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}

        </ul>
    );
    return (
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);