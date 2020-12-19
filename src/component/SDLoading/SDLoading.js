import React from 'react';
import { Spin } from 'antd';
import propTypes from 'prop-types';
import './SDLoading.scss';

export function SDLoading({ mask, loading }) {
    if (!loading) {
        return null;
    }

    return (
        <div className={`sd-loading${mask ? ' mask' : ''}`}>
            <Spin size="large" />
        </div>
    );
}

SDLoading.propTypes = {
    // eslint-disable-next-line react/require-default-props
    loading: propTypes.bool,
    // eslint-disable-next-line react/require-default-props
    mask: propTypes.bool,
};