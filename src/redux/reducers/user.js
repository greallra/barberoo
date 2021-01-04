


  const defaultState = {
    isAuthenticated: false,
    loginErrorMessage: '',
    signupStatus: undefined
  };
  
  export const user = (state = defaultState, { type, payload, token }) => {
    switch (type) {
      case 'SET_USER':
        if(!token) return {...state, ...payload, isAuthenticated: true,  loginErrorMessage: '' }
        return {...state, ...payload, token, isAuthenticated: true,  loginErrorMessage: '' }
      case 'SET_LOGIN_ERROR':
        return {...state, isAuthenticated: false,  loginErrorMessage: payload }
      case 'SET_SIGNUP_STATUS':
        return {...state, signupStatus: payload }
      default:
        return state;
    }
    
  };
  
