import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';

import Header from '../component/Header/Header';
import SideBar from '../component/SideBar/SideBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
