import React from 'react';
import { useGetUsersQuery } from 'src/generated/graphql';

interface Props {

}

export const Home: React.FC<Props> = () => {
  const {data, loading} = useGetUsersQuery();

  if (loading) return <h1>loading...</h1>

  return (
    <>
      <h1>Home</h1>
      {!loading && data && data.users.map((user: any) => {
        return (
          <li key={user.id}>{user.email}</li>
        )
      })}
    </>
  );
};
