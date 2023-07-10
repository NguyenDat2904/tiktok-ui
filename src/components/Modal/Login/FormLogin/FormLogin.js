import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';
import { useState } from 'react';
import FormForgotPass from './FormForgotPass';
import * as loginService from '../../../../services/loginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const { default: Button } = require('~/components/Button/Button');
const { default: Header } = require('~/components/Propper/Menu/Header');

const cx = classNames.bind(styles);

const FormLogin = ({ handleBackMenu, type, choose_type, title_type, placeholder, handleToggleLogin, hide }) => {
    const [valueUser, setValueUser] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [toggleForgotPass, setToggleForgotPass] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [loadingAPI, setLoadingAPI] = useState(false);

    const [checkLogin, setCheckLogin] = useState(false);
    const disable = valueUser === '' || valuePass === '' ? 'disable' : '';

    const handleToggleFormForgot = () => setToggleForgotPass(!toggleForgotPass);
    const handleToggle = () => setToggle(!toggle);
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoadingAPI(!loadingAPI);
        let res = await loginService.login(valueUser, valuePass);
        if (res.length === 0) {
            setValueUser('');
            setValuePass('');
            setCheckLogin(true);
        } else {
            res.forEach((data) => {
                if (data && data.email) {
                    localStorage.setItem('login', data.email);
                    const handleModel = () => {
                        hide();
                        window.location.reload();
                    };
                    handleModel();
                } else {
                    if (res && res.status === 400) {
                        console.log('Error');
                    }
                }
            });
        }
        setLoadingAPI(loadingAPI);
    };
    return (
        <div>
            {toggleForgotPass ? (
                <>
                    <Header
                        title="Đăng nhập"
                        onBack={handleBackMenu}
                        header={cx('header')}
                        btn={cx('btn')}
                        className={cx('login-title')}
                        disable
                    />
                    <div className={cx('title-children')}>
                        <p>{title_type}</p>
                        <span className={cx('text-small')} onClick={handleToggleLogin}>
                            {choose_type}
                        </span>
                    </div>
                    <form action="" onSubmit={handleLogin}>
                        <div className={cx('user')}>
                            <div className={cx('change-input')}>
                                <input
                                    type={type}
                                    placeholder={placeholder}
                                    value={valueUser || ''}
                                    onChange={(e) => setValueUser(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('user')}>
                            <div className={cx('change-input')}>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={valuePass || ''}
                                    onChange={(e) => setValuePass(e.target.value)}
                                />
                            </div>
                            {checkLogin && (
                                <div className={cx('error')}>
                                    <span>Tài khoản hoặc mật khẩu không chính xác</span>
                                </div>
                            )}
                        </div>
                        <p className={cx('text-small')} onClick={handleToggleFormForgot}>
                            Quên mật khẩu?
                        </p>
                        <Button className={cx('btn-login', disable)} primary type="submit">
                            {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />}
                            {!loadingAPI && `Đăng nhập`}
                        </Button>
                    </form>
                </>
            ) : (
                <>
                    {toggle ? (
                        <FormForgotPass
                            title_type="Nhập số điện thoại"
                            choose_type="Đặt lại bằng email"
                            type="text"
                            placeholder_user="Số điện thoại"
                            placeholder_code="Nhập mã gồm 6 chữ số"
                            handleToggle={handleToggle}
                            handleToggleFormForgot={handleToggleFormForgot}
                        />
                    ) : (
                        <FormForgotPass
                            title_type="Nhập địa chỉ email"
                            choose_type="Đặt lại bằng số điện thoại"
                            type="text"
                            placeholder_user="Địa chỉ email"
                            placeholder_code="Nhập mã gồm 6 chữ số"
                            handleToggle={handleToggle}
                            handleToggleFormForgot={handleToggleFormForgot}
                        />
                    )}
                </>
            )}
        </div>
    );
};
export default FormLogin;
