export default (state = {}, action) => {
  switch (action.type) {
    case 'TO_HOME':
      return {
        redirect: true
      }
    default:
      return state;
  }
}