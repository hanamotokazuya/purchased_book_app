class Book < ApplicationRecord
  belongs_to :user
  has_one_attached :image
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :category, presence: true
  validates :image, content_type: { in: %w[image/jpeg image/jpg image/gif image/png], message: "must be a valid image format" },
                    size: { less_than: 1.megabytes, message: "should be less than 1MB" }
end
