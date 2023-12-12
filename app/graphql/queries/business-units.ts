import { gql } from "@apollo/client";

export const BUSINESS_UNITS = gql`
  query BusinessUnits {
    businessUnits {
			id
			name
			description
			default_emission
			default_target
			metadata {
				key
				value
			}
			yearly_emissions
			yearly_contributions
    }
  }
`;

export const BUSINESS_UNITS_DETAILS = gql`
	query BusinessUnitDetails($id: String!) {
		businessUnitDetails(id: $id) {
			id
			name
			description
			default_emission
			default_target
			metadata {
				key
				value
			}
			allocations {
				project
				amount
			}
			yearly_emissions
			yearly_contributions
		}
	}
`;

export const CREATE_BUSINESS_UNIT = gql`
	mutation createBusinessUnit($request: CreateBusinessUnitRequest!) {
		createBusinessUnit(request: $request) {
			id 
			errors
		}
	}
`;