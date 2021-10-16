import React from 'react';
import PropTypes from 'prop-types';
import langColors from '../../utils/langColors';
import { relativeTimeConvertor } from '../../utils/commonfunctions';

const RepoFooter = ({ ...args }) => {
    return (
        <>
            {args.language ? (
                <>
                    <span
                        className="repo-language-color mr-1"
                        style={{ backgroundColor: langColors[args.language] }}
                    />
                    <span className="repo-language pr-3">{args.language}</span>
                </>
            ) : null}
            {args.viewType === 'grid' && <br className="d-block d-md-none" />}
            <a
                href={args.stargazersUrl}
                className="pinned-item-meta muted-link pr-3"
            >
                <i className="fa fa-star mr-1" aria-hidden="true"></i>
                {args.stargazersCount.toLocaleString()}
            </a>
            <a
                href={args.forksUrl}
                className="pinned-item-meta muted-link pr-3"
            >
                <i className="fa fa-code-fork mr-1" aria-hidden="true"></i>
                {args.forksCount.toLocaleString()}
            </a>
            {args.viewType === 'grid' && <br className="d-block d-md-none" />}
            {args.updatedAt && (
                <span className="float-right">
                    Updated {relativeTimeConvertor(args.updatedAt)}
                </span>
            )}
            {args.size && (
                <span className="repo-size float-right">
                    {args.size.toLocaleString()} KB
                </span>
            )}
        </>
    );
};

RepoFooter.propTypes = {
    viewType: PropTypes.string,
    language: PropTypes.string,
    stargazersUrl: PropTypes.string.isRequired,
    stargazersCount: PropTypes.number.isRequired,
    forksUrl: PropTypes.string.isRequired,
    forksCount: PropTypes.number.isRequired,
    updatedAt: PropTypes.string,
    size: PropTypes.number
};

export default RepoFooter;
