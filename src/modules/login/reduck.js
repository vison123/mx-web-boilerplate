import fetchData from '../../utils/fetch'
import api from '../../global/api'
import { message } from 'antd'
import storage from '../../utils/storage'
import { createAction } from 'redux-actions'

// ===========================> Action Types <=========================== //

export const LOGIN = 'spa/login'

// ===========================> Actions <=========================== //

export const userLoginAct = arg => dispatch => {
  return fetchData(dispatch, api.user.login, arg)
    .then(res => {
      if (res.code !== 0) {
        message.error(res.errmsg)
      } else {
        dispatch(createAction(LOGIN)(res.data))
        storage.set('user', res.data)
        return res
      }
    })
}

export const userLogout = arg => dispatch => {
  fetchData(dispatch, api.logout, arg)
    .then(res => {
      if (res.code !== 0) {
        message.error(res.errmsg)
      } else {
        storage.clear()
        location.reload()
      }
    })
}

// ===========================> Reducer <=========================== //

let initState = {
  userName: 'weisen',
  accessToken: '39df22f6fc6440adad29035aaf631d29'
}

export const userLogin = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
