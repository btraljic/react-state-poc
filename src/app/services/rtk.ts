import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    // ***** getPhotos
    getPhotos: builder.query({
      query: (albumId) => `photos?albumId=${albumId}`,
    }),

    // ***** getAlbums
    getAlbums: builder.query({
      query: (albumId) => `albums/${albumId}`,
    }),

    // ***** getAlbumPhotos
    getAlbumPhotos: builder.query({
      async queryFn(albumId, _queryApi, _extraOptions, fetchWithBQ) {
        const albumResult = await fetchWithBQ(`albums/${albumId}`)
        const photosResult = await fetchWithBQ(`photos?albumId=${albumId}`)
        return albumResult.data && photosResult.data
          ? { data: { album: albumResult.data, photos: photosResult.data } }
          : {
              error: albumResult.error ? albumResult.error : photosResult.error,
            }
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetPhotosQuery, useGetAlbumsQuery, useGetAlbumPhotosQuery } =
  rtkApi
