
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Associeition
- has_many :members
- has_many :messages
- has_many :groups, through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Associeition
- belongs_to :user
- belongs_to :group


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Associeition
- has_many :members
- has_many :messages
- has_many :users, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|timestamp|datetime|null: false|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Associeition
- belongs_to :user
- belongs_to :group
