import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRadio } from '../../types/radio.types';

const API_URL = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com';

export const api = createApi({
  reducerPath: 'radiosApi',

  tagTypes: ['Radios'],

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),

  endpoints: builder => ({
    getRadios: builder.query<IRadio[], null>({
      query: () => '/stations.json',

      transformResponse: (response: { data: IRadio[] }) => {
        return response.data;
      }
    })
  })
});

export const { useGetRadiosQuery } = api;