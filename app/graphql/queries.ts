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
