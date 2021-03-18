import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeSpacing, themeColor } from '@amsterdam/asc-ui';

const ErrorItem = styled.p`
  font-family: Avenir Next LT W01 Demi, arial, sans-serif;
  margin-top: 0;
  margin-bottom: 0;
  border: ${themeColor('support', 'invalid')} 2px solid;
  padding: ${themeSpacing(3)};
  color: ${themeColor('support', 'invalid')};
  line-height: ${themeSpacing(6)};
`;

const GlobalError = ({ meta, parent: { touched, valid } }) =>
  touched && !valid ? (
    <ErrorItem>
      {meta.label || 'Er zijn vragen niet (of niet juist) ingevuld. Vul de vragen hieronder op de goede manier in.'}
    </ErrorItem>
  ) : null;

GlobalError.propTypes = {
  meta: PropTypes.shape({
    label: PropTypes.string,
  }),
  parent: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
  }),
};

export default GlobalError;
