import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const RepoDesc = ({ description, viewType }) => {
    const [characterLimit, setCharacterLimit] = useState(80);

    useEffect(() => {
        viewType === 'list' ? setCharacterLimit(180) : setCharacterLimit(80);
    }, [viewType]);

    return (
        <span>
            {description.length > characterLimit
                ? `${description.substring(0, characterLimit)}...`
                : description}
        </span>
    );
};

RepoDesc.propTypes = {
    description: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired
};

export default RepoDesc;
