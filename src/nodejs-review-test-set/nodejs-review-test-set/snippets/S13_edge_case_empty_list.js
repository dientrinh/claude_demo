class RatingService {
  averageRating(reviews) {
    let sum = 0;
    for (const review of reviews) {
      sum += review.score;
    }
    return sum / reviews.length;
  }
}

module.exports = RatingService;
