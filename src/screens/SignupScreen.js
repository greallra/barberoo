import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import AutoComplete from '../components/AutoComplete'
import DropZone from '../components/DropZone'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SuccessModal from '../components/Modal';
import ClipLoader from "react-spinners/ClipLoader";

import { isEmail, isStrongPassword, isLength } from 'validator'
import { signup } from '../redux/actions/user'

import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
   marginTop: 10,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: '25ch',
    // },
  },
  textField: {
    minWidth: '300px',
    // height: '40px',
    marginRight: 10
  },
  formHelper: {
    margin: '5px 0px 5px 5px'
  }
}));


const Required = styled.label`
    color: var(--dark);
    font-size: 10px;
`
const Wrapper = styled.label`
 
`
const FieldWrapper = styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-top: 10px;
    // z-index: -1;
`
const Currency = styled.span`
  position: absolute;
  left: 2px;
`
const Location = styled.div`
  width: 400px;
`
const Error = styled.div`
  padding: 10px;
  font-size: 11px;
  background: var(--error-red-light);
  color: var(--error-red);
  width: 400px;
  margin: 3px auto;
  border-radius: .5rem;
`
const checkStyle = { color: "var(--success-green)" }
const errorStyle = { color: "var(--error-red)"  }

export default function Signup() {
    const classes = useStyles();
    const [username, setUsername] = useState('test3')
    const [usernameValid, setUsernameValid] = useState(false)
    const [first_name, setFirstName] = useState('Stu')
    const [last_name, setLastName] = useState('Martin')
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState('test3@gmail.com')
    const [emailValid, setEmailValid] = useState(false)
    const [user_type, setUserType] = useState('BARBER')
    const [user_type_valid, setUserTypeValid] = useState('BARBER')
    const [password, setPassword] = useState('Red1234!')
    const [confirmPassword, setConfirmPassword] = useState('Red1234!')
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [summary, setSummary] = useState('Im a great little barber')
    const [minPrice, setMinPrice] = useState('22.00')
    const [maxPrice, setMaxPrice] = useState('32.00')
    const [geo, setGeo] = useState({ address: '', lat: undefined, lng: undefined })
    const [geoValid, setGeoValid] = useState(false)
    const [files, setFiles] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [errors, setErrors] = useState({username: true, email: true, password: true, summary: true, minPrice: true, location: true, photos: true})
    const [submitAttempted, setSubmitAttempted] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    
    const dispatch = useDispatch()
    const signupStatus =  useSelector( store=> store.user.signupStatus)

    useEffect(() => {
      //Min 3 chars
      if(!username) return setUsernameValid(false);
      if(username && username.length >=3) setUsernameValid(true)
      else setUsernameValid(false)
    }, [username])
    useEffect(() => {
      //Must be a valid email format
      if(isEmail(email)) setEmailValid(true);
      else setEmailValid(false);
    }, [email])
    useEffect(() => {
      //Must be a valid email format
      if(user_type === 'BARBER' || user_type === 'CLIENT') setUserTypeValid(true);
      else setUserTypeValid(false);
    }, [user_type])

    useEffect(() => { 
      if(password === confirmPassword) setPasswordsMatch(true)
      else setPasswordsMatch(false)
    }, [password])
    useEffect(() => {
      if(password === confirmPassword) setPasswordsMatch(true)
      else setPasswordsMatch(false)
    }, [confirmPassword])
    useEffect(() => {
       // if(minPrice.test(/^\d+(,\d{1,2})?$/)) {
          //setMinPrice
       // }
       if(minPrice.length === 2) setMinPrice(minPrice + ".")
       
    }, [minPrice])
    // useEffect(() => {
    //   console.log("form submitted");
    //   console.log("errors", errors);
    //    //success modal if no errors, otherwise errros will render
    //    const filteredErrors = filterErrors(errors)
    //    const errorKeys = Object.keys(filteredErrors)
    //    if(errorKeys.length === 0) handleSignup()
 
    // }, [formSubmitted])

    function checkPassword(password){
      //Red1234!
      const defaultOptions = { 
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, 
        pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
      const defaultOptions2 = { 
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: true, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, 
        pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }

      
      return isStrongPassword(password, defaultOptions)
    }
    function handlePrice(e){
      
      if(minPrice.length === 5) return;
      else setMinPrice(e.target.value)
    }
    function handleKeyDown(e) {
      if(e.key === 'Backspace') setMinPrice(e.target.value)
    }
    console.log("signupStatus", signupStatus);
    async function handleSubmit(e) {
      e.preventDefault();
      if(usernameValid, emailValid, user_type_valid, passwordsMatch, summary.length > 5, minPrice.length === 5, geoValid , files.length > 0 ){
        const data  = {
          username,
          first_name,
          last_name,
          user_type,
          email,
          age,
          password,
          short_summary: summary,
          pricing: {
                basic: Number(minPrice),
                special1: Number(maxPrice)
            },
          geo: {
                name: geo.address,
                latitude: geo.lat,
                longitude: geo.lng
            },
          // work_photos: files,
          // reviews: []
        }
        console.log("sent", data );
        let test = await dispatch(signup(data));
  
      }

    }

    function filterErrors(errors) {
      let result = {}
      for(var key in errors) {
        if(errors[key]) {
          result[key] = true;
        }
      }
      return result;
    }

    const filteredErrors = filterErrors(errors)
    const errorKeys = Object.keys(filteredErrors)
    const lowerZindex = signupStatus === "successfull"

    return (
        <Wrapper>
          {/* {formSubmitted && errorKeys.length > 0 && errorKeys.map( key => <Error>{key}</Error>)} */}
           {/*  {errorKeys.length} + {errorKeys.length === 0 &&  "FORM IS VALID"} */}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FieldWrapper lowerZindex={lowerZindex}>
                <TextField 
                id="outlined-basic" label="Outlined" 
                variant="outlined" label="Username" value={username} 
                onChange={ (e) => setUsername(e.target.value) } 
                className={classes.textField}/> 
                {!username && <Required>Required</Required>}
                {username && username.length < 3 && <ErrorIcon style={errorStyle} />  }
                {username && username.length > 3 && <CheckCircleIcon style={checkStyle}/>  }
              </FieldWrapper>
              <FieldWrapper>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="First name" value={first_name} onChange={ (e) => setFirstName(e.target.value) } className={classes.textField}/> 
              </FieldWrapper>
              <FieldWrapper>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Last name" value={last_name} onChange={ (e) => setLastName(e.target.value) } className={classes.textField}/> 
              </FieldWrapper>
              <FieldWrapper>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Email" value={email} onChange={ (e) => setEmail(e.target.value) } className={classes.textField}/>
                {!email && <Required>Required</Required>}
                {email && !emailValid && <ErrorIcon style={errorStyle} />  }
                {email && emailValid && <CheckCircleIcon style={checkStyle}/>  }
          
              </FieldWrapper>
              <FieldWrapper>
                <FormControl variant="outlined" className={classes.formControl}>
                  <FormHelperText className={classes.formHelper}>Are you a barber or a client?</FormHelperText>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={user_type}
                    onChange={ (e) => setUserType(e.target.value) }
                    // label="User Type"
                    className={classes.textField}
                  >
                      <MenuItem value={"BARBER"}>Barber</MenuItem>
                      <MenuItem value={"CLIENT"}>Client</MenuItem>
                    </Select>
                  
                  </FormControl>
                  {!email && <Required>Required</Required>}
                  {user_type === 'CLIENT' && <CheckCircleIcon style={checkStyle}/>}
                  {user_type === 'BARBER' && <CheckCircleIcon style={checkStyle}/>}
                  </FieldWrapper>
                <FieldWrapper>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Password" value={password} onChange={ (e) => setPassword(e.target.value) } className={classes.textField}/>
                    {!password && <Required>Required</Required>}
                    {password && checkPassword(password) && <CheckCircleIcon style={checkStyle}/>}
                    {password && !checkPassword(password) && <ErrorIcon style={errorStyle}/>}
                </FieldWrapper>
                <FieldWrapper>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Confirm Password" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) } className={classes.textField}/>
                    {!confirmPassword && <Required>Required</Required>}
                    {confirmPassword && checkPassword(confirmPassword) && passwordsMatch && <CheckCircleIcon style={checkStyle}/>}
                    {confirmPassword && !checkPassword(confirmPassword) && <ErrorIcon style={errorStyle}/>}
                </FieldWrapper>
                <FieldWrapper>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Short Summary of your work" value={summary} onChange={ (e) => setSummary(e.target.value) } className={classes.textField}/>
                    {!summary && <Required>Required</Required>}
                    {summary && isLength(summary, {min: 10, max: 100}) && <CheckCircleIcon style={checkStyle}/>}
                    {summary && !isLength(summary, {min: 10, max: 100}) && <ErrorIcon style={errorStyle}/> }
                </FieldWrapper>
                <FieldWrapper>
                    <Currency>€</Currency><TextField id="outlined-basic" label="Outlined" variant="outlined" label="Minumum Price you charge" value={minPrice} onChange={handlePrice}  onKeyDown={handleKeyDown} className={classes.textField}/>
                    {!minPrice && <Required>Required</Required>}
                    {minPrice && isLength(minPrice, {min: 5, max: 5}) && <CheckCircleIcon style={checkStyle}/>}
                    {minPrice && !isLength(minPrice, {min: 5, max: 5}) && <ErrorIcon style={errorStyle}/> }
                </FieldWrapper>
                <FieldWrapper>
                    <Currency>€</Currency>                
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Maximum Price (Specials)" value={maxPrice} onChange={ (e) => setMaxPrice(e.target.value) } className={classes.textField}/>  
                    {/* {!minPrice && <Required>Required</Required>} */}
                </FieldWrapper>
                <Location>
                  <FormHelperText className={classes.formHelper}>Set your location</FormHelperText>
                  <FieldWrapper>
                    <AutoComplete setGeo={setGeo} geo={geo} setGeoValid={setGeoValid} />
                    <Required >Required</Required>
                    {geo.lat && geo.lng && geo.address && <CheckCircleIcon style={checkStyle}/>}
                  </FieldWrapper>
                 
           
                </Location>

                <FieldWrapper>
                  <FormHelperText className={classes.formHelper}>Upload some photo's of your work</FormHelperText>
                </FieldWrapper>
                <FieldWrapper>
                  <DropZone files={files} setFiles={setFiles} />
                </FieldWrapper>
                
                
               
                <Button variant="contained" color="secondary" type="submit">
                Submit
                </Button>
                <ClipLoader 
                color={"red"} 
                loading={signupStatus === "loading"} 
                // css={override} 
                size={150} />
            </form>
                  {/* {setSubmitAttempted && } */}
            <SuccessModal isOpen={signupStatus === "successfull"} setIsOpen={setIsOpen} />
           
        </Wrapper>
    )
}


let x  = {
	"username": "Ryano",
	"first_name": "Ryan",
	"last_name": "Gill",
	"user_type":"BARBER",
	"email": "ryan@gmail.com",
	"age": "21",
	"password": "Red1234!",
	"short_summary": "hey, I am a great ould barber with great styles",
	"pricing": {
         "basic": 22.50,
         "special1": 23.40
     },
    "geo": {
         "name": "dublin",
         "latitude": 53.3228,
         "longitude": -6.2233
    },
    "rating": {
       "aggregate_rating": "4.4"      
     },
    "work_photos": [],
    "reviews": []
}




  //  //username
  //  if(!usernameValid) setErrors( (prevState) => ({...prevState, username: true }) )
  //  else setErrors( (prevState) => ({...prevState, username: false }) )
  //  //email
  //  if(!emailValid) setErrors( (prevState) => ({...prevState, email: true }) )
  //  else setErrors( (prevState) => ({...prevState, email: false }) )
  //  //user type
  //  if(!user_type_valid) setErrors( (prevState) => ({...prevState, userType: true }) )
  //  else setErrors( (prevState) => ({...prevState, userType: false }) )
  //  //passwords
  //  if(!checkPassword(password) || !checkPassword(confirmPassword || !passwordsMatch)) setErrors( (prevState) => ({...prevState, password: true }) )
  //  else setErrors( (prevState) => ({...prevState, password: false }) )
  //  //summary
  //  if(!isLength(summary, {min: 10, max: 100})) setErrors( (prevState) => ({...prevState, summary: true }) )
  //  else setErrors( (prevState) => ({...prevState, summary: false }) )
  //  //min price
  //  if(minPrice.length !== 5) setErrors( (prevState) => ({...prevState, minPrice: true }) )
  //  else setErrors( (prevState) => ({...prevState, minPrice: false }) )
  //  //geo
  //  if(!geo.lat || !geo.lng || !geo.address) setErrors( (prevState) => ({...prevState, location: true }) )
  //  else setErrors( (prevState) => ({...prevState, location: false }) )
  //  //photos
  //  if(files.length === 0 ) setErrors( (prevState) => ({...prevState, photos: true }) )
  //  else setErrors( (prevState) => ({...prevState, photos: false }) )
  //  //success modal
  //  const errorKeys = Object.keys(filteredErrors)
  //  console.log("submit", errorKeys);
  //  if(errorKeys.length > 0) {
  //    window.scrollTo(0, 0)
  //  } else {
  //    alert("success")
  //  }