import React from 'react';
import PropTypes from 'prop-types';
import {
    ButtonToolbar,
    Button,
    ButtonGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';

const Filters = ({ ...args }) => {
    return (
        <ButtonToolbar
            className="filters float-right mb-3"
            aria-label="Filter controls for the repos"
        >
            <DropdownButton
                className="pr-3"
                id="dropdown-item-button"
                title={args.sortType}
            >
                {args.sortTypes.map((s, i) => (
                    <Dropdown.Item
                        key={i}
                        as="button"
                        onClick={() => args.changeSortType(s)}
                    >
                        {s}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            <ButtonToolbar aria-label="Filter controls for the repos">
                <ButtonGroup aria-label="view as group">
                    <Button
                        variant="secondary"
                        className={
                            args.viewType === args.viewTypes[1] ? 'active' : ''
                        }
                        onClick={() => args.changeViewType(args.viewTypes[1])}
                    >
                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                    </Button>
                    <Button
                        variant="secondary"
                        className={
                            args.viewType === args.viewTypes[0] ? 'active' : ''
                        }
                        onClick={() => args.changeViewType(args.viewTypes[0])}
                    >
                        <i className="fa fa-th" aria-hidden="true"></i>
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </ButtonToolbar>
    );
};

Filters.propTypes = {
    sortTypes: PropTypes.array.isRequired,
    viewTypes: PropTypes.array.isRequired,
    sortType: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    changeSortType: PropTypes.func.isRequired,
    changeViewType: PropTypes.func.isRequired
};

export default Filters;
