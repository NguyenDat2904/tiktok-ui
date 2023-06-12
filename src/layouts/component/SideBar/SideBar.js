import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Discover from '../../../components/SuggestAccounts/Discover/Discover';
import Menu, { MenuItem } from './Menu';
import { routes } from '~/config/routes';
import {
    HomeIcon,
    UserGroupIcon,
    LabIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LabActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons/Icons';

import SuggestAccounts from '~/components/SuggestAccounts/SuggestAccounts';
import Footer from '~/components/SuggestAccounts/Footer/Footer';

const cx = classNames.bind(styles);

function SideBar() {
    const countRandom = Math.floor(Math.random() * 4 + 1);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For Your" to={routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="Explore" to={routes.explore} icon={<LabIcon />} activeIcon={<LabActiveIcon />} />
                <MenuItem title="LIVE" to={routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestAccounts
                label="Tài khoản được đề xuất"
                seeMore="Xem tất cả"
                seeLess="Ẩn bớt"
                from={countRandom}
                to={countRandom + 4}
                end={countRandom + 9}
            />
            <SuggestAccounts
                label="Các tài khoản đang follow"
                seeMore="Xem thêm"
                seeLess="Ẩn bớt"
                from={countRandom}
                to={countRandom + 9}
                end={countRandom + 15}
            />
            <Discover label="Khám phá" />
            <Footer />
        </aside>
    );
}

export default SideBar;
