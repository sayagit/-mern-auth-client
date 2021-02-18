import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Router.jsのBrowserRouterが持ってるprops(match)を直接挿入できる
//(react-router v4以降ではparamsの代わりにmatch.paramsを使う)
const Activate = ({ match, history }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true
    });

    //useEffect：第２引数の値が変わるたびに呼び出される
    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, show } = values;

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });

        const reactAppApi = process.env.REACT_APP_API;
        //axios:ブラウザやnode.js上で動くPromiseベースのHTTPクライアント
        //      HTTP通信を簡単に行うことができる
        axios.post(`${reactAppApi}/account-activation`,
            { token }
        )
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                //react-toastifyのメソッド アラートを表示する
                toast.success(response.data.message);
                function callback() {
                    history.push("/signin")
                }
                setTimeout(callback, 5000);
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
        </button>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {/* {JSON.stringify({ token })} */}
                {activationLink()}
            </div>
        </Layout>
    );
};

export default Activate;