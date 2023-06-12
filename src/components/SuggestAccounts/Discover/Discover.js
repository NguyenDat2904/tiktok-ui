import styles from './Discover.module.scss';
import classNames from 'classnames/bind';
import { HasTagIcon, HasTagMusic } from '~/components/Icons/Icons';
const cx = classNames.bind(styles);

function Discover({ label }) {
    const hasTags = [
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: 'suthatla',
        },
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: 'mackedoi',
        },
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: 'sansangthaydoi',
        },
        {
            tag: <HasTagMusic className={cx('icon')} />,
            des: 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n & BHMedia',
        },
        {
            tag: <HasTagMusic className={cx('icon')} />,
            des: 'Thiên Thần Tình Yêu - RICKY STAR ạnd T.R.I',
        },
        {
            tag: <HasTagMusic className={cx('icon')} />,
            des: 'Anh Yêu Vội Thế (Mee Remix) - LaLa Trần, Mee Media',
        },
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: '7749hieuung',
        },
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: 'genzlife',
        },
        {
            tag: <HasTagMusic className={cx('icon')} />,
            des: 'Vui Lắm Nha (TikTok Remix 1) - Hương Ly & Jombie',
        },
        {
            tag: <HasTagMusic className={cx('icon')} />,
            des: 'Con Bướm Xuân (Remix) - Cukak & H2K & BHMedia',
        },
        {
            tag: <HasTagIcon className={cx('icon')} />,
            des: 'suthatla',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <ul className={cx('hastag-list')}>
                {hasTags.map((hasTag, index) => {
                    return (
                        <li key={index} className={cx('hastag-item')}>
                            <div className={cx('hastag-box')}>
                                {hasTag.tag}
                                <span className={cx('hastag-desc')}>{hasTag.des}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Discover;
