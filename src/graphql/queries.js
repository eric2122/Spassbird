/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      name
      email
      cell
      profilePicPath
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
    
    
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken ) {
      items {
        id
        name
        email
        cell
        profilePicPath
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
// export const listTopContent = `
// query ListTopContacts {
//   listTopContacts(
//     limit: 10, # Limit the results to 10 items
//     sortDirection: DESC, # Sort in descending order (highest ratings first)
//     sortBy: "cell" # Sort by the "rating" field
//   ) {
//     items {
//       id
//       name
//       cell
//       profilePicPath
//     }
//   }
// }

// `;