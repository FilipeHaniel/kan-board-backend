import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewsService {
  private reviews: Review[] = []

  async createReviewsForTask(taskId: string) {
    const now = new Date()
    // const intervals = [1, 7, 30]
    const intervals = [0]

    for (const days of intervals) {
      const scheduled = new Date()

      scheduled.setDate(now.getDate() + days)

      this.reviews.push({
        id: randomUUID(),
        taskId,
        scheduledFor: scheduled,
        completed: false,
      })
    }
  }

  async getPendingReviews() {
    const now = new Date()

    return this.reviews.filter(
      (review) => !review.completed && review.scheduledFor <= now,
    )
  }

  async completeReview(reviewId: string) {
    const review = this.reviews.find((r) => r.id === reviewId)
    if (!review) return null
    review.completed = true

    return review
  }
}
