import { useGetPhotosQuery, useGetAlbumsQuery } from '../../app/services/rtk'

function useAlbumPhotos(album: any) {
  const {
    data: dataAlbums,
    isError: isErrorAlbums,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums,
    isSuccess: isSuccessAlbums,
  } = useGetAlbumsQuery(album)
  const {
    data: dataPhotos,
    isError: isErrorPhotos,
    isLoading: isLoadingPhotos,
    isFetching: isFetchingPhotos,
    isSuccess: isSuccessPhotos,
  } = useGetPhotosQuery(dataAlbums?.id, { skip: !isSuccessAlbums })

  if (isSuccessPhotos) {
    return {
      album: dataAlbums,
      photos: dataPhotos,
      isError: isErrorAlbums || isErrorPhotos,
      isLoading: isLoadingAlbums || isLoadingPhotos,
      isFetching: isFetchingAlbums || isFetchingPhotos,
      isSuccess: isSuccessAlbums && isSuccessPhotos,
    }
  }

  return {
    album: undefined,
    photos: undefined,
    isError: isErrorAlbums || isErrorPhotos,
    isLoading: isLoadingAlbums || isLoadingPhotos,
    isFetching: isFetchingAlbums || isFetchingPhotos,
    isSuccess: isSuccessAlbums && isSuccessPhotos,
  }
}

export default useAlbumPhotos
