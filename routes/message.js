var express = require('express');
var router = express.Router();

/*사용자의 답장이 들어왔을때*/
router.post('/', function(req, res, next) {
    const object = {
        user_key: req.body.user_key,// 메시지를 발송한 user식별
        type: req.body.type,//user가 보낸 메시지의 형태
        content: req.body.content//유저가 보낸 메시지 내용
    };
    const menu = {
        type: 'buttons',
        buttons: ["노래 추천해줘.", "네 노래로 추천해줘."]
    };
    var res_object;
    if(object.type=="text"){
        if(object.content=="노래 추천해줘."){
            res_object = {
                "message": {
                    "text": '조지 - boat 어때?'
                },
                "keyboard": menu
                };
            }
            else if(object.content=="네 노래로 추천해줘."){ //5
            res_object = {
                 "message": {
                    "text": 'Jinyo - 수면증 어때?'
                },
                "keyboard": menu
                };
            }
            else{
                res_object = {
                "message": {
                    "text": object.content
                },
                "keyboard": menu
                };
            }
    }
     res.set({
    'content-type': 'application/json'
    }).send(JSON.stringify(res_object));
});

module.exports = router;