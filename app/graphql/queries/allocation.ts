import { gql } from "@apollo/client";

export const GET_COMPANY_ALLOCATIONS = gql`
query CompanyCarbonAssetAllocation($id: String!, $pagination: Pagination) {
    companyCarbonAssetAllocation(id: $id, pagination: $pagination) {
      data{
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
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;

export const GET_PROJECT_ALLOCATIONS = gql`
query ProjectCarbonAssetAllocation($id: String!, $pagination: Pagination) {
    projectCarbonAssetAllocation(id: $id, pagination: $pagination) {
      data {
        business_unit {id name}
        allocated
        allocation_amount
        target
        actual
        start_date
      }
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;

export const GET_BU_ALLOCATIONS = gql`
query BusinessUnitCarbonAssetAllocation($id: String!, $pagination: Pagination) {
    businessUnitCarbonAssetAllocation(id: $id, pagination: $pagination) {
      data{
        project {id name}
        total_cu
        allocated
        generated
        forward
        retired
      }
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
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