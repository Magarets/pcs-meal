var express = require('express');
var request = require('request');
var router = express.Router();

let now_date = new Date();
let offset = +9;
var ufc = now_date.getTime() + now_date.getTimezoneOffset() + 60000;
var nd = new Date(ufc + (3600000*offset));
var nd2 = new Date(ufc + (3600000*offset));
var monthly_food=[0,0];
var request = require('request');
request('http://schoolmenukr.ml/api/pen/C100000522?year='+nd.getFullYear()+'&month='+(nd.getMonth()+1), (err, res, body) => {
monthly_food[0] = JSON.parse(body);
});
request('http://schoolmenukr.ml/api/pen/C100000522?year='+nd2.getFullYear()+'&month='+(nd2.getMonth()+1), (err, res, body) => {
monthly_food[1] = JSON.parse(body);
});

/* 처음 들어왔을 때 */
const menu = {
   type: 'buttons',
   buttons: ["오늘 급식","내일 급식","일주일 급식"]
};
router.get('/keyboard', function(req, res, next) {
    res.set({
    'content-type': 'application/json'
    }).send(JSON.stringify(menu));
});

router.post('/message', function(req, res, next) {
    const object = {
        user_key: req.body.user_key, // 메시지를 발송한 user을 식별할 수 있는 key
        type: req.body.type, // user가 보낸 message의 형태. text , photo로 이루어짐
        content: req.body.content // user가 보낸 메시지 내용.
    };
    var res_object;
    if(object.type=="text"){
        if(object.content=="오늘 급식"){
            res_object = {
                "message":{
                    "text": makeText(nd)
                },
            "keyboard": menu
            };
        }
        else if(object.content=="내일 급식"){
            var temp=new Date(ufc + (3600000*offset));
            temp.setMonth(nd.getMonth(),nd.getDate()+1);
            res_object = {
                "message":{
                    "text":makeText(temp)
                },
                "keyboard":menu
            };
        }
        else if(object.content=="일주일 급식"){
            var week=[],text="";
            for(i=0;i<7;i++){
                var temp=new Date(ufc + (3600000*offset));
                temp.setMonth(nd.getMonth(),nd.getDate()+i);
                week.push(temp);
            }
            for(i=0;i<7;i++){
                text+=makeText(week[i]);
            }
            res_object = {
                "message":{
                    "text":text
                },
                "keyboard":menu
            };
        }
    }
    res.set({ 
        'content-type': 'application/json'
    }).send(JSON.stringify(res_object));
});


function makeText(day){
    console.log(day);
    var aa=
    "중식 : " + monthly_food[day.getMonth()-nd.getMonth()-nd.getMonth()][day.getDate()-1].breakfast + "\n" +
    "석식 : " + monthly_food[day.getMonth()-nd.getMonth()-nd.getMonth()][day.getDate()-1].launch + "\n";
    aa=aa.replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,'');
    aa=(day.getMonth()+1)+"월 " +(day.getDate())+"일 급식정보\n" + aa;
    return aa;
}

module.exports = router;