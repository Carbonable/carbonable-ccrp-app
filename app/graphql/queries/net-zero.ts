import { gql } from "@apollo/client";

export const GET_GLOBAL_DATA = gql`
query GetGlobalData {
    getGlobalData {
        target
        actual
        debt
        number_of_projects
        invested_amount
    }
  }
`;

export const NET_ZERO_PLANNING = gql`
  query NetZeroPlanning($view: VisualizationViewType) {
    netZeroPlanning(view: $view) {
        vintage
        ex_ante_count
        ex_post_count
        emission
        target
        actual
    }
  }
`;

export const ANNUAL = gql`
  query Annual($view: VisualizationViewType!) {
    annual(view: $view) {
      time_period
      emissions
      ex_post_issued
      ex_post_purchased
      ex_post_retired
      target
      actual_rate
      delta
      debt
      ex_post_stock
      ex_ante_stock
    }
  }
`;

export const CUMULATIVE = gql`
  query Cumulative($view: VisualizationViewType!) {
    cumulative(view: $view) {
      time_period
      emissions
      ex_post_issued
      ex_post_purchased
      ex_post_retired
      target
      actual_rate
      delta
      debt
      ex_post_stock
      ex_ante_stock
    }
  }
`;

export const FINANCIAL_ANALYSIS = gql`
  query FinancialAnalysis($view: VisualizationViewType!) {
    financialAnalysis(view: $view) {
      year
      purchased_price
      cumulative_purchased_price
      total_purchased_amount
      cumulative_total_purchased_amount
      issued_price
      total_issued_amount
      cumulative_total_issued_amount
      gran_total_amount
      cumulative_gran_total_amount
      estimated_debt_amount
      cumulative_estimated_debt_amount
    }
  }
`;