json.content @message.content
json.timestamp @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name

