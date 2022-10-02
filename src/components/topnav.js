import React from 'react'
import './css/menu.css'
import {NotificationsOutlined, LanguageOutlined, SettingsOutlined, PersonOutline} from '@material-ui/icons';

function Topnav() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className='logo'>CSL</span>

            </div>
            <div className='topRight'>
                <div className='topbarIconContainer'>
                    <NotificationsOutlined/>
                    <span className='topIconBagdge'>2</span>
                </div>
                <div className='topbarIconContainer'>
                    <LanguageOutlined/>
                </div>

                <div className='topbarIconContainer'>
                    <SettingsOutlined/>
                </div>

                <div className='topbarIconContainer'>
                    <PersonOutline/>
                </div>



            </div>

        </div>

    </div>
  )
}

export default Topnav