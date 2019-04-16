export const storeUser = (user) => dispatch => {
  dispatch({
    type: 'SIGN_IN',
    payload: user
  })
}