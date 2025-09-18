// import {useLoginMutation} from '../../api/userAuth.api';
// import {
//   GoogleSignin,
//   statusCodes,
//   isErrorWithCode,
//   isSuccessResponse,
//   isNoSavedCredentialFoundResponse,
// } from '@react-native-google-signin/google-signin';
// import {useCallback, useEffect} from 'react';
// import {useAppSelector} from './use-app-selector';
// import {
//   initUser,
//   selectFcmToken,
//   selectUserLanguage,
// } from '../../features/auth/userSlice';
// import {useAppDispatch} from './use-app-dispatch';
// import {Navigation} from '../../types';
// import {useNavigation} from '@react-navigation/native';
// import {SocialLoginTypeEnum} from '../../api/interfaces/shared/social_login.enum';
// import {isSocialLogin} from '../../api/interfaces/shared/is_social_login.enum';
// import Toast from 'react-native-toast-message';
// import {LoginErrors} from '../../api/interfaces/shared/loginErrors.enum';
// import {t} from 'i18next';

// const useGoogleSignIn = () => {
//   const [login] = useLoginMutation();

//   const appLanguage = useAppSelector(selectUserLanguage);
//   const selectFirBaseFcmToken = useAppSelector(selectFcmToken);

//   const dispatch = useAppDispatch();
//   const navigation: Navigation = useNavigation();
//   useEffect(() => {
//     GoogleSignin.configure();
//   }, []);

//   const handleGoogleSignIn = useCallback(async () => {
//     try {
//       const googleSigninResponse = await GoogleSignin.signIn();

//       if (googleSigninResponse && isSuccessResponse(googleSigninResponse)) {
//         try {
//           const response = await login({
//             name: googleSigninResponse.data.user.name ?? '',
//             email: googleSigninResponse.data.user.email,
//             isSocialLogin: isSocialLogin.YES,
//             social_login_type: SocialLoginTypeEnum.GOOGLE,
//             language: appLanguage,
//             fcm_token: selectFirBaseFcmToken ?? null,
//           }).unwrap();
//           dispatch(initUser(response));
//           if (response?.status === 'success') {
//             navigation.navigate('MainHomeStack');
//           }
//           Toast.show({
//             type: 'success',
//             text1: response.message,
//             position: 'top',
//           });
//         } catch (error: any) {
//           Toast.show({
//             type: 'error',
//             text1: t('login.errorText1'),
//             text2:
//               error?.data?.message === LoginErrors.FAILED_AUTHENTICATION
//                 ? t(`login.failed_authentication`)
//                 : error?.data?.message || error.message,
//             position: 'bottom',
//           });
//         }
//       } else if (
//         isNoSavedCredentialFoundResponse(await GoogleSignin.signInSilently())
//       ) {
//         // Android and Apple only.
//         // No saved credential found (user has not signed in yet, or they revoked access)
//         // call `createAccount()`
//       }
//     } catch (error) {
//       console.error(error);
//       if (isErrorWithCode(error)) {
//         switch (error.code) {
//           case statusCodes.SIGN_IN_CANCELLED:
//             // Android-only, you probably have hit rate limiting.
//             // You can still call `presentExplicitSignIn` in this case.
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//             // Android: play services not available or outdated.
//             // Get more details from `error.userInfo`.
//             // Web: when calling an unimplemented api (requestAuthorization)
//             // or when the Google Client Library is not loaded yet.
//             break;
//           default:
//           // something else happened
//         }
//       } else {
//         // an error that's not related to google sign in occurred
//       }
//     }
//   }, [appLanguage, dispatch, login, navigation, selectFirBaseFcmToken]);

//   return {
//     handleGoogleSignIn,
//   };
// };

// export default useGoogleSignIn;
