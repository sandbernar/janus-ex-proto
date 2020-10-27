Janus.init({
   debug: true,
   dependencies: Janus.useDefaultDependencies(), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
   callback: function() {
           // Done!
           // console.log('hello');	
   }});

var janus = new Janus({
	// server: 'ws://localhost:8188',
	server: 'http://localhost:8088/janus',
	success: function() {
		console.log('connected!');
	},
	error: function() {
		console.log('error creating janus');
	},
	destroyed: function() {
		console.log('destroyed connection');
	}
});

function attach() {
	
	janus.attach({
		plugin: "janus.plugin.echotest",
		success: function(pluginHandle) {
			// plugin attached
			console.log('plugin attached!');
		},
		error: function(cause) {
			console.log('error attaching');
			console.log(cause);
		},
	    consentDialog: function(on) {
	    	console.log('consent');
	            // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
	    },
	    onmessage: function(msg, jsep) {
	    	console.log('message');
	            // We got a message/event (msg) from the plugin
	            // If jsep is not null, this involves a WebRTC negotiation
	    },
	    onlocalstream: function(stream) {
	    	console.log('stream');
	            // We have a local stream (getUserMedia worked!) to display
	    },
	    onremotestream: function(stream) {
	    	console.log('remote stream');
	            // We have a remote stream (working PeerConnection!) to display
	    },
	    oncleanup: function() {
	    	console.log('cleanup');
	            // PeerConnection with the plugin closed, clean the UI
	            // The plugin handle is still valid so we can create a new one
	    },
	    detached: function() {
	    	console.log('detached');
	            // Connection with the plugin closed, get rid of its features
	            // The plugin handle is not valid anymore
	    }

	});
	
}