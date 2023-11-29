import { gql } from "@apollo/client";

export const BUSINESS_UNITS = gql`
  query BusinessUnits {
    businessUnits {
			id
			name
			description
			default_target
			default_target
    }
  }
`;

export const BUSINESS_UNITS_DETAILS = gql`
	query BusinessUnitDetails($id: String!) {
		businessUnitDetails(id: $id) {
			id
			name
			description
			default_target
			default_target
			metadata {
				key
				value
			}
		}
	}
`;