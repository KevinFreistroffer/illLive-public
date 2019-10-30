module.exports = (user) => {
  return {
    username: user.username,
    email: user.email,
    accountConfirmed: user.accountConfirmed,
    meals: user.meals,
    foodDrinks: user.foodDrinks,
    vitamins: user.vitamins,
    measurements: user.measurements,
    confirmedCookieFlag: user.confirmedCookieFlag,
    confirmed24HourMealResetMessage: user.confirmed24HourMealResetMessage
  }
}