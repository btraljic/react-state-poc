import { useGetAlbumPhotosQuery } from '../../app/services/rtk'
import useAlbumPhotos from './useAlbumPhotos'

function RTK() {
  const { album, photos } = useAlbumPhotos(1)
  const { data } = useGetAlbumPhotosQuery(2)

  console.log(album, photos)
  console.log(data)

  return (
    <div>
      <p>RTK Query</p>
    </div>
  )
}

export default RTK
