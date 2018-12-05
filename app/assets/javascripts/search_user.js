$(document).on('turbolinks:load', function() {
  var user_list = $("#user-search-result")
  var chat_member = $('#chat-group-users')

  function appendUser(user) {
    var html = '<div class="chat-group-user clearfix">'+
                  '<p class="chat-group-user__name">'+ user.name + '</p>'+
                    '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="' + user.id + '" data-user-name="' + user.name + '">追加</a>'+
                '</div>';
    user_list.append(html);
  }

  function appendNoUser(user) {
    var html = '<div class="chat-group-user clearfix">'+
                      '<p class="chat-group-user__name">' + user + '</p>'+
                '</div>';
    user_list.append(html);
  }

  function appendChatMember(user_id,user_name) {
    var html = '<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-' + user_id + '">'+
                  '<input name="group[user_ids][]" type="hidden" value="' + user_id + '">'+
                  '<p class="chat-group-user__name">' + user_name + '</p>'+
                  '<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>'+
                '</div>';
  chat_member.append(html);
}

  $(".chat-group-form__input").on("keyup", function(e) {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (input.length !== 0){
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("ユーザーの検索に失敗しました")
    })
  });

  $(document).on("click",".chat-group-user__btn--add",function(e) {
    var user_id = $(this).data('user-id')
    var user_name = $(this).data('user-name')
    appendChatMember(user_id,user_name);
    $('.chat-group-form__input').val('')
    $(this).parent().remove();
  });

  $(document).on("click",".chat-group-user__btn--remove",function(e) {
    var user_id = $(this).data('id')
    var user_name = $(this).data('name')
    $(this).parent().remove();
  });
});
