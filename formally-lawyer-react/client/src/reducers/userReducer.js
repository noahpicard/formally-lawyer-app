export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state, // object spread to avoid === equality
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    default:
      return state
  }
}