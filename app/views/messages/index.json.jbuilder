json.array! @new_messages.each do |message|
  json.content message.content
  json.timestamp message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name message.user.name
end
