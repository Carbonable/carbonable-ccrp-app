import { gql } from "@apollo/client";

export const GET_STOCKS = gql`
query GetStock($view: VisualizationViewType!, $pagination: Pagination) {
    getStock(view: $view, pagination: $pagination) {
      data {
        project {
            id
            name
            metadata {
                key
                value
            }
        }
        vintage
        quantity
        available
      }
      page_info {
        has_next_page
        has_previous_page
        total_page
      }
    }
  }
`;