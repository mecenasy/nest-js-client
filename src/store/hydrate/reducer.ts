export const hydrateReducer = (state: boolean = false, action: any) => {
  switch (action.type) {
    case 'HYDRATE':
      return true;
    default:
      return state;
  }
} 