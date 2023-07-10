import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';
import { useState } from 'react';
import * as registerService from '../../../../services/registerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CheckIcon, WarningIcon } from '~/components/Icons/Icons';

const { default: Button } = require('~/components/Button/Button');
const { default: Header } = require('~/components/Propper/Menu/Header');

const cx = classNames.bind(styles);

const FormRegister = ({
    handleOnBack,
    type,
    choose_type,
    title_type,
    placeholder_user,
    placeholder_code,
    handleRegisterEmail,
    handleSubRegister,
}) => {
    const [valueUser, setValueUser] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [valueComfirmPass, setValueComfirmPass] = useState('');
    const [valueCode, setValueCode] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    // user
    const [validateUser, setValidateUser] = useState(false);
    const [validateUserPhone, setValidateUserPhone] = useState(false);
    const [exist, setExist] = useState(false);

    // CODE
    const [validateCode, setValidateCode] = useState(false);

    // Pass
    const [validatePass, setValidatePass] = useState(false);
    const [validateConfirmPass, setValidateConfirmPass] = useState(false);

    const [showErrorPass, setShowErrorPass] = useState(false);

    const disable =
        valueUser === '' || valuePass === '' || valueCode === '' || valueComfirmPass === '' ? 'disable' : '';

    // Validate
    const RegexPhone = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
    const RegexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const RegexPass = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).*/;

    const [errorCheckPass, setErrorCheckPass] = useState(cx('validate-check'));
    const [errorCheckPass2, setErrorCheckPass2] = useState(cx('validate-check'));
    // USER PHONE - EMAIL
    const handleBlurUser = () => {
        if (title_type === 'Email') {
            if (RegexEmail.test(valueUser) === false) {
                setValidateUser(true);
            }
        } else {
            setValidateUser(false);
        }
        if (title_type === 'Điện thoại') {
            if (RegexPhone.test(valueUser) === false) {
                setValidateUserPhone(true);
            }
        } else {
            setValidateUserPhone(false);
        }
    };
    const handleFocusUser = () => {
        if (title_type === 'Email') {
            setValidateUser(false);
        } else if (title_type === 'Điện thoại') {
            setValidateUserPhone(false);
        }
    };
    // PassWord
    const handleBlurPass = () => {
        if (valuePass === '') {
            setValidatePass(false);
        } else if (valuePass !== '') {
            setValidatePass(true);
        }
        if (RegexPass.test(valuePass) === false) {
            setShowErrorPass(true);
        }
    };
    const handleFocusPass = () => {
        setValidatePass(true);
        setShowErrorPass(false);
    };
    const handleChangePass = (e) => {
        setValuePass(e.target.value);
        if (valuePass.length <= 7 || (valuePass.length > 20 && valuePass !== '')) {
            setErrorCheckPass(cx('validate-check-error'));
        } else {
            setErrorCheckPass(cx('validate-check'));
        }
        if (RegexPass.test(valuePass) === false) {
            setErrorCheckPass2(cx('validate-check-error'));
        } else {
            setErrorCheckPass2(cx('validate-check'));
        }
    };
    // Confirm Pass
    const handleFocusConfirmPass = () => {
        setValidateConfirmPass(false);
    };
    const handleBlurConfirmPass = () => {
        if (valuePass !== valueComfirmPass) {
            setValidateConfirmPass(true);
        }
    };
    // Pass word
    const handleFocusCode = () => {
        setValidateCode(false);
    };
    const handleBlurCode = () => {
        if (valueCode.length !== 6) {
            setValidateCode(true);
        } else {
            setValidateCode(false);
        }
    };
    const errorInputUser = validateUser || validateUserPhone ? cx('error-input') : '';
    const errorInputCode = validateCode ? cx('error-input') : '';
    const errorInputPass = showErrorPass ? cx('error-input') : '';
    const errorInputConfirm = validateConfirmPass ? cx('error-input') : '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (valuePass !== valueComfirmPass) {
            return;
        }
        setLoadingAPI(!loadingAPI);
        let rescheck = await registerService.checkRegister(valueUser);
        const result = rescheck.find((obj) => obj.email === valueUser);
        if (rescheck && result) {
            setExist(true);
        } else {
            let res = await registerService.register(valueUser, valuePass, valueCode);
            if (res && res.email) {
                localStorage.setItem('register', res.email);
                const handleBackLogin = () => handleSubRegister();
                handleBackLogin();
            } else {
                if (res && res.status === 400) {
                    console.log('Error');
                }
            }
        }
        setLoadingAPI(loadingAPI);
    };

    return (
        <div>
            <Header
                title="Đăng ký"
                onBack={handleOnBack}
                header={cx('header')}
                btn={cx('btn')}
                className={cx('login-title')}
                disable
            />
            <div className={cx('title-children')}>
                <p>{title_type}</p>
                <span className={cx('text-small')} onClick={handleRegisterEmail}>
                    {choose_type}
                </span>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className={cx('user')}>
                    <div className={cx('change-input')}>
                        <input
                            className={errorInputUser}
                            type={type}
                            placeholder={placeholder_user}
                            value={valueUser || ''}
                            onChange={(e) => setValueUser(e.target.value)}
                            onBlur={handleBlurUser}
                            onFocus={handleFocusUser}
                        />
                        {validateUser ||
                            (validateUserPhone && (
                                <div className={cx('icon-warning')}>
                                    <WarningIcon />
                                </div>
                            ))}
                    </div>
                    {validateUser && (
                        <div className={cx('error')}>
                            <span>Nhập địa chỉ email hợp lệ</span>
                        </div>
                    )}
                    {validateUserPhone && (
                        <div className={cx('error')}>
                            <span>Nhập số điện thoại hợp lệ</span>
                        </div>
                    )}
                    {exist && (
                        <div className={cx('error')}>
                            <span>Tài khoản đã tồn tại</span>
                        </div>
                    )}
                </div>
                <div className={cx('user')}>
                    <div className={cx('change-input')}>
                        <input
                            className={errorInputCode}
                            type={type}
                            placeholder={placeholder_code}
                            value={valueCode || ''}
                            onChange={(e) => setValueCode(e.target.value)}
                            onBlur={handleBlurCode}
                            onFocus={handleFocusCode}
                        />
                        {validateCode && (
                            <div className={cx('icon-warning')}>
                                <WarningIcon />
                            </div>
                        )}
                    </div>
                    {validateCode && (
                        <div className={cx('error')}>
                            <span>Mã số gồm 6 số</span>
                        </div>
                    )}
                </div>
                <div className={cx('user')}>
                    <div className={cx('change-input')}>
                        <input
                            className={errorInputPass}
                            type="password"
                            placeholder="Mật khẩu"
                            value={valuePass}
                            onChange={handleChangePass}
                            onBlur={handleBlurPass}
                            onFocus={handleFocusPass}
                        />
                        {showErrorPass && (
                            <div className={cx('icon-warning')}>
                                <WarningIcon />
                            </div>
                        )}
                    </div>
                    {validatePass && (
                        <div className={cx('validate-pass')}>
                            <p>Mật khẩu của bạn phải gồm:</p>
                            <div className={errorCheckPass}>
                                <div className={cx('validate-icon')}>
                                    <CheckIcon />
                                </div>
                                <span>8 đến 20 ký tự</span>
                            </div>
                            <div className={errorCheckPass2}>
                                <div className={cx('validate-icon')}>
                                    <CheckIcon />
                                </div>
                                <span>Các chữ cái, số và ký tự đặc biệt</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('user')}>
                    <div className={cx('change-input')}>
                        <input
                            className={errorInputConfirm}
                            type="password"
                            placeholder="Xác Nhận Mật khẩu"
                            value={valueComfirmPass || ''}
                            onChange={(e) => setValueComfirmPass(e.target.value)}
                            onBlur={handleBlurConfirmPass}
                            onFocus={handleFocusConfirmPass}
                        />
                        {validateConfirmPass && (
                            <div className={cx('icon-warning')}>
                                <WarningIcon />
                            </div>
                        )}
                    </div>
                    {validateConfirmPass && (
                        <div className={cx('error')}>
                            <span>Mật khẩu không trùng khớp</span>
                        </div>
                    )}
                </div>
                <Button className={cx('btn-login', disable)} type="submit" primary>
                    {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />}
                    {!loadingAPI && `Đăng ký`}
                </Button>
            </form>
        </div>
    );
};
export default FormRegister;
