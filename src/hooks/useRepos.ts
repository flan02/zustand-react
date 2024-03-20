/* eslint-disable @typescript-eslint/no-unused-vars */
import { githubAPI } from '../api/github';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { Repository } from '../types';

export const fetchRepos = async (context: QueryFunctionContext) => {
  const [_queryKey, variable] = context.queryKey;
  const { data } = await githubAPI.get<Repository[]>(`/users/${variable}/repos`);
  //const { data } = await githubAPI.get<Repository[]>(`/users/${context.queryKey[1]}/repos`);
  return data;
}

/*
TODO classic Way passing the githubUser as a parameter
export const useFetchRepos = (githubUser: string) => {
  return useQuery({
    queryKey: ['repos', githubUser],
    queryFn: fetchRepos,
  })
}
*/

// TODO Using Context
export const useFetchRepos = () => {
  return useQuery({
    queryKey: ['repos', 'flan02'],
    queryFn: fetchRepos,
  })
}