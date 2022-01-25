import { useRef, useState } from 'react'
import { useGetAlbumPhotosQuery } from '../../app/services/rtk'
import useAlbumPhotos from './useAlbumPhotos'

function RTK() {
  const [albumId, setAlbumId] = useState(1)
  const inputRef = useRef(null)
  const {
    album,
    photos,
    isError: isErrorAlbumPhotos,
    isLoading: isLoadingAlbumPhotos,
    isFetching: isFetchingAlbumPhotos,
    isSuccess: isSuccessAlbumPhotos,
  } = useAlbumPhotos(albumId)
  const {
    data,
    isError: isErrorAlbumPhotosQuery,
    isLoading: isLoadingAlbumPhotosQuery,
    isFetching: isFetchingAlbumPhotosQuery,
    refetch,
  } = useGetAlbumPhotosQuery(albumId)

  console.log(
    `useAlbumPhotos albumId=${albumId}`,
    album,
    photos,
    isErrorAlbumPhotos,
    isLoadingAlbumPhotos,
    isFetchingAlbumPhotos,
    isSuccessAlbumPhotos
  )
  console.log(
    `useAlbumPhotosQuery albumId=${albumId}`,
    data?.album,
    data?.photos,
    isErrorAlbumPhotosQuery,
    isLoadingAlbumPhotosQuery,
    isFetchingAlbumPhotosQuery
  )

  const onButtonClick = () => {
    setAlbumId((inputRef as any).current.value)
  }

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor:
          isFetchingAlbumPhotos || isFetchingAlbumPhotosQuery
            ? 'lightcoral'
            : 'transparent',
      }}
    >
      <p>RTK Query</p>
      Album Id (1-100){' '}
      <input ref={inputRef} type='text' defaultValue={albumId} />
      <button onClick={onButtonClick}>Fetch</button>
      <button onClick={refetch} disabled={isFetchingAlbumPhotosQuery}>
        {isFetchingAlbumPhotosQuery ? 'Fetching...' : 'Refetch'}
      </button>
      <p>
        {isSuccessAlbumPhotos &&
          `Fetched ${photos.length} photos from album ${albumId}`}
      </p>
    </div>
  )
}

export default RTK
