$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var html = `<div class="chat_block",data-id="#{message.id}">
                  <div class="user_name">
                    ${ message.user_name }
                  </div>
                  <div class="date">
                    ${ message.timestamp }
                  </div>
                  <div class="message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message_data) {
      var html = buildHTML(message_data);
      $('.chat_area').append(html)
      $('.form__message').val('')
      $('.main_contents').animate({scrollTop: $('.main_contents')[0].scrollHeight}, 'normal', 'swing');
    })
    .fail(function() {
      alert('メッセージを入力してください。');
    })
    .always(function(){
      $(".form__send-btn").removeAttr("disabled");
    });
  })

  function insertMessages(message) {
    var html = `<div class="chat_block",message-id="#{message.id}">
                  <div class="user_name">
                    ${ message.name }
                  </div>
                  <div class="date">
                    ${ message.timestamp }
                  </div>
                  <div class="message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`
    $('.main_contents').append(html);
  }


  function update() {
    var last_message_id = $('.chat_block').last().data('message-id');
    $.ajax({
      type: 'GET',
      url: location.href,
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function(messages) {
      if (messages.length !== 0 ){
        messages.forEach(function(messages) {
          var insertMessages = buildHTML(messages);
          $('.chat_area').append(insertMessages);
        });
        $('.main_contents').animate({scrollTop: $('.main_contents')[0].scrollHeight}, 'normal', 'swing');
      }
    })
    .fail(function(messages) {
      alert('自動更新が失敗しました');
    });
  }

  $(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      // setInterval(update,5000);
    } else {
      clearInterval(interval);
    }
  });
});

