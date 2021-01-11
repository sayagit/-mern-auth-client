//このファイルがJavaScriptのエントリーポイントとなる
//(public/index.htmlがpage template)
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

//react-scriptによりport3000にてindex.htmlを表示する

//render内のコードがpublic/index.jsのroot divの中身になる
//つまり、src/Routes.js に書いた記述がブラウザ上のページ(index.html)に反映される
ReactDOM.render(<Routes />, document.getElementById('root'));
