import React from 'react';
import { G, Path } from 'react-native-svg';

import { Padlock } from './Icons/padlockIcon';
import { UserInCircleIcon } from './Icons/userInCircleIcon';
import { UserRegIcon } from './Icons/userRegIcon';
import { Mail } from './Icons/mail'
import { BackArrow } from './Icons/backArrow'
import { LogoutIcon } from './Icons/logoutIcon'


// Each nameValuePair can be:
// * Name: <Svg />; or
// * Name: { svg: <Svg />, viewBox: '0 0 50 50' }

export default {
    Padlock: Padlock,
    UserInCircleIcon: UserInCircleIcon,
    UserRegIcon: UserRegIcon,
    Mail: Mail,
    BackArrow: BackArrow,
    LogoutIcon: LogoutIcon
}
