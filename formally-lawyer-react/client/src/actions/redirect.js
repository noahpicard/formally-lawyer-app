export const redirect = () => dispatch => {
  dispatch({
    type: 'TO_HOME',
    payload: 'true'
  })
}