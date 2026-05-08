import { Controller, Get, Patch, Param } from '@nestjs/common'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('pending')
  getPendingReviews() {
    return this.reviewsService.getPendingReviews()
  }

  @Patch(':id/complete')
  completeReview(@Param('id') id: string) {
    return this.reviewsService.completeReview(id)
  }
}
