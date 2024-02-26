'use client'
import {useEffect} from 'react';


function useAskNotificationPermission() {
    useEffect(() => {
        if (!('Notification' in window)) {
            return {result:'This browser does not support notifications.'}
        } else {
          Notification.requestPermission().then(permission => {
            return {result:permission}
          })
        }
    }, [])
    
}  

function ShowNotification(title, bodyText, img, silent, sound){
    useEffect(() => {
        if (!('Notification' in window)) {
            return {result:'This browser does not support notifications.'}
        } else {
            Notification.requestPermission().then(permission => {
              if(permission=='granted'){
                const a =sound
                const badge = ''
                        const notification = new Notification('Slide uploaded!', {
                            body: '',
                            icon: img,
                            badge: badge,
                            silent: true})
                console.log('status:200, message:Sent Successfully')
                        return {}

                    }
               
            })
        }
    }) 
}


function setNotificationCount (count){
    navigator.setAppBadge(count)
}

function clearNotificationCount (){
    navigator.clearAppBadge()
}


module.exports = {
    ShowNotification,
    setNotificationCount,
    clearNotificationCount,
    useAskNotificationPermission
}