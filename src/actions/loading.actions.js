import { SET_LOADER } from './types';

export let setLoader = (isLoading, loadingText, showSpinner = true) => {

  return {
    type: SET_LOADER,
    isLoading,
    loadingText,
    showSpinner
  }
}
