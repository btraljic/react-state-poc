import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  keepUnusedDataFor: 300,
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

        if (albumResult.data) {
          const photosResult = await fetchWithBQ(
            `photos?albumId=${(albumResult.data as any).id}`
          )

          if (photosResult.data) {
            return {
              data: { album: albumResult.data, photos: photosResult.data },
            }
          }

          return { error: photosResult.error }
        }

        return { error: albumResult.error }
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const { useGetPhotosQuery, useGetAlbumsQuery, useGetAlbumPhotosQuery } =
  rtkApi
