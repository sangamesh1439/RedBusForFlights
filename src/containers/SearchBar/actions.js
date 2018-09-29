
/*************************************************
 * Code Challange
 *************************************************/
const SEARCH = 'SEARCH';
const CLEAR = 'CLEAR';

const search = (searchParams) => {
  return {
    'type': SEARCH, payload: {
      searchParams: searchParams
    }
  }
}

const clear = () => {
  return {
    'type': CLEAR
  }
}

export default {
  search: search,
  clear: clear
}