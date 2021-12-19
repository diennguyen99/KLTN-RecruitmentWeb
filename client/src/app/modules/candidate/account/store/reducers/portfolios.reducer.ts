import * as fromPortfolios from '../actions/portfolios.action';
import { Portfolio } from '../../models/portfolio.model';
import { createReducer, on } from "@ngrx/store";

export interface PortfolioState {
  entities: { [id: number] : Portfolio },
  loaded: boolean,
  loading: boolean
}

export const initialState: PortfolioState = {
  entities: {},
  loaded: false,
  loading: false
}

export const reducer = createReducer<PortfolioState>(
  initialState,
  on(fromPortfolios.loadPortfolios, (state): PortfolioState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromPortfolios.loadPortfoliosSuccess, (state, actions): PortfolioState => {
    const portfolios = actions.data;

    const entities = portfolios.reduce(
      (entities: { [id: number]: Portfolio }, portfolio: Portfolio) => {
        return {
          ...entities,
          [portfolio.id]: portfolio,
        };
      },
      {
        ...state.entities,
      }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    }
  }),
  on(fromPortfolios.loadPortfoliosFail, (state): PortfolioState => {
    return {
      ...state,
      loading: false,
      loaded: false,
    }
  }),
  on(fromPortfolios.addEditPortfolioSuccess, (state, action): PortfolioState => {
    const experience = action.data;
    const entities = {
      ...state.entities,
      [experience.id]: experience,
    };

    return {
      ...state,
      entities,
    };
  }),
  on(fromPortfolios.deletePortfolioSuccess, (state, action): PortfolioState => {
    const experienceId = action.id;
    const {
      [experienceId]: removed,
      ...entities
    } = state.entities;

    return {
      ...state,
      entities,
    };
  })
)

export const getPortfoliosEntities = (state: PortfolioState) => state.entities;
export const getPortfoliosLoading = (state: PortfolioState) => state.loading;
export const getPortfoliosLoaded = (state: PortfolioState) => state.loaded;
