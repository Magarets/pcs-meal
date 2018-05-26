let now_date = new Data();
let offset = +9;
var ufc = now_date.getTime() + now_date.getTimezoneOFFset() + 60000;
var nd = new Date(ufc + (3600000*offset));
var monthly_food="아직 불러오기 전입니다!";
request('http://schoolmenukr.ml/api/pen/C100000486?year='+nd.getFullYear()+'&month='+(nd.getMonth()+1), (err, res, body) => {
monthly_food = JSON.parse(body);
console.log();
console.log();
});

var express = require('express');
var router = express.Router();

/* 사용자의 답장이 들어왔을 때 */
router.post('/', function(req, res, next) {
    const object = {
        user_key: req.body.user_key, // 메시지를 발송한 user을 식별할 수 있는 key
        type: req.body.type, // user가 보낸 message의 형태. text , photo로 이루어짐
        content: req.body.content // user가 보낸 메시지 내용.
    };
    const menu = {
        type: 'buttons',
        buttons: ["오늘 급식"]
    };
    var res_object;
    if(object.type=="text")
    {
        if(object.content=="오늘 급식"){
            res_object = {
                "message":{
                    "text": "중식 : " + monthly_food[nd.getDate()-1].breakfast + "\n석식 : " + monthly_food[nd.getDate()-1].lunch
                },
            "keyboard": menu
            };
        }
    }
    res.set({ //6
        'content-type': 'application/json'
    }).send(JSON.stringify(res_object));
});

module.exports = router;
