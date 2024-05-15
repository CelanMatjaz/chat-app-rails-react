class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true, length: { minimum: 8, maximum: 20 }
  validates :password_confirmation, presence: true, length: { minimum: 8, maximum: 20 }
  validates :display_name, presence: true, length: { minimum: 5, maximum: 20 }

  has_secure_password

  has_many :rooms, dependent: :delete_all
  has_many :room_user, dependent: :delete_all
  has_many :messages, dependent: :delete_all

  def as_json(_options = {})
    {
      id:,
      email:,
      display_name:,
      created_at:,
      updated_at:
    }
  end
end
