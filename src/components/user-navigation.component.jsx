
import AnimationWrapper from '../common/page-animation'
import Link from 'react-router-dom'
const UserNavigationPanel = () => {
  return (
    <AnimationWrapper transition={{duration:0.2}}>

      <div className='bg-white absolute right-0 border-grey w-60 overflow-hidden duration-200'>
<Link to={'/editor'} className="flex gap-2 link">

</Link>

      </div>


    </AnimationWrapper>
  )
}

export default UserNavigationPanel