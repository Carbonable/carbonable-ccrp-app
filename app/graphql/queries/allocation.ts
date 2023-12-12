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

export const GET_COMPANY_ALLOCATIONS = gql`
query CompanyCarbonAssetAllocation($id: String!) {
    companyCarbonAssetAllocation(id: $id) {
      project_name
      business_units {id name}
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

export const GET_PROJECT_ALLOCATIONS = gql`
query ProjectCarbonAssetAllocation($id: String!) {
    projectCarbonAssetAllocation(id: $id) {
      business_unit {id name}
      allocated
      allocation_amount
      target
      actual
      start_date
    }
  }
`;

export const GET_BU_ALLOCATIONS = gql`
query BusinessUnitCarbonAssetAllocation($id: String!) {
    businessUnitCarbonAssetAllocation(id: $id) {
      project {id name}
      total_cu
      allocated
      generated
      forward
      retired
    }
  }
`;

export const CREATE_ALLOCATION = gql`
	mutation addAllocations($request: [AddAllocationRequestItem]!) {
		addAllocations(request: $request) {
			allocationIds 
			errors
		}
	}
`;

export const AVAILABLE_ALLOCATION = gql`
  query AvailableToAllocate($project_id: String!, $business_unit_id: String!) {
    availableToAllocate(project_id: $project_id, business_unit_id: $business_unit_id) {
      available_percent
      available_units
    }
  }
`;