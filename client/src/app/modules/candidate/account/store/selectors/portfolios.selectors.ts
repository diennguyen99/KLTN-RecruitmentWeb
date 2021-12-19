import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPortfolios from '../reducers/portfolios.reducer';

export const getPortfoliosState = createSelector(
  fromFeature.getAccountState,
  (state: fromFeature.AccountState) => state.portfolios
);

export const getPortfoliosEntities = createSelector(
  getPortfoliosState,
  fromPortfolios.getPortfoliosEntities
);

export const getAllPortfolios = createSelector(
  getPortfoliosEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getPortfoliosLoaded = createSelector(
  getPortfoliosState,
  fromPortfolios.getPortfoliosLoaded
);

export const getPortfoliosLoading = createSelector(
  getPortfoliosState,
  fromPortfolios.getPortfoliosLoading
);
