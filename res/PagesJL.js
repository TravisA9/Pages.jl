"use strict";

var Pages = (function () {

    var session_id = "{{session_id}}";
    var sock = new WebSocket('ws://'+window.location.host);
    sock.onmessage = function( message ){
        var msg = JSON.parse(message.data);
        var type = msg.type,
            data = msg.data;
        switch(type) {
            case "script":
                eval(data);
                break
            case "say":
                console.log(data);
                break
        }
    }

    function notify(name) {
        sock.send(JSON.stringify({"name":"notify","session_id":session_id,"args":name}))
    }

    function message(id,name,args) {
        sock.send(JSON.stringify({"name":"message","session_id":session_id,"args":[id,name,args]}))
    }

    function broadcast(name,args) {
        sock.send(JSON.stringify({"name":"broadcast","session_id":session_id,"args":[name,args]}))
    }

    var addget = function (c, name) {
		Object.defineProperty(c, name, {
			get: function () { return eval(name); },
			enumerable: true,
			configurable: true
		});
		return c;
	};

    var c = {};
    c = addget(c, "sock");
    c = addget(c, "notify");
    c = addget(c, "message");
    c = addget(c, "broadcast");
	return c;
})();
