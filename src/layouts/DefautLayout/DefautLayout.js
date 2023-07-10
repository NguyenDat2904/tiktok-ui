import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefautLayout.module.scss';
import useModal from '~/hook/useModal';
import Modal from '~/components/Modal/Modal';
import Header from '../component/Header/Header';
import SideBar from '../component/SideBar/SideBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { isShowing, toggle } = useModal(false);

    return (
        <div className={cx('wrapper')}>
            <Header toggle={toggle} />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Modal isShowing={isShowing} hide={toggle} />
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
