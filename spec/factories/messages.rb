FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    # image File.open("#{Rails.root}/public/uploads/message/image/no_image.jpg")
    user
    group
  end
end
