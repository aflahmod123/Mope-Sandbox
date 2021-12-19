function devip(ws) {

	if (ws._socket.remoteAddress == '::1' || ws._socket.remoteAddress == '5e67-203-96-129-111.ap.ngrok.io') {
		{
			ws.isdeveloper = true
			//PLAYER IS DEVLOPER

		}
	}




}

devip.prototype = {
};
module.exports = devip;