import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';
import { useState } from 'react';
const { default: Button } = require('~/components/Button/Button');
const { default: Header } = require('~/components/Propper/Menu/Header');

const cx = classNames.bind(styles);

const FormForgotPass = ({
    handleToggleFormForgot,
    type,
    choose_type,
    title_type,
    placeholder_user,
    placeholder_code,
    handleToggle,
}) => {
    const [valueUser, setValueUser] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [valueCode, setValueCode] = useState('');

    const disable = valueUser === '' || valuePass === '' || valueCode === '' ? 'disable' : '';
    return (
        <div>
            <Header
                title="Đặt lại mật khẩu"
                onBack={handleToggleFormForgot}
                header={cx('header')}
                btn={cx('btn')}
                className={cx('login-title')}
                disable
            />
            <div className={cx('title-children')}>
                <p>{title_type}</p>
                <span className={cx('text-small')} onClick={handleToggle}>
                    {choose_type}
                </span>
            </div>
            <form action="">
                <div className={cx('user')}>
                    <input
                        type={type}
                        placeholder={placeholder_user}
                        value={valueUser || ''}
                        onChange={(e) => setValueUser(e.target.value)}
                    />
                </div>
                <div className={cx('user')}>
                    <input
                        type={type}
                        placeholder={placeholder_code}
                        value={valueCode || ''}
                        onChange={(e) => setValueCode(e.target.value)}
                    />
                </div>
                <div className={cx('user')}>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={valuePass || ''}
                        onChange={(e) => setValuePass(e.target.value)}
                    />
                </div>
                <Button className={cx('btn-login', disable)} primary>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
};
export default FormForgotPass;
