$(function() {
  function buildHTML(message_data) {
    var html = `<div class="chat_block">
                  <div class="user_name">
                    ${ message_data.user_name }
                  </div>
                  <div class="date">
                    ${ message_data.timestamp }
                  </div>
                  <div class="message">
                    <p class="lower-message__content">
                      ${ message_data.message }
                    </p>
                  </div>
                </div>`
  }
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(this);
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
});
