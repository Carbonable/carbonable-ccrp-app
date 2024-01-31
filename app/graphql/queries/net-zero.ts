import { gql } from "@apollo/client";

export const GET_GLOBAL_DATA = gql`
query GetGlobalData($view: VisualizationViewType) {
    getGlobalData(view: $view) {
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
        retired
    }
  }
`;

export const ANNUAL = gql`
  query Annual($view: VisualizationViewType!, $pagination: Pagination) {
    annual(view: $view, pagination: $pagination) {
      data {
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
        total_ex_post
        total_ex_ante
      }
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;

export const CUMULATIVE = gql`
  query Cumulative($view: VisualizationViewType!, $pagination: Pagination) {
    cumulative(view: $view, pagination: $pagination) {
      data {
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
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;

export const FINANCIAL_ANALYSIS = gql`
  query FinancialAnalysis($view: VisualizationViewType!, $pagination: Pagination) {
    financialAnalysis(view: $view, pagination: $pagination) {
      data {
        year
        all_time_avg_issued_price,
        all_time_avg_purchased_price,
        all_time_avg_price,
        avg_issued_price,
        avg_purchased_price,
        avg_price,
        cumulative_emission_debt,
        cumulative_total_amount,
        emission_debt,
        total_amount,
        total_issued_amount,
        total_purchased_amount
      }
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;