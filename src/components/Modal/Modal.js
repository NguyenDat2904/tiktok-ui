import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Login from './Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { GoogleIcon, InstagramIcon } from '../Icons/Icons';
import { faApple, faFacebook, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

const Modal = ({ isShowing, hide, handleCheckCurrent }) => {
    const [toggle, setToggle] = useState(true);
    const dataLogin = [
        {
            icon: <FontAwesomeIcon icon={faQrcode} />,
            title: 'Sử dụng mã QR',
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Số điện thoại / Email / TikTok ID',
            children: true,
            check: true,
        },
        {
            icon: <FontAwesomeIcon icon={faFacebook} />,
            title: 'Tiếp tục với Facebook',
            className: 'facebook',
        },
        {
            icon: <GoogleIcon />,
            title: 'Tiếp tục với Google',
        },
        {
            icon: <FontAwesomeIcon icon={faTwitter} />,
            title: 'Tiếp tục với Twitter',
            className: 'twitter',
        },
        {
            icon: <FontAwesomeIcon icon={faLine} />,
            title: 'Tiếp tục với LINE',
            className: 'line',
        },
        {
            icon: <FontAwesomeIcon icon={faApple} />,
            title: 'Tiếp tục với Apple',
        },
        {
            icon: <InstagramIcon />,
            title: 'Tiếp tục với Instagram',
        },
    ];
    const childRef = React.createRef();
    const handleShow = () => {
        setToggle(!toggle);
        childRef.current.setState({ toggle: true, showInput: false });
    };
    const newDataLogin = dataLogin.slice(1);
    let dataSlice = [...newDataLogin];
    const [data, setData] = useState(dataLogin);
    useEffect(() => {
        if (toggle === false) {
            dataSlice[0].title = 'Sử dụng số điện thoại hoặc email';
            dataSlice[0].check = false;

            setData(dataSlice);
        } else {
            setData(dataLogin);
            dataSlice = [...dataLogin];
        }
    }, [toggle]);
    return isShowing ? (
        <React.Fragment>
            <div className={cx('modal-overlay')} />
            <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className={cx('modal')}>
                    <div className={cx('modal-header')}>
                        <button
                            type="button"
                            className={cx('modal-close-button')}
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={hide}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {toggle ? (
                        <Login
                            title="Đăng nhập vào TikTok"
                            data={data}
                            ref={childRef}
                            hide={hide}
                            handleCheckCurrent={handleCheckCurrent}
                        />
                    ) : (
                        <Login
                            title="Đăng ký TikTok"
                            data={data}
                            ref={childRef}
                            hide={hide}
                            handleCheckCurrent={handleCheckCurrent}
                        />
                    )}
                    <div className={cx('login-rules')}>
                        <p className={cx('rules-text')}>
                            Bằng cách tiếp tục, bạn đồng ý với <span>Điều khoản Sử dụng</span> của TikTok và xác nhận
                            rằng bạn đã đọc hiểu
                            <span> Chính sách Quyền riêng tư</span> của TikTok.
                        </p>
                    </div>
                    <div className={cx('login-register')}>
                        <div>{toggle ? 'Bạn không có tài khoản?' : 'Bạn đã có tài khoản?  '} </div>
                        <span className={cx('btn-signup')} onClick={() => handleShow(Login.updateBack)}>
                            {toggle ? 'Đăng ký' : 'Đăng nhập'}
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    ) : null;
};

export default Modal;
