(function(ext) {
  let Discord = require("discord.js")
  let bot = new Discord.Client()
  // Cleanup function when the extension is unloaded
  ext._shutdown = function() {};

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  ext._getStatus = function() {
    return {
      status: 2,
      msg: 'Ready'
    };
  };

  let lastMessage = null
  let messageTriggered = true

  bot.on("message", function (message) {
    console.log("Got message!")
    lastMessage = message
    messageTriggered = false
  })

  ext.when_message = function() {
    console.log("Waiting for message")
    if(!messageTriggered) {
      messageTriggered = true
      return true
    } else return false
  };

  ext.grab_message_content = function () {
    return lastMessage.content
  }

  ext.reply_to_message = function (content) {
    lastMessage.channel.send(content)
  }

  ext.login = function (token) {
    bot.login(token).then(function() {
      console.log("Ready!")
    }).catch(function(err) {
      console.log("Error")
    })
  }

  // Block and block menu descriptions
  var descriptor = {
    blocks: [
      ["r", "message content", "grab_message_content"],
      [" ", "send message %s", "reply_to_message"],
      ["h", "message", "when_message"],
      [" ", "login to discord with token %s", "login"]
    ]
  };

  // Register the extension
  ScratchExtensions.register('Discord extension', descriptor, ext);
})({});
