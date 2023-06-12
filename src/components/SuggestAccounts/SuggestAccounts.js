import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import classNames from 'classnames/bind';
import style from './SuggestAccounts.module.scss';
import * as suggestedAccountService from '~/services/suggestedAccountService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function SuggestAccounts({ label, seeMore, seeLess, from, to, end }) {
    const [suggestAccount, setSuggestAccount] = useState([]);

    const [seeAll, setSeeAll] = useState(true);
    useEffect(() => {
        const fetchAPI = async () => {
            if (seeAll) {
                const result = await suggestedAccountService.suggest(from, to);
                setSuggestAccount(result);
            } else {
                const result = await suggestedAccountService.suggest(from, end);
                setSuggestAccount(result);
            }
        };
        fetchAPI();
    }, [seeAll]);
    const handleSeeMore = () => setSeeAll(!seeAll);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {seeAll
                ? suggestAccount.map((suggestAPI) => {
                      return <AccountItem key={suggestAPI.id} data={suggestAPI} />;
                  })
                : suggestAccount.map((suggestAPI) => {
                      return <AccountItem key={suggestAPI.id} data={suggestAPI} />;
                  })}
            {seeAll ? (
                <p className={cx('see-more')} onClick={handleSeeMore}>
                    {seeMore}
                </p>
            ) : (
                <p className={cx('see-more')} onClick={handleSeeMore}>
                    {seeLess}
                </p>
            )}
        </div>
    );
}
SuggestAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    seeMore: PropTypes.string.isRequired,
    seeLess: PropTypes.string.isRequired,
};
export default SuggestAccounts;
