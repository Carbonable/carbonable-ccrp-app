import { gql } from "@apollo/client";

export const GET_IMPACT_METRICS = gql`
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