import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
query Projects {
    projects {
        id
        name
        metadata
    }
  }
`;

export const GET_PROJECT_WITHOUT_VINTAGES = gql`
query ProjectBy($field: String!, $value: String!) {
  projectBy(field: $field, value: $value) {
      id
      name
      description
      localization
      startDate
      endDate
      area
      type
      origin
      certifier {
        id
        name
      }
      developper {
        id
        name
      }
      country {
        name
        code
      }
      metadata
    }
  }
`;

export const GET_PROJECTS_METRICS = gql`
  query GetProjectsMetrics($view: VisualizationViewType) {
    getProjectMetrics(view: $view) {
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