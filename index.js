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

  ext.set_alarm = function(time) {
    window.setTimeout(function() {
      alarm_went_off = true;
    }, time * 1000);
  };

  let lastMessage = null
  let messageTriggered = true

  bot.on("message", function (message) {
    lastMessage = message
    messageTriggered = true
  })

  ext.when_message = function() {
    if(messageTriggered) {
      messageTriggered = false
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
    bot.login(token)
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
