import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Header from '~/components/Propper/Menu/Header';
import FormLogin from './FormLogin/FormLogin';
import FormRegister from './FormLogin/FormRegister';
import { auth, privider } from '~/config';
import { auth_fb, providerFaceBook } from '~/configFb';

const cx = classNames.bind(styles);

const Login = forwardRef(({ title, data = [], hide, handleCheckCurrent }, ref) => {
    const [history, setHistory] = useState(data);
    useEffect(() => {
        setHistory(data);
    }, [data]);
    const [toggle, setToggle] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(true);
    const [register, setRegister] = useState(true);
    const [registerEmail, setRegisterEmail] = useState(true);
    const db = getFirestore();
    const handleLoginEmail = () => {
        signInWithPopup(auth, privider).then((data) => {
            localStorage.setItem('login', data.user.uid);
            localStorage.setItem('img', data.user.photoURL);
            const { displayName, email, photoURL, uid } = data.user;

            // Lưu trữ thông tin người dùng trong cơ sở dữ liệu Firebase
            const userRef = doc(db, 'users', uid);
            setDoc(
                userRef,
                {
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                    provider: 'google',
                },
                { merge: true },
            )
                .then(() => {
                    // Lưu trữ thông tin người dùng thành công
                })
                .catch((error) => {
                    // Xử lý lỗi khi lưu trữ thông tin người dùng không thành công
                    console.log(error);
                });
            if (localStorage.getItem('login')) {
                window.location.reload();
            }
        });
    };
    const handleLoginFacebook = () => {
        signInWithPopup(auth_fb, providerFaceBook).then(async (data) => {
            localStorage.setItem('login', data.user.uid);
            localStorage.setItem('img', data.user.photoURL);
            const { displayName, email, photoURL, uid } = data.user;

            // Lưu trữ thông tin người dùng trong cơ sở dữ liệu Firebase
            const userRef = doc(db, 'users', uid);
            setDoc(
                userRef,
                {
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                    provider: 'google',
                },
                { merge: true },
            )
                .then(() => {
                    // Lưu trữ thông tin người dùng thành công
                })
                .catch((error) => {
                    // Xử lý lỗi khi lưu trữ thông tin người dùng không thành công
                    console.log(error);
                });
            if (localStorage.getItem('login')) {
                window.location.reload();
            }
        });
    };
    useImperativeHandle(ref, () => ({
        setState(newState) {
            setToggle(newState.toggle);
            setShowInput(newState.showInput);
        },
    }));
    const handleRegisterEmail = () => {
        setRegisterEmail(!registerEmail);
    };
    const updateBack = () => {
        setToggle(!toggle);
        setShowInput(false);
    };
    Login.updateBack = updateBack;
    const handleToggleLogin = () => {
        setToggleLogin(!toggleLogin);
        setToggle(toggle);
    };
    const handleOnBack = () => {
        setShowInput(!showInput);
        setToggle(!toggle);
    };
    const handleSubRegister = () => {
        setRegister(!register);
    };
    const renderTypes = () =>
        history?.map(({ icon, title, className, children, check }, key) => {
            const isParent = !!children;
            const handleLogin = () => {
                if (isParent) {
                    setToggle(!toggle);
                    setShowInput(!showInput);
                    switch (check) {
                        case true:
                            setRegister(true);
                            break;
                        case false:
                            setRegister(false);
                            break;
                        default:
                    }
                } else {
                    switch (title) {
                        case 'Tiếp tục với Google':
                            handleLoginEmail();
                            break;
                        case 'Tiếp tục với Facebook':
                            handleLoginFacebook();
                            break;
                        default:
                            console.log('error');
                    }
                }
            };
            return (
                <div className={cx('type')} key={key} onClick={handleLogin}>
                    <div className={cx('type-icon', className)}>{icon}</div>
                    <p className={cx('type-text')}>{title}</p>
                </div>
            );
        });
    const handleBackMenu = () => {
        setToggle(!toggle);
        setShowInput(false);
        setHistory((prev) => {
            return prev.slice(0, prev.length - 1);
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-container')}>
                {toggle && (
                    <Header
                        title={title}
                        onBack={handleBackMenu}
                        header={cx('header')}
                        btn={cx('btn')}
                        className={cx('login-title')}
                    />
                )}
                {!showInput ? (
                    <div className={cx('login-type')}>{renderTypes()}</div>
                ) : (
                    <>
                        {register ? (
                            <div className={cx('login-type', 'disable')}>
                                {toggleLogin ? (
                                    <FormLogin
                                        title_type="Điện thoại"
                                        choose_type="Đăng nhập bằng email hoặc TikTok ID"
                                        type="text"
                                        placeholder="Số điện thoại"
                                        handleBackMenu={handleBackMenu}
                                        handleToggleLogin={handleToggleLogin}
                                        hide={hide}
                                    />
                                ) : (
                                    <FormLogin
                                        title_type="Email hoặc TikTok ID"
                                        choose_type="Đăng nhập bằng số điện thoại"
                                        type="text"
                                        placeholder="Email hoặc TikTok ID"
                                        handleBackMenu={handleBackMenu}
                                        handleToggleLogin={handleToggleLogin}
                                        hide={hide}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className={cx('login-type', 'disable')}>
                                <>
                                    {registerEmail ? (
                                        <FormRegister
                                            handleOnBack={handleOnBack}
                                            title_type="Điện thoại"
                                            choose_type="Đăng ký bằng email"
                                            type="text"
                                            placeholder_user="Số điện thoại"
                                            placeholder_code="Nhập mã gồm 6 chữ số"
                                            handleRegisterEmail={handleRegisterEmail}
                                            handleSubRegister={handleSubRegister}
                                        />
                                    ) : (
                                        <FormRegister
                                            handleOnBack={handleOnBack}
                                            title_type="Email"
                                            choose_type="Đăng ký bằng số điện thoại"
                                            type="text"
                                            placeholder_user="Địa chỉ email"
                                            placeholder_code="Nhập mã gồm 6 chữ số"
                                            handleRegisterEmail={handleRegisterEmail}
                                            handleSubRegister={handleSubRegister}
                                        />
                                    )}
                                </>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
});

export default Login;
