// 先初始化 emailjs（只需要初始化一次，建议写在main.js或email.js顶部）
emailjs.init("J0M9Mc1uS1LlPMqUp"); // ← 改成你自己的public key

function initContactButton() {
  var sendEmailDiv = document.getElementById("send-email");
  if ("computer" == deviceName) {
    sendEmailDiv.onclick = function () { sendEmail(); };
  } else {
    sendEmailDiv.addEventListener("touchstart", sendEmail, false);
  }
}

function sendEmail() {
  hideContactConfirmationContainer();
  positionContactConfirmationContainer();
  var c = $("#email-address").val();   // email
  var d = $("#email-subject").val();   // subject
  var e = $("#email-message").val();   // message
  var a, b;

  // 邮箱格式校验
  if (c.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$)/i)) {
    if (e.length < 1 && (b = !1, focusMessage()),
        e.length >= 1 && (b = !0),
        d.length < 1 && (a = !1, focusSubject()),
        d.length >= 1 && (a = !0), 1 == a && 1 == b) {
      var f = {
        "email-address": c,
        "email-subject": d,
        "email-message": e
      };
      setTimeout(function(){ showContactConfirmationContainer(2); }, 200); // "Sending..."
      setTimeout(function(){ send(f); }, 2000);
    } else {
      setTimeout(function(){ showContactConfirmationContainer(1); }, 200); // "Please fill out all..."
    }
  } else {
    focusEmail();
    setTimeout(function(){ showContactConfirmationContainer(0); }, 200); // "Please enter a valid..."
  }
  return false;
}

function send(a) {
  // 你的emailjs模版只用到了 email, subject, message（和后台变量名完全一致！）
  emailjs.send('service_sgmxopd', 'template_gvwkrda', {
    email: a["email-address"],      // 填给"Reply To"和展示
    subject: a["email-subject"],    // 填给"From Name"和主题
    message: a["email-message"]     // 填给{{message}}
  }).then(function(response) {
    hideContactConfirmationContainer();
    positionContactConfirmationContainer();
    setTimeout(function(){ showContactConfirmationContainer(4); }, 200); // "Thank you!"
    clearAllInputField();
  }, function(error) {
    hideContactConfirmationContainer();
    positionContactConfirmationContainer();
    setTimeout(function(){ showContactConfirmationContainer(3); }, 200); // "Something wrong..."
  });
}

// 初始化
initContactButton();
