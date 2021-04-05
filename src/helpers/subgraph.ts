import { request } from "graphql-request";
import { Gotchi } from '../types';

const uri = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';
const getUser = (id: string) => {
  return `
    {
      user(id:"${id}") {
        gotchisOwned {
          id,
          name,
        }
      }
    }
  `
}

export const requestGetUser = async (id: string):
  Promise<{
    user: {
      gotchisOwned: Gotchi[]
    }
  }>=> {
  const response = await request(uri, getUser(id))
  return response;
} 

