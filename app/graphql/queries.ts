import { gql } from "@apollo/client";

export const GET_GLOBAL_DATA = gql`
query GetGlobalData {
    getGlobalData {
      total_invested
      forecasted_cc
      generated_cc
      retired_cc
    }
  }
`;

export const GET_PROJECTED_DECARBONATION_TABLE = gql`
  query GetProjectedDecarbonationTable($pagination: Pagination) {
    getProjectedDecarbonationTable(pagination: $pagination) {
      data {
        delta
        emissions
        forward_cc
        purchased_cc
        received_cc
        retired_cc
        target
        year
      }
      pagination {
        max_page
      }
    }
  }
`;

export const GET_PROJECT_FUNDING_ALLOCATION = gql`
  query GetProjectFundingAllocation($pagination: Pagination) {
    getProjectFundingAllocation(pagination: $pagination) {
      data {
        allocation
        comitted_cc
        forwarded_cc
        generated_cc
        id
        name
        retired_cc
        color
      }
      pagination {
        max_page
      }
    }
  }
`;
