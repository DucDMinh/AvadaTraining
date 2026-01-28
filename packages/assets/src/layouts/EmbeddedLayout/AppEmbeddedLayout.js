import React, {useState} from 'react';
import {Frame, Loading, Toast} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeActions';
import AppTopBar from '@assets/layouts/AppLayout/AppTopBar';

/**
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppEmbeddedLayout({children}) {
  const {state, dispatch} = useStore();
  const {loading, toast} = state;
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleOpenNav = () => setIsNavOpen(prev => !prev);
  return (
    <Frame topBar={<AppTopBar isNavOpen={isNavOpen} toggleOpenNav={toggleOpenNav}/>}>
      {children}
      {loading && <Loading/>}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppEmbeddedLayout;
