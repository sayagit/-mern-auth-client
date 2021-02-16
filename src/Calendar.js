import React, { useState, useEffect, useRef } from 'react';
// FullCalendarコンポーネント。
import FullCalendar from '@fullcalendar/react'
// FullCalendarで週表示を可能にするモジュール。
import timeGridPlugin from '@fullcalendar/timegrid'
// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from '@fullcalendar/daygrid'
// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from '@fullcalendar/interaction'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './core/Layout';
import Modal from './core/Modal';

// function myEventsType(id, title, start, end, memo) {
//     this.id = id;
//     this.title = title;
//     this.start = start;
//     this.end = end;
//     this.memo = memo;
// }

const Calendar = ({ match }) => {
    //backend接続用
    const reactAppApi = process.env.REACT_APP_API;

    // const classes = useStyles()
    const [show, setShow] = useState(false)

    const [myEvents, setMyEvents] = useState([]);
    const [inputs, setInputs] = useState(
        // new myEventsType(0, "", "", "", false)
        {
            id: 0,
            title: "",
            start: new Date(),
            end: new Date(),
            allday: false
        }
    );
    const { id, title, start, end, allday } = inputs;

    const ref = useRef(null);

    const saveItem = () => {

        //axios:ブラウザやnode.js上で動くPromiseベースのHTTPクライアント
        //      HTTP通信を簡単に行うことができる
        axios(`${reactAppApi}/scheduleItem/new`,
            {
                method: 'PUT',
                data: { title, start, end, allday }
            })
            .then(response => {
                console.log('SCHEDULE ITEM SAVED SUCCESSFULLY', response);
                setInputs({ ...inputs, title: '', start: '', end: '', allDay: false });
                //react-toastifyのメソッド アラートを表示する
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SCHEDULE EVENT SAVING ERROR', error.response.data.error);
                // console.log('SCHEDULE EVENT SAVING ERROR');
                setInputs({ ...inputs, title: '', start: '', end: '', allDay: false });
                toast.error(error.response.data.error);
            });
        if (setShow) {
            setShow(false);
        }
    }

    // const [list, setLists] = useState([]);
    useEffect(() => {
        readItems();
    }, [])

    function readItems() {
        const promise = axios.get(`${reactAppApi}/scheduleItem/read`).then((response) => {
            console.log('SCHEDULE ITEMS READ SUCCESSFULLY', response.data.items)
            const result = response.data.items;
            // const testItems = [];
            for (let i = 0; i < result.length; i++) {
                // testItems.push({
                //     id: i,
                //     title: result[i].title,
                //     start: result[i].start,
                //     end: result[i].end
                // })
                ref.current.getApi().addEvent({
                    id: i,
                    title: result[i].title,
                    start: result[i].start,
                    end: result[i].end
                });
            }
            // testItems.push({
            //     id: 0,
            //     title: result[0].title,
            //     start: result[0].start,
            //     end: result[0].end
            // })
            // setLists(`testItems：${testItems}`);
            console.log("Finished readItems")
            // setLists(testItems);
            // return response.data.items;
            toast.success(response.data.message);
        }).catch(error => {
            console.log('SCHEDULE ITEMS READING ERROR', error);
            // toast.error(error.response.data.error)
            // return [];
        });

        // return it
        // return promise;
    }

    //動作確認用　テストイベント
    const defaultEvents = [{
        id: 0,
        title: "event 1",
        start: "2021-02-11 10:00:00",
        end: "2021-02-11 11:00:00",
        memo: "memo1",
    },
    {
        id: 1,
        title: "event 2",
        start: "2021-02-12 14:00:00",
        end: "2020-02-12 16:00:00",
        memo: "memo2",
    }];


    //カレンダーがクリックされた時にイベント登録用のフォームを表示する。
    const handleSelect = (selectInfo) => {
        setShow(true);

        setInputs({
            ...inputs,
            start: selectInfo.start,
            end: selectInfo.end
        })
    }

    // const clickSubmit = event => {
    //     event.preventDefault();
    //     // setValues({ ...values, buttonText: 'Submitting' });

    //     const reactAppApi = process.env.REACT_APP_API;
    //     //axios:ブラウザやnode.js上で動くPromiseベースのHTTPクライアント
    //     //      HTTP通信を簡単に行うことができる
    //     axios.post(`${reactAppApi}/schedule/save`,
    //         { title, start, end, allday }
    //     )
    //         .then(response => {
    //             console.log('SCHEDULE EVENT SAVED SUCCESSFULLY', response);
    //             setInputs({ ...values, title: '', start: '', end: '', allDay: false });
    //             //react-toastifyのメソッド アラートを表示する
    //             toast.success(response.data.message);
    //         })
    //         .catch(error => {
    //             console.log('SCHEDULE EVENT SAVING ERROR', error.response.data);
    //             setValues({ ...values, buttonText: 'Submit' });
    //             toast.error(error.response.data.error);
    //         });
    // };


    const titleElement = (
        <div>
            <label>タイトル</label>
            <input
                type="text"
                value={title}
                name="inputTitle"
                onChange={event => {
                    // タイトルが入力されたら、その値をStateに登録する。
                    setInputs({ ...inputs, title: event.target.value })
                }}
            />
        </div>
    )

    const startTimeElement = (
        <div>
            <label>開始</label>
            <DatePicker
                dateFormat="yyyy/MM/d HH:mm"
                selected={start}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                todayButton="today"
                name="inputStart"
                onChange={(time) => {
                    // const timeString = formatDate(time, "yyyy/MM/d HH:mm")
                    // setInputStart(time)
                    // 日時が入力されたら、その値をstartに登録する。
                    setInputs({ ...inputs, start: time })
                }}
            />
        </div>
    )

    const endTimeElement = (
        <div>
            <label>終了</label>
            <DatePicker
                dateFormat="yyyy/MM/d HH:mm"
                selected={end}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                todayButton="today"
                name="inputEnd"
                onChange={(time) => {
                    // const timeString = formatDate(time, "yyyy/MM/d HH:mm")
                    setInputs({ ...inputs, end: time })
                }}
            />
        </div>
    )

    const btnElement = (
        <div>
            <input
                type="button"
                value="Cancel"
                onClick={() => {
                    setShow(false)
                }}
            />
            <input
                type="button"
                value="Save"
                onClick={() => saveItem()}
            />
        </div>
    )

    //フォームのコンテンツ
    const content = (
        <form action="">
            <p>Create a new event</p>
            {/* <p>{readItems2()}</p> */}
            {titleElement}
            {startTimeElement}
            {endTimeElement}
            {btnElement}
        </form>
    );


    const CalendarComponent = () => (
        <div>
            <p>{console.log("fullcalender called")}</p>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
                initialView="timeGridWeek" // カレンダーの初期表示設定。この場合、週表示。
                slotDuration="00:30:00"　// 週表示した時の時間軸の単位。
                selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
                // initialEvents={list}
                headerToolbar={{ // カレンダーのヘッダー設定。
                    start: 'title',
                    center: 'prev, next, today',
                    end: 'dayGridMonth,timeGridWeek'
                }}
                ref={ref}
                select={handleSelect}
            />
        </div>
    );


    return (
        <Layout>
            <div>
                <ToastContainer />
                {/* <p>{JSON.stringify(list)}</p> */}
                <Modal show={show} setShow={setShow} content={content} />
                {CalendarComponent()}
            </div>

        </Layout>
    )
}

export default Calendar;