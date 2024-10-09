import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $search: String, $gender: String, $species: String) {
    characters(filter: { name: $search, gender: $gender, species: $species }, page: $page) {
      results {
        id
        name
        species
        image
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query CharacterDetails($id: ID!) {
    character(id: $id) {
      id
      image
      name
      species
      status
      gender
      location {
        name
        id
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($search: String) {
    locations(filter: { name: $search }) {
      results {
        name
      }
    }
  }
`;

export const FILTER_WITH_LOCATIONS = gql`
  query FilterWithLocations($name: String, $page: Int) {
    locations(filter: { name: $name }, page: $page) {
      info {
        count
        next
        pages
        prev
      }
      results {
        residents {
          id
          name
          species
          image
          location {
            name
          }
        }
      }
    }
  }
`;
