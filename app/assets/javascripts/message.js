$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var imageUrl = message.image ? `<img class="lower-message__image" src="${message.image}"` : ''
    var text = message.text ? `${message.text}` : ''
    var html = `<div class="chat_block",data-id="#{message.id}">
                  <div class="user_name">
                    ${ message.user_name }
                  </div>
                  <div class="date">
                    ${ message.timestamp }
                  </div>
                  <div class="message">
                    <p class="lower-message__content">
                      ${ text }
                    </p>
                  </div>
                  </div>
                    ${ imageUrl }
                  </div>
                </div>`
    return html;
  }

  function Scroll(){
    $('.main_contents').animate({scrollTop: $('.main_contents')[0].scrollHeight}, 'normal', 'swing');
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
      Scroll()
    })
    .fail(function() {
      alert('メッセージを入力してください。');
    })
    .always(function(){
      $(".form__send-btn").removeAttr("disabled");
    });
  })

  var interval = setInterval(function(){
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.chat_block').last().data('message-id');
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: last_message_id },
        dataType: 'json'
      })
      .done(function(data) {
        var insertMessages = "";
        data.forEach(function(message){
          insertMessages += buildHTML(message);
          $('.chat_area').append(insertMessages);
        })
        Scroll()
      })
      .fail(function(messages) {
        alert('自動更新が失敗しました');
      })
    } else {
      clearInterval(interval);
    }
  } , 5000);
});

