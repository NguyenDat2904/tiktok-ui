import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';

import MenuItem from './menuItem';
import { Wrapper as PopperWrapper } from '~/components/Propper';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, handleCurrent }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                            switch (item.title) {
                                case 'Đăng xuất':
                                    window.location.reload();
                                    handleCurrent();
                                    break;
                                default:
                                    console.log('eror');
                            }
                        }
                    }}
                />
            );
        });
    };
    const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));
    const handleBackMenu = () => {
        setHistory((prev) => {
            return prev.slice(0, prev.length - 1);
        });
    };
    return (
        <Tippy
            delay={[0, 940]}
            offset={[12, 8]}
            hideOnClick={false}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-propper')}>
                        {history.length > 1 && <Header title={current.title} onBack={handleBackMenu} disable />}
                        <div className={cx('menu-srcoll')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleResetMenu}
        >
            <div className={cx('menu-Ellipsis')}>{children}</div>
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
};
export default Menu;
