import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Platform, TextInput, StyleSheet} from 'react-native';
import { Button, GestureResponderEvent } from 'react-native';
import { TextLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { useMutation } from '@apollo/client';
import { SignUpResponse } from './gqlTypes';
import { SIGN_UP } from './gql';
import * as Auth from '../../helpers/auth'
import * as NavigationService from '../../navigation/native/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VALID_EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const VALID_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

export function SignupScreen() {
    const router = useRouter()
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');  
    const [rePassword, setRePassword] = React.useState('');      
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('')
    const [signUpUser, { data, loading, error, reset}] = useMutation<SignUpResponse>(SIGN_UP);

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: getInputWidth(),
        },
      });

    const buttonHandler = (event: GestureResponderEvent) => {
        event.preventDefault();
        if(validateEmail(email)  && validatePassword(password, rePassword)){
            const signUpReq = { 
                firstName: firstName,
                lastName:lastName,
                email: email,
                password: password,
                rePassword: rePassword
            }
            signUpUser({ variables: { signUpReq } });
        }
    };

    function validateEmail(email: string) {
        let valid = VALID_EMAIL_REGEX.test(email)
        if(!valid){
            console.log("Invalid email format: " + email)
            setEmailError('Email is invalid');
        }else {
            console.log("Valid email format: " + email)
            setEmailError("");
        }
        setEmail(email);
        return valid
    }

    function validatePassword(password: string, rePassword: string) {
        let validPassword = VALID_PASSWORD_REGEX.test(password)
        let passwordsMatch = password === rePassword
        if(!validPassword){
            console.log("Invalid password format")
            setPasswordError('Password is invalid');
        }else if(!passwordsMatch){
            console.log("Passwords do not match")
            setPasswordError("Passwords do not match")
        }else {
            console.log("Valid password format and passwords match")
            setPasswordError("");
        }
        setPassword(password);
        setRePassword(rePassword);
        return validPassword && passwordsMatch
    }

    function getEmailInputBorderColor(): string{
        if(emailError !== '' && email.length > 0){
            return 'red'
        }else {
            return 'black'
        }
    }

    function getPasswordInputBorderColor(): string{
        if(passwordError !== '' && password.length > 0){
            return 'red'
        }else {
            return 'black'
        }
    }

    function getInputWidth(){
        if(Platform.OS === 'web'){
            return ''
        }else {
            return '66%'
        }
    }
    
    useEffect(() => {
        if (loading) console.log("Submitting...");
        if (error) console.log("Error Logging in..." + error.message);
        if(data != null){
            console.log("login response: " + JSON.stringify(data));
            if (data?.signUp.success){
                console.log(data)
                // Save the token
                Auth.storeToken(JSON.stringify(data?.signUp.token))

                // Set the UserContext
                AsyncStorage.setItem('user', JSON.stringify(data.signUp.user))

                // clear forms and reset data
                reset()
                setEmail('')
                setPassword('')
    
                // Navigate to home screen
                if(Platform.OS === 'web'){
                    router.replace('/login')
                }else {
                    NavigationService.navigationRef.resetRoot({
                        index: 0,
                        routes: [{name: 'login'},],
                    });
                }      
            }else if(!data?.signUp.success){
                console.log("Failed to log in: " + data?.signUp.message)
            }
        }
        
    }, [loading, error, data, reset, router]);

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="mb-4 text-center font-bold">Sign Up Screen</Text>
            {error != null && <Text style={{color: 'red'}}>{error.message}</Text>}
            {!data?.signUp.success && <Text style={{color: 'red'}}>{data?.signUp.message}</Text>}
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(e) => setFirstName(e)}
                style={{...styles.input}}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(e) => setLastName(e)}
                style={{...styles.input}}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(e) => validateEmail(e)}
                style={{...styles.input, borderColor: getEmailInputBorderColor()}}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(e) => validatePassword(e, rePassword)}
                secureTextEntry

                style={{...styles.input, borderColor: getPasswordInputBorderColor()}}
            />
            <TextInput
                placeholder="Re-enter Password"
                value={rePassword}
                onChangeText={(e) => validatePassword(password, e)}
                secureTextEntry

                style={{...styles.input, borderColor: getPasswordInputBorderColor()}}
            />
            <Button onPress={buttonHandler} title="Sign Up"></Button>
            <TextLink href="/login">Already have an account? Login Now</TextLink>
        </View>
    )
       
}