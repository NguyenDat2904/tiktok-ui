import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack, disable, className, header, btn }) {
    return (
        <header className={cx('header', header)}>
            {disable && (
                <button className={cx('back-icon', btn)} onClick={onBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            )}
            <h4 className={cx('header-title', className)}>{title}</h4>
        </header>
    );
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
export default Header;
