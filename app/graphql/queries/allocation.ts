import { gql } from "@apollo/client";

export const GET_ALLOCATIONS = gql`
query CarbonAssetAllocation($view: VisualizationViewType) {
    carbonAssetAllocation(view: $view) {
        project_name
        type
        total_potential
        ex_post_to_date
        ex_ante_to_date
        project_completion
        total_allocated_to_date
        total_available_to_date
        allocation_rate
        price
        total_amount
    }
  }
`;