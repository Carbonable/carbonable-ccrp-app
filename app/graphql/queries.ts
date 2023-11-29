import { gql } from "@apollo/client";

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

export const GET_PROJECTS_METRICS = gql`
  query GetProjectsMetrics {
    getProjectMetrics {
      colors {
        blue {
          key
          value
        }
        green {
          key
          value
        }
        orange {
          key
          value
        }
      }
      localization {
        value
        country {
          flag
          iso
          name
        }
      }
      standards {
        key
        value
      }
      types {
        avoidance
        removal
      }
    }
  }
`;

export const GET_PROJECTS_IMPACT = gql`
  query GetImpactMetrics {
    getImpactMetrics {
      protected_forest
      protected_species
      removed_tons
      sdgs {
        name
        number
      }
    }
  }
`;

export const GET_PROJECTED_DECARBONATION = gql`
  query GetProjectedDecarbonation($viewType: ProjectedDecarbonationViewType) {
    getProjectedDecarbonation(viewType: $viewType) {
      data {
        key
        value
      }
      emissions
      target
      year
    }
  }
`;