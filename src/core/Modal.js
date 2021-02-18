import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        /*　画面の中央に要素を表示させる設定　*/
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    content: {
        zIndex: 2000,
        width: "50%",
        padding: "1em",
        background: "#fff",
        borderRadius: "10px",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inline: {
        textAlign: "left",
        display: "inline-block"
    }
});

//Destructuring(分割代入)の構文で{show}と書ける
const Modal = ({ show, setShow, content }) => {

    const classes = useStyles();

    if (show) {
        return (
            <div className={classes.overlay}
                onClick={() => setShow(false)}>
                <div className={classes.content}
                    onClick={(e) => e.stopPropagation()}>
                    <div className={classes.inline}>
                        {content}
                        {/* <p><button onClick={() => setShow(false)}>close</button></p> */}
                    </div>
                </div>
            </div>
        )
    } else {
        return (null);
    }
}

export default Modal;