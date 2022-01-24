import { useGetPhotosQuery, useGetAlbumsQuery } from '../../app/services/rtk'

function useAlbumPhotos(album: any) {
  const {
    data: dataAlbums,
    error: errorAlbums,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums,
    isSuccess: isSuccessAlbums,
  } = useGetAlbumsQuery(album)
  const {
    data: dataPhotos,
    error: errorPhotos,
    isLoading: isLoadingPhotos,
    isFetching: isFetchingPhotos,
    isSuccess: isSuccessPhotos,
  } = useGetPhotosQuery(album, { skip: !isSuccessAlbums })

  if (isSuccessPhotos) {
    return {
      album: dataAlbums,
      photos: dataPhotos,
    }
  }

  return { album: undefined, photos: undefined }
}

export default useAlbumPhotos
