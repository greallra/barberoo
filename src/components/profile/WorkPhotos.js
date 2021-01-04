import React from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IconButton from '@material-ui/core/IconButton';

import Toast from '../Toast'

import { deleteWorkPhoto } from '../../redux/actions/user'
import { useDispatch } from 'react-redux'

const masonryCss = {
    // background: 'var(--superlight-grey)',
    padding: 15,
    borderRadius: '.5rem'
}
const iconCss = {
    position: 'absolute',
    color: 'var(--faded-red)'
}
export default function WorkPhotos({user}) {
    const dispatch = useDispatch()

    function deletePhoto (_id) {
        dispatch(deleteWorkPhoto(_id))
    }
    return (
        <div>
            {/* <Toast /> */}
            <Masonry columnsCount={3} gutter="10px" style={masonryCss} className="masonry-wf">  
                {user.work_photos.length > 0 && user.work_photos.map( (photo) => {
                return <><img 
                src={`${process.env.REACT_APP_API_URL}/users/${user._id}/${photo._id}/work_photos`} 
                key={photo._id}
                style={{width: "100%", display: "block"}}
                /> <IconButton style={iconCss}>
                         <HighlightOffIcon onClick={ () => deletePhoto(photo._id)} />
                </IconButton>
                </>}
                )}
                {/* <><img 
                src="https://via.placeholder.com/150"
                key="abc"
                style={{width: "100%", display: "block"}}
                /> <IconButton style={iconCss}>
                       
                        <ControlPointIcon />
                </IconButton>
                </> */}
            </Masonry>
            
            
        </div>
    )
}
