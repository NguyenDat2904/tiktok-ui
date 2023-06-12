import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Propper';


const cx = classNames.bind(styles);
const footerLinks = [
    'Giới thiệu',
    'Bảng tin',
    'Liên hệ',
    'Sự nghiệp',
    'ByteDance',
    'TikTok for Good',
    'Quảng cáo',
    'Developers',
    'Minh bạch',
    'TikTok Rewards',
    'TikTok Embeds',
    'Trợ giúp',
    'An toàn',
    'Điều khoản',
    'Quyền riêng tư',
    'Cổng thông tin Tác giả',
    'Hướng dẫn Cộng đồng',
];
function Footer() {
    const div1 = footerLinks.slice(0, 5).map((item, index) => {
        return (
            <Link key={index} className={cx('footer-tem')}>
                {item}
            </Link>
        );
    });
    const div2 = footerLinks.slice(5, 11).map((item, index) => {
        return (
            <Link key={index} className={cx('footer-tem')}>
                {item}
            </Link>
        );
    });
    const div3 = footerLinks.slice(11, 17).map((item, index) => {
        return (
            <Link key={index} className={cx('footer-tem')}>
                {item}
            </Link>
        );
    });
    console.log(div1);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer-list')}>
                <div className={cx('footer-list')}>{div1}</div>
                <div className={cx('footer-list')}>{div2}</div>
                <div className={cx('footer-list')}>{div3}</div>
            </div>
            <Tippy
                delay={[0, 940]}
                offset={[-20, 3]}
                hideOnClick={false}
                interactive
                placement="top"
                render={(attrs) => (
                    <div className={cx('content')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('props-more')}>
                            <Link className={cx("props-text")}>NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK</Link>
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('footer-list')}>
                    <span className={cx('footer-more')}>Thêm</span>
                </div>
            </Tippy>
            <span className={cx('footer-more')}>© 2023 TikTok</span>
        </div>
    );
}

export default Footer;
