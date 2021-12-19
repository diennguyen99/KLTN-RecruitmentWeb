import { createAction, props } from "@ngrx/store";
import { Portfolio } from "../../models/portfolio.model";

// load Portfolios
export const loadPortfolios = createAction(
  '[Portfolios] Load Portfolios'
)

export const loadPortfoliosFail = createAction(
  '[Portfolios] Load Portfolios Fail',
  props<{ error: string }>()
)

export const loadPortfoliosSuccess = createAction(
  '[Portfolios] Load Portfolios Success',
  props<{ data: Portfolio[] }>()
)

// add update experience
export const addEditPortfolio = createAction(
  '[Portfolios] Add Edit Portfolio',
  props<{ data: any }>()
)

export const addEditPortfolioFail = createAction(
  '[Portfolios] Add Edit Portfolio Fail',
  props<{ error: string }>()
)

export const addEditPortfolioSuccess = createAction(
  '[Portfolios] Add Edit Portfolio Success',
  props<{ data: Portfolio }>()
)

// delete update experience
export const deletePortfolio = createAction(
  '[Portfolios] Delete Portfolio',
  props<{ id: number }>()
)

export const deletePortfolioFail = createAction(
  '[Portfolios] Delete Portfolio Fail',
  props<{ error: string }>()
)

export const deletePortfolioSuccess = createAction(
  '[Portfolios] Delete Portfolio Success',
  props<{ id: number }>()
)
