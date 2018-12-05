FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open('spec/fixtures/no_image.jpg')
    user
    group
  end
end
