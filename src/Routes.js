import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Update from './core/Update';
import Private from './core/Private';
import PrivateRoute from './auth/PrivateRoute';
import Admin from './core/Admin';
import AdminRoute from './auth/AdminRoute';

//Routerは、どのURLが、どのリクエストに紐づいているのかを設定する
//ReactではBrowserRouterというコンポーネントを使う
//<Switch>内にルーティングを記述することで、urlにマッチされた最初のルーティングだけがレンダリングされる
//component={コンポーネント名}：URLがマッチしたときにレンダリングするコンポーネント
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/update" exact component={Update} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;