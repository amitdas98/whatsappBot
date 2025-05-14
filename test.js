
fetch("https://webhook.site/12349637-7a89-436e-b48b-e13f194bb4e7", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "data": {
            "key": {
                "remoteJid": "+919826000000"
            },
            "messages": {
                "message": {    
                    "conversation": "Hello, how are you?"
                }
            }
        }
    })
});